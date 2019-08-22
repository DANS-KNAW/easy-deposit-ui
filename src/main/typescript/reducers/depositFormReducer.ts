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
        case DepositFormConstants.UNREGISTER_FORM: {
            return empty
        }
        case DepositFormConstants.FETCH_STATE_PENDING: {
            return {
                ...state,
                fetchDepositState: {
                    ...state.fetchDepositState,
                    fetching: true,
                    fetchError: undefined,
                    stateNotFound: false,
                },
            }
        }
        case DepositFormConstants.FETCH_STATE_REJECTED: {
            return {
                ...state,
                fetchDepositState: {
                    ...state.fetchDepositState,
                    fetching: false,
                    fetched: false,
                    fetchError: action.payload,
                    stateNotFound: false,
                },
            }
        }
        case DepositFormConstants.FETCH_STATE_SUCCESS: {
            return {
                ...state,
                initialState: {
                    ...state.initialState,
                    depositState: action.payload,
                },
                fetchDepositState: {
                    ...state.fetchDepositState,
                    fetching: false,
                    fetched: true,
                },
            }
        }
        case DepositFormConstants.FETCH_STATE_NOT_FOUND: {
            return {
                ...state,
                fetchDepositState: {
                    ...state.fetchDepositState,
                    fetching: false,
                    fetched: false,
                    stateNotFound: true,
                }
            }
        }
        case DepositFormConstants.FETCH_METADATA_PENDING: {
            return { ...state, fetchMetadata: { ...state.fetchMetadata, fetching: true, fetchError: undefined } }
        }
        case DepositFormConstants.FETCH_METADATA_REJECTED: {
            return {
                ...state,
                fetchMetadata: { ...state.fetchMetadata, fetching: false, fetched: false, fetchError: action.payload },
            }
        }
        case DepositFormConstants.FETCH_METADATA_SUCCESS: {
            return {
                ...state,
                initialState: { ...state.initialState, metadata: action.payload },
                fetchMetadata: { ...state.fetchMetadata, fetching: false, fetched: true },
            }
        }
        case DepositFormConstants.FETCH_DOI_PENDING: {
            return { ...state, fetchDoi: { ...state.fetchDoi, fetchingDoi: true, fetchDoiError: undefined } }
        }
        case DepositFormConstants.FETCH_DOI_SUCCESS: {
            return { ...state, fetchDoi: { ...state.fetchDoi, fetchingDoi: false, fetchedDoi: true } }
        }
        case DepositFormConstants.FETCH_DOI_REJECTED: {
            return {
                ...state,
                fetchDoi: { ...state.fetchDoi, fetchingDoi: false, fetchedDoi: false, fetchDoiError: action.payload },
            }
        }
        case DepositFormConstants.SAVE_DRAFT_PENDING: {
            return {
                ...state,
                saveDraft: { ...state.saveDraft, saving: true, saveError: undefined },
                submit: { ...state.submit, submitError: undefined },
            }
        }
        case DepositFormConstants.SAVE_DRAFT_FULFILLED: {
            return { ...state, saveDraft: { ...state.saveDraft, saving: false, saved: true } }
        }
        case DepositFormConstants.SAVE_DRAFT_REJECTED: {
            return {
                ...state,
                saveDraft: { ...state.saveDraft, saving: false, saved: false, saveError: action.payload },
            }
        }
        case DepositFormConstants.SAVE_DRAFT_RESET: {
            return { ...state, saveDraft: { ...state.saveDraft, saved: false } }
        }
        case DepositFormConstants.SUBMIT_DEPOSIT_PENDING: {
            return {
                ...state,
                submit: { ...state.submit, submitting: true, submitError: undefined },
                saveDraft: { ...state.saveDraft, saveError: undefined },
            }
        }
        case DepositFormConstants.SUBMIT_DEPOSIT_FULFILLED: {
            return { ...state, submit: { ...state.submit, submitting: false, submitted: true } }
        }
        case DepositFormConstants.SUBMIT_DEPOSIT_REJECTED: {
            return {
                ...state,
                submit: { ...state.submit, submitting: false, submitted: true, submitError: action.payload },
            }
        }
        default:
            return state
    }
}
