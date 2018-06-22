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
import { Component } from "react"
import { connect } from "react-redux"
import { AppState } from "../../model/AppState"
import { DepositId, DepositOverviewState } from "../../model/Deposits"
import { cleanDeposits, deleteDeposit, fetchDeposits } from "../../actions/depositOverviewActions"
import { ReduxAction } from "../../lib/redux"
import { Action } from "redux"
import DepositTableHead from "./DepositTableHead"
import DepositTableRow from "./DepositTableRow"
import { Alert, CloseableWarning, ReloadAlert } from "../Errors"

interface DepositOverviewProps {
    deposits: DepositOverviewState

    fetchDeposits(): ReduxAction<Promise<any>>
    cleanDeposits(): Action
    deleteDeposit(depositId: DepositId): ReduxAction<Promise<void>>
}

class DepositOverview extends Component<DepositOverviewProps> {
    constructor(props: DepositOverviewProps) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchDeposits()
    }

    componentWillUnmount() {
        this.props.cleanDeposits()
    }

    render() {
        const { deposits: { loading: { loading, loaded } } } = this.props

        return (
            <>
                {this.renderAlerts()}
                {loading && <p>loading data...</p>}
                {loaded && this.renderTable()}
            </>
        )
    }

    private renderAlerts() {
        return [
            this.renderLoadingError(),
            this.renderDeleteError(),
            this.renderCreateNewError(),
        ]
    }

    private renderLoadingError() {
        const { fetchDeposits, deposits: { loading: { loadingError } } } = this.props

        return loadingError &&
            <ReloadAlert key="loadingError"
                         reload={fetchDeposits}>
                An error occurred: {loadingError}. Cannot load data from the server.
            </ReloadAlert>
    }

    private renderDeleteError() {
        const { deposits: { deleting, deposits } } = this.props

        return Object.keys(deleting)
            .map(depositId => {
                const { deleteError } = deleting[depositId]

                if (deleteError) {
                    const deposit = deposits[depositId]
                    const errorText = deposit
                        ? `Cannot delete deposit '${deposit.title}'. An error occurred: ${deleteError}.`
                        : `Cannot delete a deposit. An error occurred: ${deleteError}.`

                    return <CloseableWarning>{errorText}</CloseableWarning>
                }
            })
    }

    private renderCreateNewError() {
        const { deposits: { creatingNew: { createError } } } = this.props

        return createError &&
            <Alert key="createNewError">
                An error occurred: {createError}. Cannot create a new dataset. Please try again.
            </Alert>
    }

    private renderTable() {
        const { deposits: { deposits, deleting }, deleteDeposit } = this.props

        return (
            <table className="table table-hover">
                <DepositTableHead/>
                <tbody>{Object.keys(deposits).map(depositId =>
                    <DepositTableRow key={depositId}
                                     depositId={depositId}
                                     deposit={deposits[depositId]}
                                     deleting={deleting[depositId]}
                                     deleteDeposit={() => deleteDeposit(depositId)}/>,
                )}</tbody>
            </table>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    deposits: state.deposits,
})

export default connect(mapStateToProps, { fetchDeposits, cleanDeposits, deleteDeposit })(DepositOverview)
