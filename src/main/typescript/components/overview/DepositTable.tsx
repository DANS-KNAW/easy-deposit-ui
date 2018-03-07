import * as React from "react"
import { Deposit } from "../../model/Deposits"

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

const DepositRow = ({ deposit, deleteDeposit }: DepositRowProps) => (
    <tr>
        <th scope="row">{deposit.title}</th>
        <td>{deposit.date}</td>
        <td>{deposit.state}</td>
        <td>{deposit.state_description}</td>
        <td><button onClick={deleteDeposit}>Delete</button></td>
    </tr>
)

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
