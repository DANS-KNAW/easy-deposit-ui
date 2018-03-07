import { Deposit } from "../model/Deposit"
import { Reducer } from "redux"
import { DepositConstants } from "../constants/depositConstants"

export const depositReducer: Reducer<Deposit[]> = (state = [], action) => {
    switch (action.type) {
        case DepositConstants.FETCH_DEPOSITS_PENDING: {
            console.log("fetching deposits pending")
            return state
        }
        case DepositConstants.FETCH_DEPOSITS_REJECTED: {
            console.log("fetching deposits rejected")
            return state
        }
        case DepositConstants.FETCH_DEPOSITS_FULFILLED: {
            console.log("fetching deposits fulfilled")
            return action.payload
        }
        default:
            return state
    }
}
