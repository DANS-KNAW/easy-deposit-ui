import { Middleware } from "redux"
import { DepositConstants } from "../constants/depositConstants"
import { Deposit, toDepositState } from "../model/Deposits"
import { fetchDepositsFailed, fetchDepositsSucceeded } from "../actions/depositActions"
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

            dispatch(fetchDepositsSucceeded(deposits))
        }
        catch (errorMessage) {
            dispatch(fetchDepositsFailed(errorMessage))
        }
    }
})

export const depositMiddleware = [depositFetchConverter]
