import * as React from "react"
import { Component } from "react"
import { Deposit } from "../../model/Deposits"

const TableHead = () => (
    <tr>
        <th scope="col">Dataset</th>
        <th scope="col">Date</th>
        <th scope="col">State</th>
        <th scope="col">Notes</th>
    </tr>
)

interface DepositRowProps {
    deposit: Deposit
}

const DepositRow = ({ deposit }: DepositRowProps) => (
    <tr>
        <th scope="row">{deposit.title}</th>
        <td>{deposit.date}</td>
        <td>{deposit.state}</td>
        <td>{deposit.state_description}</td>
    </tr>
)

interface TableProps {
    deposits: Deposit[]
}

const Table = ({ deposits }: TableProps) => (
    <table className="table table-hover">
        <thead><TableHead/></thead>
        <tbody>{deposits.map(deposit => <DepositRow key={deposit.id} deposit={deposit}/>)}</tbody>
    </table>
)

export default Table
