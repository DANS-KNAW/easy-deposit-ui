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
import { depositStateNotFound, fetchDepositState, saveDraftResetAction } from "../actions/depositFormActions"
import { actionTypes, change, initialize } from "redux-form"
import { DAI, ISNI, ORCID } from "../lib/metadata/Contributor"
import { FileOverviewConstants } from "../constants/fileOverviewConstants"

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

const fetchStateAfterSetFromRejectedToDraft: Middleware = ({ dispatch }: MiddlewareAPI<Dispatch<any>>) => (next: Dispatch) => action => {
    next(action)

    if ((action.type === DepositFormConstants.SAVE_DRAFT_FULFILLED || action.type === FileOverviewConstants.DELETE_FILE_FULFILLED)
        && action.meta?.setStateToDraft
        && action.meta?.depositId)
        dispatch(fetchDepositState(action.meta.depositId))
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

const replaceContributorIdFieldValue: Middleware = () => (next: Dispatch) => action => {
    if (action.type === actionTypes.CHANGE && action.meta?.field && action.payload) {
        const idType = action.meta.field.match(/^contributors\[\d+].(orcid|isni|dai)/)?.[1]
        if (idType) {
            const type = idType === "orcid" ? ORCID :
                idType === "isni" ? ISNI :
                    idType === "dai" ? DAI :
                        undefined
            const newIdValue = type?.replace?.reduce((v, cfg) => v.replace(cfg.from, cfg.to), action.payload)
            if (newIdValue) {
                next({
                    ...action,
                    payload: newIdValue,
                })
                return
            }
        }
    }
    next(action)
}

export const depositFormMiddleware: Middleware[] = [
    depositStateNotFoundMiddleware,
    replaceContributorIdFieldValue,
    fetchDoiProcessor,
    fetchStateAfterSetFromRejectedToDraft,
    saveTimer,
    initializeFormAfterSaveDraft,
    submitReroute,
]
