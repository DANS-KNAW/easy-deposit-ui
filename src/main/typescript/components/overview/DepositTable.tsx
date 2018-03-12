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
import { DatasetId, DeletingStates, Deposit } from "../../model/Deposits"
import DepositTableHead from "./DepositTableHead"
import DepositTableRow from "./DepositTableRow"

interface DepositTableProps {
    deposits: Deposit[]
    deletingStates: DeletingStates
    deleteDeposit: (id: DatasetId) => void
}

const DepositTable = ({ deposits, deletingStates, deleteDeposit }: DepositTableProps) => (
    <table className="table table-hover">
        <thead><DepositTableHead/></thead>
        <tbody>{deposits.map(deposit =>
            <DepositTableRow key={deposit.id}
                             deposit={deposit}
                             deleting={deletingStates[deposit.id]}
                             deleteDeposit={() => deleteDeposit(deposit.id)}/>,
        )}</tbody>
    </table>
)

export default DepositTable
