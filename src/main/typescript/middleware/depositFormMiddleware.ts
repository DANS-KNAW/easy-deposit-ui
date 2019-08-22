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
import { depositStateNotFound, saveDraftResetAction } from "../actions/depositFormActions"
import { actionTypes, change, getFormValues, initialize } from "redux-form"
import { get } from "lodash"
import { AppState } from "../model/AppState"
import { DropdownListEntry } from "../model/DropdownLists"

const depositStateNotFoundMiddleware: Middleware = ({ dispatch }) => (next: Dispatch) => action => {
    if (action.type && action.type === DepositFormConstants.FETCH_STATE_REJECTED && action.payload) {
        const { payload } = action

        if (payload.response && payload.response.status === 404)
            dispatch(depositStateNotFound())
        else
            next(action)
    }
    else
        next(action)
}

const fetchDoiProcessor: Middleware = ({ dispatch }: MiddlewareAPI) => (next: Dispatch) => action => {
    next(action)

    if (action.type === DepositFormConstants.FETCH_DOI_SUCCESS)
        dispatch(change(depositFormName, "doi", action.payload))
}

const saveTimer: Middleware = ({ dispatch }: MiddlewareAPI) => (next: Dispatch) => action => {
    next(action)

    if (action.type === DepositFormConstants.SAVE_DRAFT_FULFILLED)
        setTimeout(() => dispatch(saveDraftResetAction()), saveDraftResetTimeout * 1000)
}

const initializeFormAfterSaveDraft: Middleware = ({ dispatch, getState }: MiddlewareAPI) => (next: Dispatch) => action => {
    next(action)

    if (action.type === DepositFormConstants.SAVE_DRAFT_FULFILLED) {
        const state = getState()
        const data = state && state.form && state.form.depositForm && state.form.depositForm.values

        dispatch(initialize(depositFormName, data, {
            keepDirty: false,
            updateUnregisteredFields: true,
            keepValues: true,
        }))
    }
}

const submitReroute: Middleware = () => (next: Dispatch) => action => {
    next(action)

    if (action.type === DepositFormConstants.SUBMIT_DEPOSIT_FULFILLED)
        action.meta.history.push(depositOverviewRoute)
}

const replaceContributorIdFieldValue: Middleware = ({ dispatch, getState }: MiddlewareAPI) => (next: Dispatch) => action => {
    if (action.type === actionTypes.CHANGE && action.meta && action.meta.field && action.payload) {
        const state: AppState = getState()
        const formData = getFormValues(depositFormName)(state)

        if (action.meta.field.match(/^contributors\[\d+].ids\[\d+].scheme$/)) {
            next(action)

            const value = get(formData, action.meta.field.replace(".scheme", ".value"))
            if (value) {
                const scheme = action.payload
                const contributorEntry = state.dropDowns.contributorIds.list.find(({ key }: DropdownListEntry) => key === scheme)
                if (contributorEntry && contributorEntry.replace)
                    // replacement of the value itself happens on the pass-through of this new action through this method
                    dispatch(change(depositFormName, action.meta.field.replace(".scheme", ".value"), value))
            }
            return
        }

        if (action.meta.field.match(/^contributors\[\d+].ids\[\d+].value$/)) {
            const scheme = get(formData, action.meta.field.replace(".value", ".scheme"))
            if (scheme) {
                const contributorEntry = state.dropDowns.contributorIds.list.find(({ key }: DropdownListEntry) => key === scheme)
                if (contributorEntry && contributorEntry.replace) {
                    next({
                        ...action,
                        payload: contributorEntry.replace.reduce((v, cfg) => v.replace(cfg.from, cfg.to), action.payload),
                    })
                    return
                }
            }
        }
    }
    next(action)
}

export const depositFormMiddleware: Middleware[] = [
    depositStateNotFoundMiddleware,
    replaceContributorIdFieldValue,
    fetchDoiProcessor,
    saveTimer,
    initializeFormAfterSaveDraft,
    submitReroute,
]
