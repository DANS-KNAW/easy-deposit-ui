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
import { combineReducers, Reducer } from "redux"
import {
    DeleteState,
    DeletingStates,
    emptyDelete,
    emptyDeleteStates,
    emptyLoadingState,
    LoadingState,
} from "../model/FileInfo"
import { FileOverviewConstants } from "../constants/fileOverviewConstants"

const loadingReducer: Reducer<LoadingState> = (state = emptyLoadingState, action) => {
    switch (action.type) {
        case FileOverviewConstants.FETCH_FILES_PENDING:
            return {
                loading: true,
                loaded: false,
                loadingError: undefined,
            }
        case FileOverviewConstants.FETCH_FILES_REJECTED:
            return {
                loading: false,
                loaded: false,
                loadingError: action.payload,
            }
        case FileOverviewConstants.FETCH_FILES_FULFILLED:
            return {
                loading: false,
                loaded: true,
                loadingError: undefined,
            }
        case FileOverviewConstants.FETCH_FILES_SUCCESS:
            return {
                loading: false,
                loaded: true,
                loadingError: undefined,
            }
        case FileOverviewConstants.CLEAN_FILES:
            return emptyLoadingState
        default:
            return state
    }
}

const deletingReducer: Reducer<DeletingStates> = (state = emptyDeleteStates, action) => {
    switch (action.type) {
        case FileOverviewConstants.DELETE_FILE_PENDING: {
            const { meta: { filePath } } = action

            const deleteState: DeleteState = state[filePath]
            const newDeleteState: DeleteState = deleteState
                ? { ...deleteState, deleting: true }
                : { ...emptyDelete, deleting: true }
            return { ...state, [filePath]: newDeleteState }
        }
        case FileOverviewConstants.DELETE_FILE_REJECTED: {
            const { meta: { filePath }, payload: errorMessage } = action

            const deleteState: DeleteState = state[filePath]
            const newDeleteState: DeleteState = deleteState
                ? { ...deleteState, deleting: false, deleteError: errorMessage }
                : { ...emptyDelete, deleteError: errorMessage }
            return { ...state, [filePath]: newDeleteState }
        }
        case FileOverviewConstants.DELETE_FILE_FULFILLED: {
            const { meta: { filePath } } = action

            return Object.entries(state)
                .filter(([path]) => path !== filePath)
                .reduce((prev, [path, ds]) => ({ ...prev, [path]: ds }), emptyDeleteStates)
        }
        case FileOverviewConstants.DELETE_FILE_CONFIRMATION: {
            const { meta: { filePath } } = action

            const deleteState: DeleteState = state[filePath]
            const newDeleteState: DeleteState = deleteState
                ? { ...deleteState, deleting: true }
                : { ...emptyDelete, deleting: true }
            return { ...state, [filePath]: newDeleteState }
        }
        case FileOverviewConstants.DELETE_FILE_CANCELLED: {
            const { meta: { filePath } } = action

            return Object.entries(state)
                .filter(([path]) => path !== filePath)
                .reduce((prev, [path, ds]) => ({ ...prev, [path]: ds }), emptyDeleteStates)
        }
        case FileOverviewConstants.CLEAN_FILES:
            return emptyDeleteStates
        default:
            return state
    }
}

export default combineReducers({
    loading: loadingReducer,
    deleting: deletingReducer,
})
