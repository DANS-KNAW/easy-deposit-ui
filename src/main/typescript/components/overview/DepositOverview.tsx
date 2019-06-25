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
import { useDispatch } from "react-redux"
import { Deposit, DepositId, DepositState } from "../../model/Deposits"
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
import EmptyDepositTableRow from "./EmptyDepositTableRow"
import Paginationable from "../Paginationable"

function isEditable({ state }: Deposit): boolean {
    return state === DepositState.DRAFT || state === DepositState.REJECTED
}

const DepositOverview = () => {
    const deposits = useSelector(state => state.deposits)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchDeposits())
        return function cleanup() {
            dispatch(cleanDeposits())
        }
    }, [])

    const renderLoadingError = () => deposits.loading.loadingError && (
        <ReloadAlert key="loadingError"
                     reload={dispatch(fetchDeposits)}>
            An error occurred: {deposits.loading.loadingError}. Cannot load data from the server.
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

    const renderAlerts = () => [
        renderLoadingError(),
        renderDeleteError(),
        renderCreateNewError(),
    ]

    const renderTable = (depositIdsToBeShown: DepositId[], depositCount: number) => (
        <table className="table table-striped deposit_table mt-2">
            <DepositTableHead/>
            <tbody>{depositCount == 0
                ? <EmptyDepositTableRow/>
                : depositIdsToBeShown.map(depositId => {
                    return <DepositTableRow key={depositId}
                                            deposit={deposits.deposits[depositId]}
                                            deleting={deposits.deleting[depositId]}
                                            deleteDeposit={e => {
                                                e.stopPropagation()
                                                dispatch(deleteDeposit(depositId))
                                            }}
                                            askConfirmation={e => {
                                                e.stopPropagation()
                                                dispatch(askConfirmationToDeleteDeposit(depositId))
                                            }}
                                            cancelDeleteDeposit={e => {
                                                e.stopPropagation()
                                                dispatch(cancelDeleteDeposit(depositId))
                                            }}
                                            editable={isEditable(deposits.deposits[depositId])}
                                            depositLink={depositFormRoute(depositId)}/>
                })}</tbody>
        </table>
    )

    const renderTableView = () => (
        <Paginationable entryDescription="deposits"
                        pagesShown={5}
                        entries={deposits.loading.loaded ? Object.keys(deposits.deposits) : []}
                        renderEntries={renderTable}/>
    )

    return (
        <>
            {renderAlerts()}
            {deposits.loading.loading && <p>loading data...</p>}
            {deposits.loading.loaded && renderTableView()}
        </>
    )
}

export default DepositOverview
