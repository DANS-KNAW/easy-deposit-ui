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
import { push } from "react-router-redux"
import { depositOverviewRoute } from "../constants/clientRoutes"
import {
    fetchDoiSucceeded,
    fetchMetadataFailed,
    fetchMetadataSucceeded,
    sendSaveDraft,
    sendSaveDraftFailed,
    sendSaveDraftReset,
    sendSubmitDeposit,
    sendSubmitDepositFailed,
} from "../actions/depositFormActions"
import { change } from "redux-form"
import { metadataConverter, metadataDeconverter } from "../lib/metadata/Metadata"

const metadataFetchConverter: Middleware = ({ dispatch, getState }: MiddlewareAPI) => (next: Dispatch) => action => {
    next(action)

    if (action.type === DepositFormConstants.FETCH_METADATA_FULFILLED) {
        try {
            const data = metadataConverter(action.payload, getState().dropDowns)

            // TODO remove this log once the form is fully implemented.
            console.log(data)

            dispatch(fetchMetadataSucceeded(data))
        }
        catch (errorMessage) {
            dispatch(fetchMetadataFailed(errorMessage))
        }
    }
}

const metadataSendConverter: Middleware = ({ dispatch, getState }: MiddlewareAPI) => (next: Dispatch) => action => {
    next(action)

    if (action.type === DepositFormConstants.SAVE_DRAFT) {
        try {
            const output = metadataDeconverter(action.payload.data, getState().dropDowns, false)

            // TODO remove this log once the form is fully implemented.
            console.log(`saving draft for ${action.payload.depositId}`, output)

            dispatch(sendSaveDraft(action.payload.depositId, output))
        }
        catch (errorMessage) {
            dispatch(sendSaveDraftFailed(errorMessage))
        }
    }
    else if (action.type === DepositFormConstants.SUBMIT_DEPOSIT) {
        try {
            const output = metadataDeconverter(action.payload.data, getState().dropDowns, true)

            // TODO remove this log once the form is fully implemented.
            console.log(`saving draft for ${action.payload.depositId}`, output)

            dispatch(sendSubmitDeposit(action.payload.depositId, output))
        }
        catch (errorMessage) {
            dispatch(sendSubmitDepositFailed(errorMessage))
        }
    }
}

const fetchDoiProcessor: Middleware = ({ dispatch }: MiddlewareAPI) => (next: Dispatch) => action => {
    next(action)

    if (action.type === DepositFormConstants.FETCH_DOI_FULFILLED) {
        dispatch(change(depositFormName, "doi", action.payload.doi))
        dispatch(fetchDoiSucceeded())
    }
}

const saveTimer: Middleware = ({ dispatch }: MiddlewareAPI) => (next: Dispatch) => action => {
    next(action)

    if (action.type === DepositFormConstants.SEND_SAVE_DRAFT_FULFILLED) {
        setTimeout(() => dispatch(sendSaveDraftReset()), saveDraftResetTimeout * 1000)
    }
}

const submitReroute: Middleware = ({ dispatch }: MiddlewareAPI) => (next: Dispatch) => action => {
    if (action.type === DepositFormConstants.SEND_SUBMIT_DEPOSIT_FULFILLED) {
        dispatch(push(depositOverviewRoute))
    }

    next(action)
}

export const depositFormMiddleware = [
    metadataFetchConverter,
    metadataSendConverter,
    fetchDoiProcessor,
    saveTimer,
    submitReroute,
]
