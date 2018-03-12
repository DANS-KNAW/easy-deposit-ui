import { DepositConstants } from "../constants/depositConstants"
import { Action, AnyAction, Middleware } from "redux"
import { createMiddleware } from "../lib/redux"
import { deleteDepositFailed, fetchDepositsFailed } from "../actions/depositActions"

type NewActionGenerator = (action: AnyAction) => (errorMessage: string) => Action

function rejectedMiddleware(type: string) {
    return function (newActionGenerator: NewActionGenerator): Middleware {
        return createMiddleware(({dispatch}, next, action) => {
            next(action)

            if (action.type === type) {
                const response = action.payload.response
                const errorMessage = response
                    ? `${response.status} - ${response.statusText}`
                    : action.payload.message

                dispatch(newActionGenerator(action)(errorMessage))
            }
        })
    }
}

const depositFetchRejected = rejectedMiddleware(DepositConstants.FETCH_DEPOSITS_REJECTED)(() => fetchDepositsFailed)

const depositDeleteRejected = rejectedMiddleware(DepositConstants.DELETE_DEPOSIT_REJECTED)(({meta: {id}}) => deleteDepositFailed(id))

export const rejectedRequestMiddleware = [depositFetchRejected, depositDeleteRejected]
