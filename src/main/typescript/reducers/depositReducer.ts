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
import { Deposits, empty, emptyDelete } from "../model/Deposits"
import { Reducer } from "redux"
import { DepositConstants } from "../constants/depositConstants"

export const depositReducer: Reducer<Deposits> = (state = empty, action) => {
    switch (action.type) {
        case DepositConstants.FETCH_DEPOSITS_PENDING: {
            return { ...state, loading: { ...state.loading, loading: true } }
        }
        case DepositConstants.FETCH_DEPOSITS_REJECTED: {
            const response = action.payload.response
            const errorMessage = response
                ? `${response.status} - ${response.statusText}`
                : action.payload.message

            return { ...state, loading: { ...state.loading, loading: false, loadingError: errorMessage } }
        }
        case DepositConstants.FETCH_DEPOSITS_FULFILLED: {
            return { ...state, loading: { ...state.loading, loading: false, loaded: true }, deposits: action.payload }
        }
        case DepositConstants.CLEAN_DEPOSITS: {
            return empty
        }
        case DepositConstants.DELETE_DEPOSIT_PENDING: {
            const { meta: { id } } = action
            const deletingProp = state.deleting[id]
            const newDeletingProp = deletingProp
                ? { ...deletingProp, deleting: true }
                : { ...emptyDelete, deleting: true }
            return { ...state, deleting: { ...state.deleting, [id]: newDeletingProp } }
        }
        case DepositConstants.DELETE_DEPOSIT_REJECTED: {
            const { meta: { id }, payload: { response: { status, statusText } } } = action
            const error = `${status} - ${statusText}`

            const deletingProp = state.deleting[id]
            const newDeletingProp = deletingProp
                ? { ...deletingProp, deleting: false, error: error }
                : { ...emptyDelete, error: error }

            return { ...state, deleting: { ...state.deleting, [id]: newDeletingProp } }
        }
        case DepositConstants.DELETE_DEPOSIT_FULFILLED: {
            const { meta: { id } } = action

            const deletingProp = state.deleting[id]
            const newDeletingProp = deletingProp
                ? { ...deletingProp, deleting: false, deleted: true }
                : { ...emptyDelete, deleting: false, deleted: true }

            const newDeposits = state.deposits.filter(deposit => deposit.id !== id)

            return { ...state, deleting: { ...state.deleting, [id]: newDeletingProp }, deposits: newDeposits }
        }
        default:
            return state
    }
}
