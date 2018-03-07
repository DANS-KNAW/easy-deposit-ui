import { DepositState } from "./DepositState"

export interface Deposit {
    id:	string
    title: string
    state: DepositState
    state_description:	string
    date: Date
}
