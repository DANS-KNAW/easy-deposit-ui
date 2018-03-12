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
import { DatasetId, DeleteState, DeletingStates, Deposit, DepositState } from "../../model/Deposits"
import { Link } from "react-router-dom"
import * as dateFormat from "dateformat"

const TableHead = () => (
    <tr>
        <th scope="col">Dataset</th>
        <th scope="col">Date</th>
        <th scope="col">State</th>
        <th scope="col">Notes</th>
        <th scope="col">Action</th>
    </tr>
)

interface DepositRowProps {
    deposit: Deposit
    deleting?: DeleteState
    deleteDeposit: () => void
}

const isEditable = (deposit: Deposit) => deposit.state === DepositState.DRAFT || deposit.state === DepositState.REJECTED

const DepositRow = ({ deposit, deleting, deleteDeposit }: DepositRowProps) => {
    const title = isEditable(deposit)
        ? <Link to={`/deposit-form?datasetId=${deposit.id}`}>{deposit.title}</Link>
        : deposit.title

    const deleteButton = isEditable(deposit)
        ? <button key="delete" disabled={deleting ? deleting.deleting : false} onClick={deleteDeposit}>Delete</button>
        : undefined
    // TODO add more action buttons here

    const actions = [
        deleteButton,
    ].filter(value => value !== undefined)

    return (
        <tr>
            <td scope="row">{title}</td>
            <td>{dateFormat(deposit.date, "yyyy-mm-dd")}</td>
            <td>{deposit.state}</td>
            <td>{deposit.stateDescription}</td>
            <td>{actions}</td>
        </tr>
    )
}

interface TableProps {
    deposits: Deposit[]
    deletingStates: DeletingStates
    deleteDeposit: (id: DatasetId) => void
}

const Table = ({ deposits, deletingStates, deleteDeposit }: TableProps) => (
    <table className="table table-hover">
        <thead><TableHead/></thead>
        <tbody>{deposits.map(deposit =>
            <DepositRow key={deposit.id}
                        deposit={deposit}
                        deleting={deletingStates[deposit.id]}
                        deleteDeposit={() => deleteDeposit(deposit.id)}/>,
        )}</tbody>
    </table>
)

export default Table
