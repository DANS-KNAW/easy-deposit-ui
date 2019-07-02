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
import { FC } from "react"
import { Link, LinkProps } from "react-router-dom"
import { dateFormat } from "../../lib/metadata/Date"
import { DeleteState, Deposit } from "../../model/Deposits"

interface EnterableProps {
    title: string
}

const Enterable = ({ title }: EnterableProps) => (
    <div><i className="fas fa-sign-in-alt" id="enter_dataset"/> {title}</div>
)

interface LinkableProps {
    enabled: boolean
}

const Linkable: FC<LinkableProps & LinkProps> = ({ to, enabled, children }) => {
    return enabled
        ? <Link to={to}>{children}</Link>
        : <>{children}</>
}

interface DepositTableRowProps {
    deposit: Deposit
    deleting?: DeleteState
    editable: boolean
    depositLink: string

    deleteDeposit: (e: React.MouseEvent<HTMLButtonElement>) => void
    askConfirmation: (e: React.MouseEvent<HTMLButtonElement>) => void
    cancelDeleteDeposit: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const DepositTableRow = ({ deposit, deleting, editable, depositLink, deleteDeposit, askConfirmation, cancelDeleteDeposit }: DepositTableRowProps) => {
    const title = <Enterable title={deposit.title}/>
    const isDeleting = deleting && deleting.deleting

    const deleteButton = editable &&
        <button type="button"
                key="delete"
                className="close"
                disabled={isDeleting}
                onClick={askConfirmation}>
            {isDeleting
                ? <i className="fas fa-sync-alt fa-spin"/>
                : <i className="fas fa-trash-alt"/>}
        </button>
    const confirmButtons = isDeleting &&
        <div className="mt-2 confirm-button">
            <button type="button" className="btn btn-dark bg-danger mb-0 mr-1" onClick={deleteDeposit}>
                Delete deposit
            </button>
            <button type="button" className="btn btn-dark mb-0 ml-1" onClick={cancelDeleteDeposit}>
                Cancel
            </button>
        </div>

    const enabled = !isDeleting && editable
    const rowStyling = isDeleting ? "" : editable ? "editable_table_row" : "not_editable_table_row"

    return (
        <tr className={["row ml-0 mr-0", rowStyling].join(" ")}>
            {/* these column sizes need to match with the sizes in DepositTableHead */}
            <td className="col col-10 order-1 col-sm-11 order-sm-1 col-md-3 order-md-1" scope="row">
                <Linkable enabled={enabled} to={depositLink}>{title}</Linkable>
                {confirmButtons}
            </td>
            <td className="col col-12 order-3 col-sm-12 order-sm-3 col-md-2 order-md-2">
                <Linkable enabled={enabled} to={depositLink}>{dateFormat(deposit.date)}</Linkable>
            </td>
            <td className="col col-12 order-4 col-sm-12 order-sm-4 col-md-2 order-md-3">
                <Linkable enabled={enabled} to={depositLink}>{deposit.state}</Linkable>
            </td>
            <td className="col col-12 order-5 col-sm-12 order-sm-5 col-md-4 order-md-4 newline-wrapping">
                <Linkable enabled={enabled} to={depositLink}>
                    <span dangerouslySetInnerHTML={{ __html: deposit.stateDescription }}/>
                </Linkable>
            </td>
            <td className="col col-2  order-2 col-sm-1  order-sm-2 col-md-1 order-md-5" id="actions_cell">
                <Linkable enabled={enabled} to={depositLink}/>
                {deleteButton}
            </td>
        </tr>
    )
}

export default DepositTableRow
