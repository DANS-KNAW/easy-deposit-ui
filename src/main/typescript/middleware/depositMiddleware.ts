import { Middleware } from "redux"
import { DepositConstants } from "../constants/depositConstants"
import { Deposit, toDepositState } from "../model/Deposits"
import { deleteDepositFailed, fetchDepositsFailed, fetchDepositsSuccess } from "../actions/depositActions"
import { createMiddleware } from "../lib/redux"

const depositFetchConverter: Middleware = createMiddleware(({dispatch}, next, action) => {
    next(action)

    if (action.type === DepositConstants.FETCH_DEPOSITS_FULFILLED) {
        try {
            const deposits: Deposit[] = action.payload.map((input: any) => {
                const state = toDepositState(input.state)
                if (state) {
                    return ({
                        id: input.id,
                        title: input.title,
                        state: state,
                        stateDescription: input.state_description,
                        date: new Date(input.date)
                    })
                }
                else
                    // fail fast when an illegal deposit state is detected
                    // error message is caught below
                    throw `Error in deposit ${input.id}: no such value: '${input.state}'`
            })

            dispatch(fetchDepositsSuccess(deposits))
        }
        catch (errorMessage) {
            dispatch(fetchDepositsFailed(errorMessage))
        }
    }
})

const depositFetchRejected: Middleware = createMiddleware(({dispatch}, next, action) => {
    next(action)

    if (action.type === DepositConstants.FETCH_DEPOSITS_REJECTED) {
        const response = action.payload.response
        const errorMessage = response
            ? `${response.status} - ${response.statusText}`
            : action.payload.message

        dispatch(fetchDepositsFailed(errorMessage))
    }
})

const depositDeleteRejected: Middleware = createMiddleware(({dispatch}, next, action) => {
    next(action)

    if (action.type === DepositConstants.DELETE_DEPOSIT_REJECTED) {
        const response = action.payload.response
        const errorMessage = response
            ? `${response.status} - ${response.statusText}`
            : action.payload.message

        dispatch(deleteDepositFailed(action.meta.id, errorMessage))
    }
})

export const depositMiddleware = [depositFetchConverter, depositFetchRejected, depositDeleteRejected]
