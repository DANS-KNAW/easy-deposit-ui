/*
 * Copyright (C) 2018 DANS - Data Archiving and Networked Services (info@dans.knaw.nl)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as React from "react"
import { useEffect } from "react"
import { shallowEqual, useDispatch } from "react-redux"
import { Deposit, DepositId, DepositStateLabel } from "../../model/Deposits"
import {
    askConfirmationToDeleteDeposit,
    cancelDeleteDeposit,
    cleanDeposits,
    deleteDeposit,
    fetchDeposits,
} from "../../actions/depositOverviewActions"
import { useSelector } from "../../lib/redux"
import DepositTableHead from "./DepositTableHead"
import DepositTableRow from "./DepositTableRow"
import { Alert, CloseableWarning, ReloadAlert } from "../Errors"
import { depositFormRoute } from "../../constants/clientRoutes"
import Paginationable from "../Paginationable"
import Loading from "../Loading"

function isEditable({ state }: Deposit): boolean {
    return state === DepositStateLabel.DRAFT || state === DepositStateLabel.REJECTED
}

const DepositOverview = () => {
    const deposits = useSelector(state => state.deposits, shallowEqual)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchDeposits())
        return function cleanup() {
            dispatch(cleanDeposits())
        }
    }, [])

    const doDeleteDeposit = (depositId: DepositId) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        dispatch(deleteDeposit(depositId))
    }

    const doAskConfirmation = (depositId: DepositId) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        dispatch(askConfirmationToDeleteDeposit(depositId))
    }

    const doCancelDeleteFile = (depositId: DepositId) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        dispatch(cancelDeleteDeposit(depositId))
    }

    const renderLoadingError = () => deposits.loading.loadingError && (
        <ReloadAlert key="loadingError"
                     reload={() => dispatch(fetchDeposits())}>
            An error occurred: {deposits.loading.loadingError}. Cannot load your deposits right now.
            If this error persists, please <a href="mailto:info@dans.knaw.nl" target="_blank">contact us</a>.
        </ReloadAlert>
    )

    const renderDeleteError = () => {
        return Object.keys(deposits.deleting)
            .map(depositId => {
                const { deleteError } = deposits.deleting[depositId]

                if (deleteError) {
                    const deposit = deposits.deposits[depositId]
                    const errorText = deposit
                        ? `Cannot delete deposit '${deposit.title}'. An error occurred: ${deleteError}.`
                        : `Cannot delete a deposit. An error occurred: ${deleteError}.`

                    return <CloseableWarning key={`deleteError.${depositId}`}>{errorText}</CloseableWarning>
                }
            })
    }

    const renderCreateNewError = () => deposits.creatingNew.createError && (
        <Alert key="createNewError">
            An error occurred: {deposits.creatingNew.createError}. Cannot create a new dataset.
        </Alert>
    )

    const renderTableBody = (depositIdsToBeShown: DepositId[], depositCount: number) => {
        if (deposits.loading.loading)
            return (
                <tr className="row ml-0 mr-0">
                    <td className="col col-12 text-center" scope="row" colSpan={5}><Loading/></td>
                </tr>
            )

        if (depositCount === 0)
            return (
                <tr className="row ml-0 mr-0">
                    <td className="col col-12" scope="row" colSpan={5}>No deposits yet</td>
                </tr>
            )

        return depositIdsToBeShown.map(depositId => (
            <DepositTableRow key={depositId}
                             deposit={deposits.deposits[depositId]}
                             deleting={deposits.deleting[depositId]}
                             deleteDeposit={doDeleteDeposit(depositId)}
                             askConfirmation={doAskConfirmation(depositId)}
                             cancelDeleteDeposit={doCancelDeleteFile(depositId)}
                             editable={isEditable(deposits.deposits[depositId])}
                             depositLink={depositFormRoute(depositId)}/>
        ))
    }

    const renderTable = (depositIdsToBeShown: DepositId[], depositCount: number) => (
        <table className="table table-striped deposit_table mt-2">
            <DepositTableHead/>
            <tbody>{renderTableBody(depositIdsToBeShown, depositCount)}</tbody>
        </table>
    )

    return (
        <>
            {renderLoadingError()}
            {renderDeleteError()}
            {renderCreateNewError()}
            <Paginationable entryDescription="deposits"
                            pagesShown={5}
                            entries={deposits.loading.loaded ? Object.keys(deposits.deposits) : []}
                            renderEntries={renderTable}/>
        </>
    )
}

export default DepositOverview
