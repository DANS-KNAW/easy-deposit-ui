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
import { DeleteState, DepositOverviewState, Deposits, empty, emptyDelete } from "../model/Deposits"
import { Reducer } from "redux"
import immutable from "object-path-immutable"
import { DepositOverviewConstants } from "../constants/depositOverviewConstants"

export const depositOverviewReducer: Reducer<DepositOverviewState> = (state = empty, action) => {
    switch (action.type) {
        case DepositOverviewConstants.FETCH_DEPOSITS_PENDING: {
            return { ...state, loading: { ...state.loading, loading: true, loadingError: undefined } }
        }
        case DepositOverviewConstants.FETCH_DEPOSITS_FAILED: {
            return { ...state, loading: { ...state.loading, loading: false, loadingError: action.payload } }
        }
        case DepositOverviewConstants.FETCH_DEPOSITS_SUCCESS: {
            return { ...state, loading: { loading: false, loaded: true }, deposits: action.payload }
        }
        case DepositOverviewConstants.CLEAN_DEPOSITS: {
            return empty
        }
        case DepositOverviewConstants.DELETE_DEPOSIT_PENDING: {
            const { meta: { depositId } } = action

            const deleteState: DeleteState = state.deleting[depositId]
            const newDeleteState: DeleteState = deleteState
                ? { ...deleteState, deleting: true }
                : { ...emptyDelete, deleting: true }
            return { ...state, deleting: { ...state.deleting, [depositId]: newDeleteState } }
        }
        case DepositOverviewConstants.DELETE_DEPOSIT_FAILED: {
            const { meta: { depositId }, payload: errorMessage } = action

            const deleteState: DeleteState = state.deleting[depositId]
            const newDeleteState: DeleteState = deleteState
                ? { ...deleteState, deleting: false, deleteError: errorMessage }
                : { ...emptyDelete, deleteError: errorMessage }

            return { ...state, deleting: { ...state.deleting, [depositId]: newDeleteState } }
        }
        case DepositOverviewConstants.DELETE_DEPOSIT_FULFILLED: {
            const { meta: { depositId } } = action

            // just create a new delete object; discard any error if it was there
            const newDeleteState: DeleteState = { deleting: false, deleted: true }
            const newDeposits: Deposits = immutable.del(state.deposits, depositId)

            return { ...state, deleting: { ...state.deleting, [depositId]: newDeleteState }, deposits: newDeposits }
        }
        case DepositOverviewConstants.CREATE_NEW_DEPOSIT_PENDING: {
            return { ...state, creatingNew: { creating: true } }
        }
        case DepositOverviewConstants.CREATE_NEW_DEPOSIT_SUCCESS: {
            return { ...state, creatingNew: { creating: false } }
        }
        case DepositOverviewConstants.CREATE_NEW_DEPOSIT_FAILED: {
            return { ...state, creatingNew: { creating: false, createError: action.payload } }
        }
        default:
            return state
    }
}
