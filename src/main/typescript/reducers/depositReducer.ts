import { Deposits, empty, emptyDelete } from "../model/Deposits"
import { Reducer } from "redux"
import { DepositConstants } from "../constants/depositConstants"

export const depositReducer: Reducer<Deposits> = (state = empty, action) => {
    switch (action.type) {
        case DepositConstants.FETCH_DEPOSITS_PENDING: {
            return { ...state, loading: { ...state.loading, loading: true } }
        }
        case DepositConstants.FETCH_DEPOSITS_REJECTED: {
            const { response: { status, statusText } } = action.payload
            return { ...state, loading: { ...state.loading, loading: false, error: `${status} - ${statusText}` } }
        }
        case DepositConstants.FETCH_DEPOSITS_FULFILLED: {
            return { ...state, loading: { ...state.loading, loading: false, loaded: true }, deposits: action.payload }
        }
        case DepositConstants.CLEAN_DEPOSITS: {
            return empty
        }
        case DepositConstants.DELETE_DEPOSIT_PENDING: {
            const { meta: { id } } = action
            const deletingProp = state.deleting[id]
            const newDeletingProp = deletingProp
                ? { ...deletingProp, deleting: true }
                : { ...emptyDelete, deleting: true }
            return { ...state, deleting: { ...state.deleting, [id]: newDeletingProp } }
        }
        case DepositConstants.DELETE_DEPOSIT_REJECTED: {
            const { meta: { id }, payload: { response: { status, statusText } } } = action
            const error = `${status} - ${statusText}`

            const deletingProp = state.deleting[id]
            const newDeletingProp = deletingProp
                ? { ...deletingProp, deleting: false, error: error }
                : { ...emptyDelete, error: error }

            return { ...state, deleting: { ...state.deleting, [id]: newDeletingProp } }
        }
        case DepositConstants.DELETE_DEPOSIT_FULFILLED: {
            const { meta: { id } } = action

            const deletingProp = state.deleting[id]
            const newDeletingProp = deletingProp
                ? { ...deletingProp, deleting: false, deleted: true }
                : { ...emptyDelete, deleting: false, deleted: true }

            const newDeposits = state.deposits.filter(deposit => deposit.id !== id)

            return { ...state, deleting: { ...state.deleting, [id]: newDeletingProp }, deposits: newDeposits }
        }
        default:
            return state
    }
}
