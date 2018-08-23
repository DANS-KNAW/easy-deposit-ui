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
import { FetchAction, PromiseAction, ReduxAction, ThunkAction } from "../lib/redux"
import { DepositFormConstants } from "../constants/depositFormConstants"
import { DepositId } from "../model/Deposits"
import axios from "axios"
import { Action } from "redux"
import { AppState } from "../model/AppState"
import { metadataConverter, metadataDeconverter } from "../lib/metadata/Metadata"
import { Doi } from "../lib/metadata/Identifier"
import { fetchDoiUrl, fetchMetadataUrl, saveDraftUrl, submitDepositUrl } from "../selectors/serverRoutes"

export const registerForm: (depositId: DepositId) => ReduxAction<DepositId> = depositId => ({
    type: DepositFormConstants.REGISTER_FORM,
    payload: depositId,
})

export const unregisterForm: () => Action = () => ({
    type: DepositFormConstants.UNREGISTER_FORM,
})

export const fetchMetadata: (depositId: DepositId) => ThunkAction<FetchAction<DepositFormMetadata, AppState>> = depositId => (dispatch, getState) => dispatch({
    type: DepositFormConstants.FETCH_METADATA,
    async payload() {
        const response = await axios.get(fetchMetadataUrl(depositId)(getState()))
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

export const fetchDoi: (depositId: DepositId) => ThunkAction<FetchAction<Doi>> = depositId => (dispatch, getState) => dispatch({
    type: DepositFormConstants.FETCH_DOI,
    async payload() {
        const response = await axios.get(fetchDoiUrl(depositId)(getState()))
        return response.data
    },
    meta: {
        transform: (input: any) => input.doi,
    },
})

export const saveDraft: (depositId: DepositId, data: DepositFormMetadata) => ThunkAction<PromiseAction<void> | ReduxAction<string>> = (depositId, data) => (dispatch, getState) => {
    try {
        const output = metadataDeconverter(data, getState().dropDowns, false)

        // TODO remove this log once the form is fully implemented.
        console.log(`saving draft for ${depositId}`, output)

        return dispatch({
            type: DepositFormConstants.SAVE_DRAFT,
            async payload() {
                const response = await axios.put(saveDraftUrl(depositId)(getState()), output)
                return response.data
            },
        })
    }
    catch (errorMessage) {
        // TODO remove this log once the form is fully implemented.
        console.log({ depositId, data })

        return dispatch(saveDraftRejectedAction(errorMessage))
    }
}

export const saveDraftRejectedAction: (errorMessage: string) => ReduxAction<string> = errorMessage => ({
    type: DepositFormConstants.SAVE_DRAFT_REJECTED,
    payload: errorMessage,
})

export const saveDraftResetAction: () => Action = () => ({
    type: DepositFormConstants.SAVE_DRAFT_RESET,
})

export const submitDeposit: (depositId: DepositId, data: DepositFormMetadata) => ThunkAction<PromiseAction<void> | ReduxAction<string>> = (depositId, data) => (dispatch, getState) => {
    try {
        const output = metadataDeconverter(data, getState().dropDowns, true)

        // TODO remove this log once the form is fully implemented.
        console.log(`submitting deposit for ${depositId}`, output)

        return dispatch({
            type: DepositFormConstants.SUBMIT_DEPOSIT,
            async payload() {
                await axios.put(saveDraftUrl(depositId)(getState()), output)
                const submitState = {
                    state: "SUBMITTED",
                    stateDescription: "Deposit is ready for post-submission processing",
                }
                const response = await axios.put(submitDepositUrl(depositId)(getState()), submitState)
                return response.data
            },
        })
    }
    catch (errorMessage) {
        // TODO remove this log once the form is fully implemented.
        console.log({ depositId, data })

        return dispatch(submitDepositRejectedAction(errorMessage))
    }
}

export const submitDepositRejectedAction: (errorMessage: string) => ReduxAction<string> = errorMessage => ({
    type: DepositFormConstants.SUBMIT_DEPOSIT_REJECTED,
    payload: errorMessage,
})
