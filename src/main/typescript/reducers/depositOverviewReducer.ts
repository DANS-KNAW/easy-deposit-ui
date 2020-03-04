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
    DeleteState,
    DeletingStates,
    Deposits,
    emptyDelete,
    emptyDeleteStates,
    emptyDeposits,
    emptyLoadingState,
    emptyNewDepositState,
    LoadingState,
    NewDepositState,
} from "../model/Deposits"
import { combineReducers, Reducer } from "redux"
import { DepositOverviewConstants } from "../constants/depositOverviewConstants"

const loadingStateReducer: Reducer<LoadingState> = (state = emptyLoadingState, action) => {
    switch (action.type) {
        case DepositOverviewConstants.FETCH_DEPOSITS_PENDING:
            return { loading: true, loaded: false, loadingError: undefined }
        case DepositOverviewConstants.FETCH_DEPOSITS_REJECTED:
            return { loading: false, loaded: false, loadingError: action.payload }
        case DepositOverviewConstants.FETCH_DEPOSITS_SUCCESS:
            return { loading: false, loaded: true, loadingError: undefined }
        case DepositOverviewConstants.CLEAN_DEPOSITS:
            return emptyLoadingState
        default:
            return state
    }
}

const deletingStateReducer: Reducer<DeletingStates> = (state = emptyDeleteStates, action) => {
    switch (action.type) {
        case DepositOverviewConstants.DELETE_DEPOSIT_PENDING: {
            const { meta: { depositId } } = action

            const deleteState: DeleteState = state[depositId]
            const newDeleteState: DeleteState = deleteState
                ? { ...deleteState, deleting: true }
                : { ...emptyDelete, deleting: true }

            return { ...state, [depositId]: newDeleteState }
        }
        case DepositOverviewConstants.DELETE_DEPOSIT_REJECTED: {
            const { meta: { depositId }, payload: errorMessage } = action

            const deleteState: DeleteState = state[depositId]
            const newDeleteState: DeleteState = deleteState
                ? { ...deleteState, deleting: false, deleteError: errorMessage }
                : { ...emptyDelete, deleteError: errorMessage }

            return { ...state, [depositId]: newDeleteState }
        }
        case DepositOverviewConstants.DELETE_DEPOSIT_FULFILLED: {
            const { meta: { depositId } } = action

            return Object.entries(state)
                .filter(([key]) => key !== depositId)
                .reduce((object, [key, value]) => ({ ...object, [key]: value }), emptyDeleteStates)
        }
        case DepositOverviewConstants.DELETE_DEPOSIT_CONFIRMATION: {
            const { meta: { depositId } } = action

            const deleteState: DeleteState = state[depositId]
            const newDeleteState: DeleteState = deleteState
                ? { ...deleteState, deleting: true }
                : { ...emptyDelete, deleting: true }

            return { ...state, [depositId]: newDeleteState }
        }
        case DepositOverviewConstants.DELETE_DEPOSIT_CANCELLED: {
            const { meta: { depositId } } = action

            return Object.entries(state)
                .filter(([path]) => path !== depositId)
                .reduce((prev, [path, s]) => ({ ...prev, [path]: s }), emptyDeleteStates)
        }
        case DepositOverviewConstants.CLEAN_DEPOSITS:
            return emptyDeleteStates
        default:
            return state
    }
}

const creatingNewStateReducer: Reducer<NewDepositState> = (state = emptyNewDepositState, action) => {
    switch (action.type) {
        case DepositOverviewConstants.CREATE_NEW_DEPOSIT_PENDING:
            return { creating: true, createError: undefined }
        case DepositOverviewConstants.CREATE_NEW_DEPOSIT_SUCCESS:
            return { creating: false, createError: undefined }
        case DepositOverviewConstants.CREATE_NEW_DEPOSIT_REJECTED:
            return { creating: false, createError: action.payload }
        case DepositOverviewConstants.CLEAN_DEPOSITS:
            return emptyNewDepositState
        default:
            return state
    }
}

const depositsReducer: Reducer<Deposits> = (state = emptyDeposits, action) => {
    switch (action.type) {
        case DepositOverviewConstants.DELETE_DEPOSIT_FULFILLED: {
            const { meta: { depositId } } = action

            return Object.entries(state)
                .filter(([key]) => key !== depositId)
                .reduce((object, [key, value]) => ({ ...object, [key]: value }), emptyDeposits)
        }
        case DepositOverviewConstants.FETCH_DEPOSITS_SUCCESS:
            return action.payload
        case DepositOverviewConstants.CLEAN_DEPOSITS:
            return emptyDeposits
        default:
            return state
    }
}

export default combineReducers({
    loading: loadingStateReducer,
    deleting: deletingStateReducer,
    creatingNew: creatingNewStateReducer,
    deposits: depositsReducer,
})
