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
import * as H from "history"
import { DepositFormMetadata } from "../components/form/parts"
import { ComplexThunkAction, FetchAction, PromiseAction, ReduxAction, ThunkAction } from "../lib/redux"
import { DepositFormConstants } from "../constants/depositFormConstants"
import { DepositId } from "../model/Deposits"
import { Action } from "redux"
import { AppState } from "../model/AppState"
import { metadataConverter, metadataDeconverter } from "../lib/metadata/Metadata"
import { Doi } from "../lib/metadata/Identifier"
import { filesConverter } from "../lib/files/files"
import fetch from "../lib/fetch"
import {
    deleteFileUrl,
    fetchDepositStateUrl,
    fetchDoiUrl,
    fetchMetadataUrl,
    listFilesUrl,
    saveDraftUrl,
    submitDepositUrl,
} from "../selectors/serverRoutes"
import { DepositState } from "../model/DepositState"
import { Files } from "../model/FileInfo"
import { depositStateConverter } from "../lib/depositState/depositState"
import { AxiosResponse } from "axios"

export const unregisterForm: () => Action = () => ({
    type: DepositFormConstants.UNREGISTER_FORM,
})

export const fetchDepositState: (depositId: DepositId) => ThunkAction<FetchAction<DepositState>> = depositId => (dispatch, getState) => dispatch({
    type: DepositFormConstants.FETCH_STATE,
    async payload() {
        const response = await fetch.get(fetchDepositStateUrl(depositId)(getState()))
        return response.data
    },
    meta: {
        transform: (input: any) => depositStateConverter(input),
    },
})

export const depositStateNotFound: () => Action = () => ({
    type: DepositFormConstants.FETCH_STATE_NOT_FOUND,
})

export const fetchFiles: (depositId: DepositId) => ThunkAction<FetchAction<Files>> = (depositId) => (dispatch, getState) => dispatch({
    type: DepositFormConstants.FETCH_FILES,
    async payload() {
        const response = await fetch.get(listFilesUrl(depositId)(getState()))
        return response.data
    },
    meta: {
        transform: filesConverter,
    },
})

export const fetchMetadata: (depositId: DepositId) => ThunkAction<FetchAction<DepositFormMetadata, AppState>> = depositId => (dispatch, getState) => dispatch({
    type: DepositFormConstants.FETCH_METADATA,
    async payload() {
        const response = await fetch.get(fetchMetadataUrl(depositId)(getState()))
        return response.data
    },
    meta: {
        transform: (input: any, getState: () => AppState) => metadataConverter(input, getState().dropDowns),
    },
})

export const fetchMetadataAndFiles: (depositId: DepositId) => ComplexThunkAction = depositId => async (dispatch, getState) => {
    const filePromise = fetch.get(listFilesUrl(depositId)(getState()))
    const metadataPromise = fetch.get(fetchMetadataUrl(depositId)(getState()))

    dispatch({
        type: DepositFormConstants.FETCH_FILES_PENDING,
    })
    dispatch({
        type: DepositFormConstants.FETCH_METADATA_PENDING,
    })

    try {
        const metadataResponse = await metadataPromise
        try {
            const fileResponse = await filePromise

            dispatch({
                type: DepositFormConstants.FETCH_FILES_FULFILLED,
            })
            dispatch({
                type: DepositFormConstants.FETCH_METADATA_SUCCESS,
                payload: {
                    ...(metadataConverter(metadataResponse.data, getState().dropDowns)),
                    files: filesConverter(fileResponse.data),
                },
            })
        }
        catch (fileError) {
            dispatch({
                type: DepositFormConstants.FETCH_FILES_REJECTED,
                payload: fileError,
            })
        }
    }
    catch (metadataError) {
        dispatch({
            type: DepositFormConstants.FETCH_METADATA_REJECTED,
            payload: metadataError,
        })
    }
}

export const fetchDoi: (depositId: DepositId) => ThunkAction<FetchAction<Doi>> = depositId => (dispatch, getState) => dispatch({
    type: DepositFormConstants.FETCH_DOI,
    async payload() {
        const response = await fetch.get(fetchDoiUrl(depositId)(getState()))
        return response.data
    },
    meta: {
        transform: (input: any) => input.doi,
    },
})

