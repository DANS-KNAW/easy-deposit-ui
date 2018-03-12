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

    render() {
        const { deposits: { loading: { loading, loaded, loadingError } } } = this.props

        const init = loading && <p>loading data...</p>
        const loadingErr = loadingError &&
            <p style={{ color: "red" }}>An error occured: {loadingError}. Cannot load data from the server.</p>
        const data = loaded && this.renderTable()

        return (
            <>
                {init}
                {loadingErr}
                {data}
            </>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    deposits: state.deposits,
})

export default connect(mapStateToProps, { fetchDeposits, cleanDeposits, deleteDeposit })(DepositOverview)
