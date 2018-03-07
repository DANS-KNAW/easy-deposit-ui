import * as React from "react"
import { Deposit, DepositState } from "../../model/Deposits"

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
    deleteDeposit: () => void
}

const DepositRow = ({ deposit, deleteDeposit }: DepositRowProps) => {
    const deleteButton = deposit.state === DepositState.DRAFT || deposit.state === DepositState.REJECTED
        ? <button key="delete" onClick={deleteDeposit}>Delete</button>
        : undefined
    // TODO add more action buttons here

    const actions = [
        deleteButton,
    ].filter(value => value !== undefined)

    return (
        <tr>
            <th scope="row">{deposit.title}</th>
            <td>{deposit.date}</td>
            <td>{deposit.state}</td>
            <td>{deposit.state_description}</td>
            <td>{actions}</td>
        </tr>
    )
}

interface TableProps {
    deposits: Deposit[]
    deleteDeposit: (id: string) => void
}

const Table = ({ deposits, deleteDeposit }: TableProps) => (
    <table className="table table-hover">
        <thead><TableHead/></thead>
        <tbody>{deposits.map(deposit => <DepositRow key={deposit.id} deposit={deposit} deleteDeposit={() => deleteDeposit(deposit.id)}/>)}</tbody>
    </table>
)

export default Table
