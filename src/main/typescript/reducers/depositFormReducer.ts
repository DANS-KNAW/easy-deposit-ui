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
import {
    emptyFileDeletingState,
    emptyFetchDepositState, emptyFilesDeletingState,
    emptyInitialState,
    emptySaveDraftState,
    emptySubmitState,
    FetchDepositState, FileDeletingState, FilesDeletingState,
    InitialState,
    SaveDraftState,
    SubmitState,
} from "../model/DepositForm"
import { combineReducers, Reducer } from "redux"
import { DepositFormConstants } from "../constants/depositFormConstants"
import FetchState, { empty as emptyFetchState } from "../model/FetchState"
import { FileOverviewConstants } from "../constants/fileOverviewConstants"

const fetchDepositStateReducer: Reducer<FetchDepositState> = (state = emptyFetchDepositState, action) => {
    switch (action.type) {
        case DepositFormConstants.FETCH_STATE_PENDING:
            return {
                ...state,
                fetching: true,
                fetchError: undefined,
                stateNotFound: false,
            }
        case DepositFormConstants.FETCH_STATE_REJECTED:
            return {
                ...state,
                fetching: false,
                fetched: false,
                fetchError: action.payload,
                stateNotFound: false,
            }
        case DepositFormConstants.FETCH_STATE_SUCCESS:
            return {
                ...state,
                fetching: false,
                fetched: true,
                fetchError: undefined,
            }
        case DepositFormConstants.FETCH_STATE_NOT_FOUND:
            return {
                ...state,
                fetching: false,
                fetched: false,
                stateNotFound: true,
            }
        case DepositFormConstants.UNREGISTER_FORM:
            return emptyFetchDepositState
        default:
            return state
    }
}

const fetchMetadataReducer: Reducer<FetchState> = (state = emptyFetchState, action) => {
    switch (action.type) {
        case DepositFormConstants.FETCH_METADATA_PENDING:
            return {
                ...state,
                fetching: true,
                fetchError: undefined,
            }
        case DepositFormConstants.FETCH_METADATA_REJECTED:
            return {
                ...state,
                fetching: false,
                fetched: false,
                fetchError: action.payload,
            }
        case DepositFormConstants.FETCH_METADATA_SUCCESS:
            return {
                ...state,
                fetching: false,
                fetched: true,
                fetchError: undefined,
            }
        case DepositFormConstants.UNREGISTER_FORM:
            return emptyFetchState
        default:
            return state
    }
}

const fetchFilesReducer: Reducer<FetchState> = (state = emptyFetchState, action) => {
    switch (action.type) {
        case FileOverviewConstants.FETCH_FILES_PENDING:
            return {
                fetching: true,
                fetched: false,
                fetchError: undefined,
            }
        case FileOverviewConstants.FETCH_FILES_REJECTED:
            return {
                fetching: false,
                fetched: false,
                fetchError: action.payload,
            }
        case FileOverviewConstants.FETCH_FILES_FULFILLED:
            return {
                fetching: false,
                fetched: true,
                fetchError: undefined,
            }
        case FileOverviewConstants.FETCH_FILES_SUCCESS:
            return {
                fetching: false,
                fetched: true,
                fetchError: undefined,
            }
        case FileOverviewConstants.CLEAN_FILES:
            return emptyFetchState
        default:
            return state
    }
}

const initialStateReducer: Reducer<InitialState> = (state = emptyInitialState, action) => {
    switch (action.type) {
        case DepositFormConstants.FETCH_STATE_SUCCESS:
            return {
                ...state,
                depositState: action.payload,
            }
        case DepositFormConstants.FETCH_METADATA_SUCCESS:
            return {
                ...state,
                metadata: action.payload,
            }
        case DepositFormConstants.UNREGISTER_FORM:
            return emptyInitialState
        default:
            return state
    }
}

const fetchDoiReducer: Reducer<FetchState> = (state = emptyFetchState, action) => {
    switch (action.type) {
        case DepositFormConstants.FETCH_DOI_PENDING:
            return {
                ...state,
                fetching: true,
                fetchError: undefined,
            }
        case DepositFormConstants.FETCH_DOI_SUCCESS:
            return {
                ...state,
                fetching: false,
                fetched: true,
                fetchError: undefined,
            }
        case DepositFormConstants.FETCH_DOI_REJECTED:
            return {
                ...state,
                fetching: false,
                fetched: false,
                fetchError: action.payload,
            }
        case DepositFormConstants.UNREGISTER_FORM:
            return emptyFetchState
        default:
            return state
    }
}

