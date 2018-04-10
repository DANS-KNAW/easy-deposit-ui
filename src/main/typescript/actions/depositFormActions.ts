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

export const setDepositId: (depositId: DepositId) => ReduxAction<DepositId> = depositId => ({
    type: DepositFormConstants.SET_DEPOSIT_ID,
    payload: depositId,
})

export const fetchMetadata: (depositId: DepositId) => ReduxAction<Promise<any>> = depositId => ({
    type: DepositFormConstants.FETCH_METADATA,
    async payload() {
        // TODO temporary do a fake timeout to simulate server I/O
        await new Promise(resolve => setTimeout(resolve, 1000))
        const response = await axios.get(fetchMetadataURL(depositId))
        console.log(response.data)
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

const callSaveDraft = async (depositId: DepositId, data: DepositFormData) => {
    return await axios.put(saveDraftURL(depositId), data)
}

export const saveDraft: (depositId: DepositId, data: DepositFormData) => ReduxAction<Promise<void>> = (depositId, data) => ({
    type: DepositFormConstants.SAVE_DRAFT,
    async payload() {
        // TODO temporary do a fake timeout to simulate server I/O
        await new Promise(resolve => setTimeout(resolve, 1000))

        const response = await callSaveDraft(depositId, data)
        return response.data
    },
})

export const saveDraftFailed: (errorMessage: string) => ReduxAction<string> = errorMessage => ({
    type: DepositFormConstants.SAVE_DRAFT_FAILED,
    payload: errorMessage,
})

export const submitDeposit: (depositId: DepositId, data: DepositFormData) => ReduxAction<Promise<void>> = (depositId, data) => ({
    type: DepositFormConstants.SUBMIT_DEPOSIT,
    async payload() {
        // TODO temporary do a fake timeout to simulate server I/O
        await new Promise(resolve => setTimeout(resolve, 1000))

        await callSaveDraft(depositId, data)
        const response = await axios.put(submitDepositURL(depositId), submitState)
        return response.data
    },
})

export const submitDepositFailed: (errorMessage: string) => ReduxAction<string> = errorMessage => ({
    type: DepositFormConstants.SUBMIT_DEPOSIT_FAILED,
    payload: errorMessage,
})
