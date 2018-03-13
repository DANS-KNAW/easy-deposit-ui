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
import { DatasetId, Deposit, Deposits } from "../../model/Deposits"
import { cleanDeposits, deleteDeposit, fetchDeposits } from "../../actions/depositActions"
import { ReduxAction } from "../../lib/redux"
import { Action } from "redux"
import DepositTableHead from "./DepositTableHead"
import DepositTableRow from "./DepositTableRow"

interface DepositOverviewProps {
    deposits: Deposits
    fetchDeposits: () => ReduxAction<Promise<Deposit[]>>
    cleanDeposits: () => Action
    deleteDeposit: (id: DatasetId) => ReduxAction<Promise<void>>
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
        ]
    }

    private renderLoadingError() {
        const { deposits: { loading: { loadingError } } } = this.props

        return loadingError &&
            <div className="alert alert-danger"
                 role="alert">
                An error occurred: {loadingError}. Cannot load data from the server.
                {/* reset certain style elements from .close in the button below using the style attribute */}
                <button type="button"
                        className="close"
                        style={{ fontSize: "1rem", lineHeight: "0" }}
                        onClick={this.props.fetchDeposits}>
                    <i className="fas fa-sync-alt"/>
                </button>
            </div>
    }

    private renderDeleteError() {
        const { deposits: { deleting } } = this.props

        return Object.keys(deleting)
            .map(id => {
                const { deleteError } = deleting[id]

                if (deleteError) {
                    const deposit = this.props.deposits.deposits.find(deposit => deposit.id === id)
                    const errorText = deposit
                        ? `Cannot delete deposit '${deposit.title}'. An error occurred: ${deleteError}.`
                        : `Cannot delete a deposit. An error occurred: ${deleteError}.`

                    return (
                        <div key={id}
                             className="alert alert-warning alert-dismissible fade show"
                             role="alert">
                            {errorText}
                            <button type="button"
                                    className="close"
                                    data-dismiss="alert"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    )
                }
            })
    }

    private renderTable() {
        const { deposits: { deposits, deleting }, deleteDeposit } = this.props

        return <table className="table table-hover">
            <DepositTableHead/>
            <tbody>{deposits.map(deposit =>
                <DepositTableRow key={deposit.id}
                                 deposit={deposit}
                                 deleting={deleting[deposit.id]}
                                 deleteDeposit={() => deleteDeposit(deposit.id)}/>,
            )}</tbody>
        </table>
    }
}

const mapStateToProps = (state: AppState) => ({
    deposits: state.deposits,
})

export default connect(mapStateToProps, { fetchDeposits, cleanDeposits, deleteDeposit })(DepositOverview)
