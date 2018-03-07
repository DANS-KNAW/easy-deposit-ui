import { Deposits, empty } from "../model/Deposits"
import { Reducer } from "redux"
import { DepositConstants } from "../constants/depositConstants"

export const depositReducer: Reducer<Deposits> = (state = empty, action) => {
    switch (action.type) {
        case DepositConstants.FETCH_DEPOSITS_PENDING: {
            return {...state, loading: true}
        }
        case DepositConstants.FETCH_DEPOSITS_REJECTED: {
            const { response: {status, statusText} } = action.payload
            return {...state, loading: false, error: `${status} - ${statusText}`}
        }
        case DepositConstants.FETCH_DEPOSITS_FULFILLED: {
            return {...state, loading: false, loaded: true, deposits: action.payload}
        }
        default:
            return state
    }
}
