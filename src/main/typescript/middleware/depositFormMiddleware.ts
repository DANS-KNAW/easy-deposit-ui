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
import { DepositFormConstants, depositFormName, saveDraftResetTimeout } from "../constants/depositFormConstants"
import { depositOverviewRoute } from "../constants/clientRoutes"
import { saveDraftResetAction } from "../actions/depositFormActions"
import { change, initialize } from "redux-form"

const fetchDoiProcessor: Middleware = ({ dispatch }: MiddlewareAPI) => (next: Dispatch) => action => {
    next(action)

    if (action.type === DepositFormConstants.FETCH_DOI_SUCCESS)
        dispatch(change(depositFormName, "doi", action.payload))
}

const saveTimer: Middleware = ({ dispatch, getState }: MiddlewareAPI) => (next: Dispatch) => action => {
    next(action)

    if (action.type === DepositFormConstants.SAVE_DRAFT_FULFILLED) {
        const state = getState()
        const data = state && state.form && state.form.depositForm && state.form.depositForm.values

        dispatch(initialize(depositFormName, data, {
            keepDirty: false,
            updateUnregisteredFields: true,
            keepValues: true,
        }))

        setTimeout(() => dispatch(saveDraftResetAction()), saveDraftResetTimeout * 1000)
    }
}

const submitReroute: Middleware = () => (next: Dispatch) => action => {
    next(action)

    if (action.type === DepositFormConstants.SUBMIT_DEPOSIT_FULFILLED)
        action.meta.history.push(depositOverviewRoute)
}

export const depositFormMiddleware: Middleware[] = [
    fetchDoiProcessor,
    saveTimer,
    submitReroute,
]
