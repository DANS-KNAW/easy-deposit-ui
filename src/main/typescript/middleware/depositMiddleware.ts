/*
 * Copyright (C) 2018 DANS - Data Archiving and Networked Services (info@dans.knaw.nl)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Middleware } from "redux"
import { DepositConstants } from "../constants/depositConstants"
import { Deposit, Deposits, toDepositState } from "../model/Deposits"
import { fetchDepositsFailed, fetchDepositsSucceeded } from "../actions/depositActions"
import { createMiddleware } from "../lib/redux"

const depositFetchConverter: Middleware = createMiddleware(({dispatch}, next, action) => {
    next(action)

    if (action.type === DepositConstants.FETCH_DEPOSITS_FULFILLED) {
        console.log(action.payload)
        try {
            const deposits: Deposits = action.payload.map((input: any) => {
                const state = toDepositState(input.state)
                if (state) {
                    return ({
                        depositId: input.id,
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
            }).reduce((obj: Deposits, item: Deposit & {depositId: string}) => {
                obj[item.depositId] = ({
                    title: item.title,
                    state: item.state,
                    stateDescription: item.stateDescription,
                    date: item.date
                })
                return obj
            }, {})

            dispatch(fetchDepositsSucceeded(deposits))
        }
        catch (errorMessage) {
            dispatch(fetchDepositsFailed(errorMessage))
        }
    }
})

export const depositMiddleware = [depositFetchConverter]
