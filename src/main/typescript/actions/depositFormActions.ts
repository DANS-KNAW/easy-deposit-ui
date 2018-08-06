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
import { DepositFormMetadata } from "../components/form/parts"
import { FetchAction, ReduxAction, PromiseAction, ThunkAction } from "../lib/redux"
import { DepositFormConstants } from "../constants/depositFormConstants"
import { DepositId } from "../model/Deposits"
import axios from "axios"
import { fetchDoiURL, fetchMetadataURL, saveDraftURL, submitDepositURL, submitState } from "../constants/serverRoutes"
import { Action } from "redux"
import { AppState } from "../model/AppState"
import { metadataConverter, metadataDeconverter } from "../lib/metadata/Metadata"
import { Doi } from "../lib/metadata/Identifier"

export const registerForm: (depositId: DepositId) => ReduxAction<DepositId> = depositId => ({
    type: DepositFormConstants.REGISTER_FORM,
    payload: depositId,
})

export const unregisterForm: () => Action = () => ({
    type: DepositFormConstants.UNREGISTER_FORM,
})

export const fetchMetadata: (depositId: DepositId) => FetchAction<DepositFormMetadata, AppState> = depositId => ({
    type: DepositFormConstants.FETCH_METADATA,
    async payload() {
        const url = await fetchMetadataURL(depositId)
        const response = await axios.get(url)
        return response.data
    },
    meta: {
        transform: (input: any, getState: () => AppState) => {
            const data = metadataConverter(input, getState().dropDowns)

            // TODO remove this log once the form is fully implemented.
            console.log(data)

            return data
        },
    },
})

export const fetchDoi: (depositId: DepositId) => FetchAction<Doi> = depositId => ({
    type: DepositFormConstants.FETCH_DOI,
    async payload() {
        const url = await fetchDoiURL(depositId)
        const response = await axios.get(url)
        return response.data
    },
    meta: {
        transform: input => input.doi,
    },
})

const callSaveDraft = async (depositId: DepositId, dataToSend: any) => {
    const url = await saveDraftURL(depositId)
    return await axios.put(url, dataToSend)
}

export const saveDraft: (depositId: DepositId, data: DepositFormMetadata) => ThunkAction<AppState> = (depositId, data) => (dispatch, getState) => {
    try {
        const output = metadataDeconverter(data, getState().dropDowns, false)

        // TODO remove this log once the form is fully implemented.
        console.log(`saving draft for ${depositId}`, output)

        return dispatch(saveDraftAction(depositId, output))
    }
    catch (errorMessage) {
        // TODO remove this log once the form is fully implemented.
        console.log({ depositId, data })

        return dispatch(saveDraftRejectedAction(errorMessage))
    }
}

const saveDraftAction: (depositId: DepositId, dataToSend: any) => PromiseAction<void> = (depositId, dataToSend) => ({
    type: DepositFormConstants.SAVE_DRAFT,
    async payload() {
        const response = await callSaveDraft(depositId, dataToSend)
        return response.data
    },
})

export const saveDraftRejectedAction: (errorMessage: string) => ReduxAction<string> = errorMessage => ({
    type: DepositFormConstants.SAVE_DRAFT_REJECTED,
    payload: errorMessage,
})

export const saveDraftResetAction: () => Action = () => ({
    type: DepositFormConstants.SAVE_DRAFT_RESET,
})

export const submitDeposit: (depositId: DepositId, data: DepositFormMetadata) => ThunkAction<AppState> = (depositId, data) => (dispatch, getState) => {
    try {
        const output = metadataDeconverter(data, getState().dropDowns, true)

        // TODO remove this log once the form is fully implemented.
        console.log(`submitting deposit for ${depositId}`, output)

        return dispatch(submitDepositAction(depositId, output))
    }
    catch (errorMessage) {
        // TODO remove this log once the form is fully implemented.
        console.log({ depositId, data })

        return dispatch(submitDepositRejectedAction(errorMessage))
    }
}

const submitDepositAction: (depositId: DepositId, dataToSend: any) => PromiseAction<void> = (depositId, dataToSend) => ({
    type: DepositFormConstants.SUBMIT_DEPOSIT,
    async payload() {
        await callSaveDraft(depositId, dataToSend)
        const url = await submitDepositURL(depositId)
        const response = await axios.put(url, submitState)
        return response.data
    },
})

export const submitDepositRejectedAction: (errorMessage: string) => ReduxAction<string> = errorMessage => ({
    type: DepositFormConstants.SUBMIT_DEPOSIT_REJECTED,
    payload: errorMessage,
})
