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
import { DeleteState, Deposit } from "../../model/Deposits"

interface EnterableProps {
    title: string
}

const Enterable = ({ title }: EnterableProps) => (
    <><i className="fas fa-sign-in-alt" id="enter_dataset"/> {title}</>
)

interface DepositTableRowProps {
    deposit: Deposit
    deleting?: DeleteState
    editable: Boolean

    deleteDeposit: (e: React.MouseEvent<HTMLButtonElement>) => void
    enterDeposit: () => void
}

const DepositTableRow = ({ deposit, deleting, deleteDeposit, editable, enterDeposit }: DepositTableRowProps) => {

    const title = <Enterable title={deposit.title}/>
    const isDeleting = deleting && deleting.deleting
    const deleteButton = editable &&
        <button key="delete"
                className="close icon"
                disabled={isDeleting}
                onClick={deleteDeposit}>
            {isDeleting
                ? <i className="fas fa-sync-alt fa-spin"/>
                : <i className="fas fa-trash-alt"/>}
        </button>

    return (
        <tr className={["row", editable ? "editable_table_row" : "not_editable_table_row"].join(" ") + " ml-0 mr-0"}
            onClick={enterDeposit}>
            {/* these column sizes need to match with the sizes in DepositTableHead */}
            <td className="col col-10 order-1 col-sm-11 order-sm-1 col-md-3 order-md-1" scope="row">{title}</td>
            <td className="col col-12 order-3 col-sm-12 order-sm-3 col-md-2 order-md-2">{dateFormat(deposit.date, "yyyy-mm-dd")}</td>
            <td className="col col-12 order-4 col-sm-12 order-sm-4 col-md-2 order-md-3">{deposit.state}</td>
            <td className="col col-12 order-5 col-sm-12 order-sm-5 col-md-4 order-md-4">{deposit.stateDescription}</td>
            <td className="col col-2  order-2 col-sm-1  order-sm-2 col-md-1 order-md-5"
                id="actions_cell">{deleteButton}</td>
        </tr>
    )
}

export default DepositTableRow
