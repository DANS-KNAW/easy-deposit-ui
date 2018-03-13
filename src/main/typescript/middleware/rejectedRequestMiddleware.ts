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
import { DepositConstants } from "../constants/depositConstants"
import { Action, AnyAction, Middleware } from "redux"
import { createMiddleware } from "../lib/redux"
import { deleteDepositFailed, fetchDepositsFailed } from "../actions/depositActions"

type NewActionGenerator = (action: AnyAction) => (errorMessage: string) => Action

function rejectedMiddleware(type: string) {
    return function (newActionGenerator: NewActionGenerator): Middleware {
        return createMiddleware(({ dispatch }, next, action) => {
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

const depositDeleteRejected = rejectedMiddleware(DepositConstants.DELETE_DEPOSIT_REJECTED)(({ meta: { depositId } }) => deleteDepositFailed(depositId))

export const rejectedRequestMiddleware = [depositFetchRejected, depositDeleteRejected]
