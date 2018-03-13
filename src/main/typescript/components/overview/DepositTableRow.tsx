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
import * as dateFormat from "dateformat"
import { DeleteState, Deposit, DepositState } from "../../model/Deposits"
import { Link } from "react-router-dom"

interface DepositTableRowProps {
    deposit: Deposit
    deleting?: DeleteState
    deleteDeposit: () => void
}

const DepositTableRow = ({ deposit, deleting, deleteDeposit }: DepositTableRowProps) => {
    function isEditable({ state }: Deposit): boolean {
        return state === DepositState.DRAFT || state === DepositState.REJECTED
    }

    const title = isEditable(deposit)
        ? <Link to={`/deposit-form?datasetId=${deposit.id}`}>{deposit.title}</Link>
        : deposit.title

    const deleteButton = isEditable(deposit) &&
        <button key="delete" disabled={deleting && deleting.deleting} onClick={deleteDeposit}>Delete</button>
    // TODO add more action buttons here

    const actions = [
        deleteButton,
    ]

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

export default DepositTableRow
