import * as React from "react"
import * as dateFormat from "dateformat"
import { DeleteState, Deposit, DepositState } from "../../model/Deposits"
import { Link } from "react-router-dom"

interface DepositTableRowProps {
    deposit: Deposit
    deleting?: DeleteState
    deleteDeposit: () => void
}

const isEditable = (deposit: Deposit) => deposit.state === DepositState.DRAFT || deposit.state === DepositState.REJECTED

const DepositTableRow = ({ deposit, deleting, deleteDeposit }: DepositTableRowProps) => {
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

export default DepositTableRow