const saveDraftReducer: Reducer<SaveDraftState> = (state = emptySaveDraftState, action) => {
    switch (action.type) {
        case DepositFormConstants.SAVE_DRAFT_PENDING:
            return {
                ...state,
                saving: true,
                saveError: undefined,
            }
        case DepositFormConstants.SAVE_DRAFT_FULFILLED:
            return {
                ...state,
                saving: false,
                saved: true,
                saveError: undefined,
            }
        case DepositFormConstants.SAVE_DRAFT_REJECTED:
            return {
                ...state,
                saving: false,
                saved: false,
                saveError: action.payload,
            }
        case DepositFormConstants.SAVE_DRAFT_RESET:
            return {
                ...state,
                saved: false,
            }
        case DepositFormConstants.SUBMIT_DEPOSIT_PENDING:
            return {
                ...state,
                saveError: undefined,
            }
        case DepositFormConstants.UNREGISTER_FORM:
            return emptySaveDraftState
        default:
            return state
    }
}

const submitReducer: Reducer<SubmitState> = (state = emptySubmitState, action) => {
    switch (action.type) {
        case DepositFormConstants.SAVE_DRAFT_PENDING:
            return {
                ...state,
                submitError: undefined,
            }
        case DepositFormConstants.SUBMIT_DEPOSIT_PENDING:
            return {
                ...state,
                submitting: true,
                submitError: undefined,
            }
        case DepositFormConstants.SUBMIT_DEPOSIT_FULFILLED:
            return {
                ...state,
                submitting: false,
                submitted: true,
                submitError: undefined,
            }
        case DepositFormConstants.SUBMIT_DEPOSIT_REJECTED:
            return {
                ...state,
                submitting: false,
                submitted: false,
                submitError: action.payload,
            }
        case DepositFormConstants.UNREGISTER_FORM:
            return emptySubmitState
        default:
            return state
    }
}

const deleteFilesReducer: Reducer<FilesDeletingState> = (state = emptyFilesDeletingState, action) => {
    switch (action.type) {
        case FileOverviewConstants.DELETE_FILE_PENDING: {
            const { meta: { filePath } } = action

            const deleteState: FileDeletingState = state[filePath]
            const newDeleteState: FileDeletingState = deleteState
                ? { ...deleteState, deleting: true }
                : { ...emptyFileDeletingState, deleting: true }
            return { ...state, [filePath]: newDeleteState }
        }
        case FileOverviewConstants.DELETE_FILE_REJECTED: {
            const { meta: { filePath }, payload: errorMessage } = action

            const deleteState: FileDeletingState = state[filePath]
            const newDeleteState: FileDeletingState = deleteState
                ? { ...deleteState, deleting: false, deleteError: errorMessage }
                : { ...emptyFileDeletingState, deleteError: errorMessage }
            return { ...state, [filePath]: newDeleteState }
        }
        case FileOverviewConstants.DELETE_FILE_FULFILLED: {
            const { meta: { filePath } } = action

            return Object.entries(state)
                .filter(([path]) => path !== filePath)
                .reduce((prev, [path, ds]) => ({ ...prev, [path]: ds }), emptyFilesDeletingState)
        }
        case FileOverviewConstants.DELETE_FILE_CONFIRMATION: {
            const { meta: { filePath } } = action

            const deleteState: FileDeletingState = state[filePath]
            const newDeleteState: FileDeletingState = deleteState
                ? { ...deleteState, deleting: true }
                : { ...emptyFileDeletingState, deleting: true }
            return { ...state, [filePath]: newDeleteState }
        }
        case FileOverviewConstants.DELETE_FILE_CANCELLED: {
            const { meta: { filePath } } = action

            return Object.entries(state)
                .filter(([path]) => path !== filePath)
                .reduce((prev, [path, ds]) => ({ ...prev, [path]: ds }), emptyFilesDeletingState)
        }
        case FileOverviewConstants.CLEAN_FILES:
            return emptyFilesDeletingState
        default:
            return state
    }
}

export default combineReducers({
    fetchDepositState: fetchDepositStateReducer,
    fetchMetadata: fetchMetadataReducer,
    fetchFiles: fetchFilesReducer,
    initialState: initialStateReducer,
    fetchDoi: fetchDoiReducer,
    saveDraft: saveDraftReducer,
    submit: submitReducer,
    deletingFiles: deleteFilesReducer,
})
