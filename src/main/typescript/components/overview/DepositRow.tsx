import * as React from "react"
import { Component } from "react"
import { Deposit } from "../../model/Deposit"

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

export default DepositRow
