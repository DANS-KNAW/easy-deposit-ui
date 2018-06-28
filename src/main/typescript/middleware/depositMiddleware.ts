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
import { Dispatch, Middleware, MiddlewareAPI } from "redux"
import { DepositOverviewConstants } from "../constants/depositOverviewConstants"
import { Deposits, toDepositState } from "../model/Deposits"
import {
    createNewDepositFailed,
    createNewDepositSuccess,
    fetchDepositsFailed,
    fetchDepositsSucceeded,
} from "../actions/depositOverviewActions"
import { push } from "react-router-redux"
import { depositFormRoute } from "../constants/clientRoutes"
import { depositsConverter } from "../lib/deposits/deposits"

const depositFetchConverter: Middleware = ({ dispatch }: MiddlewareAPI) => (next: Dispatch) => action => {
    next(action)

    if (action.type === DepositOverviewConstants.FETCH_DEPOSITS_FULFILLED) {
        try {
            const deposits: Deposits = depositsConverter(action.payload)
            dispatch(fetchDepositsSucceeded(deposits))
        }
        catch (errorMessage) {
            dispatch(fetchDepositsFailed(errorMessage))
        }
    }
}

const newDepositResponseConverter: Middleware = ({ dispatch }: MiddlewareAPI) => (next: Dispatch) => action => {
    next(action)

    if (action.type === DepositOverviewConstants.CREATE_NEW_DEPOSIT_FULFILLED) {
        const { id, state } = action.payload

        if (toDepositState(state)) {
            dispatch(createNewDepositSuccess())
            dispatch(push(depositFormRoute(id)))
        }
        else {
            dispatch(createNewDepositFailed(`Error in deposit ${id}: no such value: '${state}'`))
        }
    }
}

export const depositMiddleware = [depositFetchConverter, newDepositResponseConverter]
