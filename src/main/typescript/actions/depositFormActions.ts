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
import { DepositFormData, DepositFormMetadata } from "../components/form/parts"
import { ReduxAction } from "../lib/redux"
import { DepositFormConstants } from "../constants/depositFormConstants"
import { DepositId } from "../model/Deposits"
import axios from "axios"
import { fetchMetadataURL, saveDraftURL, submitDepositURL, submitState } from "../constants/apiConstants"
import { Action } from "redux"

export const registerForm: (depositId: DepositId) => ReduxAction<DepositId> = depositId => ({
    type: DepositFormConstants.REGISTER_FORM,
    payload: depositId,
})

export const unregisterForm: () => Action = () => ({
    type: DepositFormConstants.UNREGISTER_FORM,
})

export const fetchMetadata: (depositId: DepositId) => ReduxAction<Promise<any>> = depositId => ({
    type: DepositFormConstants.FETCH_METADATA,
    async payload() {
        // TODO temporary do a fake timeout to simulate server I/O
        await new Promise(resolve => setTimeout(resolve, 1000))
        const response = await axios.get(fetchMetadataURL(depositId))
        return response.data
    },
})

export const fetchMetadataSucceeded: (data: DepositFormMetadata) => ReduxAction<DepositFormMetadata> = data => ({
    type: DepositFormConstants.FETCH_METADATA_SUCCEEDED,
    payload: data,
})

export const fetchMetadataFailed: (errorMessage: string) => ReduxAction<string> = errorMessage => ({
    type: DepositFormConstants.FETCH_METADATA_FAILED,
    payload: errorMessage,
})

const callSaveDraft = async (depositId: DepositId, dataToSend: any) => {
    return await axios.put(saveDraftURL(depositId), dataToSend)
}

export const saveDraft: (depositId: DepositId, data: DepositFormData) => ReduxAction<{ depositId: DepositId, data: DepositFormData }> = (depositId, data) => ({
    type: DepositFormConstants.SAVE_DRAFT,
    payload: { depositId: depositId, data: data },
})

export const sendSaveDraft: (depositId: DepositId, dataToSend: any) => ReduxAction<Promise<void>> = (depositId, dataToSend) => ({
    type: DepositFormConstants.SEND_SAVE_DRAFT,
    async payload() {
        // TODO temporary do a fake timeout to simulate server I/O
        await new Promise(resolve => setTimeout(resolve, 1000))

        const response = await callSaveDraft(depositId, dataToSend)
        return response.data
    },
})

export const sendSaveDraftFailed: (errorMessage: string) => ReduxAction<string> = errorMessage => ({
    type: DepositFormConstants.SEND_SAVE_DRAFT_FAILED,
    payload: errorMessage,
})

export const sendSaveDraftReset: () => Action = () => ({
    type: DepositFormConstants.SEND_SAVE_DRAFT_RESET,
})

export const submitDeposit: (depositId: DepositId, data: DepositFormData) => ReduxAction<{ depositId: DepositId, data: DepositFormData }> = (depositId, data) => ({
    type: DepositFormConstants.SUBMIT_DEPOSIT,
    payload: { depositId: depositId, data: data },
})

export const sendSubmitDeposit: (depositId: DepositId, dataToSend: any) => ReduxAction<Promise<void>> = (depositId, dataToSend) => ({
    type: DepositFormConstants.SEND_SUBMIT_DEPOSIT,
    async payload() {
        // TODO temporary do a fake timeout to simulate server I/O
        await new Promise(resolve => setTimeout(resolve, 1000))

        console.log(depositId)

        await callSaveDraft(depositId, dataToSend)
        const response = await axios.put(submitDepositURL(depositId), submitState)
        return response.data
    },
})

export const sendSubmitDepositFailed: (errorMessage: string) => ReduxAction<string> = errorMessage => ({
    type: DepositFormConstants.SEND_SUBMIT_DEPOSIT_FAILED,
    payload: errorMessage,
})