export const setStateToDraft: (depositId: DepositId, getState: () => AppState) => Promise<AxiosResponse> = async (depositId, getState) => {
    const draftState = {
        state: "DRAFT",
        stateDescription: "Deposit is open for changes again",
    }
    return await fetch.put(submitDepositUrl(depositId)(getState()), draftState)
}

const setStateToSubmitted: (depositId: DepositId, getState: () => AppState) => Promise<AxiosResponse> = async (depositId, getState) => {
    const submitState = {
        state: "SUBMITTED",
        stateDescription: "Deposit is ready for post-submission processing",
    }
    return await fetch.put(submitDepositUrl(depositId)(getState()), submitState)
}

const doSaveDraft: (depositId: DepositId, getState: () => AppState, output: any) => Promise<AxiosResponse> = async (depositId, getState, output) => {
    return await fetch.put(saveDraftUrl(depositId)(getState()), output)
}

export const saveDraft: (depositId: DepositId, data: DepositFormMetadata, setToDraft: boolean) => ComplexThunkAction = (depositId, data, setToDraft) => (dispatch, getState) => {
    try {
        const output = metadataDeconverter(data, getState().dropDowns, false)

        dispatch({
            type: DepositFormConstants.SAVE_DRAFT,
            async payload() {
                if (setToDraft)
                    await setStateToDraft(depositId, getState)

                const response = await doSaveDraft(depositId, getState, output)
                return response.data
            },
            meta: {
                depositId: depositId,
                setStateToDraft: setToDraft,
            },
        })
    }
    catch (errorMessage) {
        dispatch(saveDraftRejectedAction(errorMessage))
    }
}

export const saveDraftRejectedAction: (errorMessage: string) => ReduxAction<string> = errorMessage => ({
    type: DepositFormConstants.SAVE_DRAFT_REJECTED,
    payload: errorMessage,
})

export const saveDraftResetAction: () => Action = () => ({
    type: DepositFormConstants.SAVE_DRAFT_RESET,
})

export const submitDeposit: (depositId: DepositId, data: DepositFormMetadata, history: H.History, setToDraft: boolean) => ThunkAction<PromiseAction<void> | ReduxAction<string>> = (depositId, data, history, setToDraft) => (dispatch, getState) => {
    try {
        const output = metadataDeconverter(data, getState().dropDowns, true)

        return dispatch({
            type: DepositFormConstants.SUBMIT_DEPOSIT,
            async payload() {
                if (setToDraft)
                    await setStateToDraft(depositId, getState)

                await doSaveDraft(depositId, getState, output)

                const response = await setStateToSubmitted(depositId, getState)
                return response.data
            },
            meta: {
                history: history,
            },
        })
    }
    catch (errorMessage) {
        return dispatch(submitDepositRejectedAction(errorMessage))
    }
}

export const submitDepositRejectedAction: (errorMessage: string) => ReduxAction<string> = errorMessage => ({
    type: DepositFormConstants.SUBMIT_DEPOSIT_REJECTED,
    payload: errorMessage,
})

export const deleteFile: (depositId: DepositId, filePath: string, setToDraft: boolean) => ThunkAction<PromiseAction<void>> = (depositId, filePath, setToDraft) => (dispatch, getState) => dispatch({
    type: DepositFormConstants.DELETE_FILE,
    async payload() {
        if (setToDraft)
            await setStateToDraft(depositId, getState)

        await fetch.delete(deleteFileUrl(depositId, filePath)(getState()))
        dispatch(fetchFiles(depositId))
    },
    meta: {
        filePath: filePath,
        depositId: depositId,
        setStateToDraft: setToDraft,
    },
})

export const cancelDeleteFile: (filePath: string) => Action = (filePath) => ({
    type: DepositFormConstants.DELETE_FILE_CANCELLED,
    meta: { filePath: filePath },
})

export const askConfirmationToDeleteFile: (filePath: string) => Action = (filePath) => ({
    type: DepositFormConstants.DELETE_FILE_CONFIRMATION,
    meta: { filePath: filePath },
})
