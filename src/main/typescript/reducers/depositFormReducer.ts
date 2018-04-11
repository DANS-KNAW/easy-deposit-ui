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
import { DepositFormState, empty } from "../model/DepositForm"
import { Reducer } from "redux"
import { DepositFormConstants } from "../constants/depositFormConstants"

export const depositFormReducer: Reducer<DepositFormState> = (state = empty, action) => {
    switch (action.type) {
        case DepositFormConstants.REGISTER_FORM: {
            return { ...state, depositId: action.payload }
        }
        case DepositFormConstants.UNREGISTER_FORM: {
            return empty
        }
        // TODO fetch data
        case DepositFormConstants.FETCH_METADATA_PENDING: {
            return { ...state, fetchMetadata: { ...state.fetchMetadata, fetching: true, fetchError: undefined } }
        }
        case DepositFormConstants.FETCH_METADATA_FAILED: {
            return {
                ...state,
                fetchMetadata: { ...state.fetchMetadata, fetching: false, fetched: false, fetchError: action.payload },
            }
        }
        case DepositFormConstants.FETCH_METADATA_SUCCEEDED: {
            return {
                ...state,
                initialState: { ...state.initialState, metadata: action.payload },
                fetchMetadata: { ...state.fetchMetadata, fetching: false, fetched: true },
            }
        }
        case DepositFormConstants.SAVE_DRAFT_PENDING: {
            return { ...state, saveDraft: { ...state.saveDraft, saving: true, saveError: undefined } }
        }
        case DepositFormConstants.SAVE_DRAFT_FULFILLED: {
            return { ...state, saveDraft: { ...state.saveDraft, saving: false, saved: true } }
        }
        case DepositFormConstants.SAVE_DRAFT_FAILED: {
            return {
                ...state,
                saveDraft: { ...state.saveDraft, saving: false, saved: false, saveError: action.payload },
            }
        }
        case DepositFormConstants.SUBMIT_DEPOSIT_PENDING: {
            return { ...state, submit: { ...state.submit, submitting: true, submitError: undefined } }
        }
        case DepositFormConstants.SUBMIT_DEPOSIT_FULFILLED: {
            return { ...state, submit: { ...state.submit, submitting: false, submitted: true } }
        }
        case DepositFormConstants.SUBMIT_DEPOSIT_FAILED: {
            return {
                ...state,
                submit: { ...state.submit, submitting: false, submitted: true, submitError: action.payload },
            }
        }
        default:
            return state
    }
}
