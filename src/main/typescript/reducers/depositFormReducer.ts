import { DepositFormState, empty } from "../model/DepositForm"
import { Reducer } from "redux"
import { DepositFormConstants } from "../constants/depositFormConstants"

export const depositFormReducer: Reducer<DepositFormState> = (state = empty, action) => {
    switch (action.type) {
        case DepositFormConstants.SET_DEPOSIT_ID: {
            return {...state, depositId: action.payload}
        }
        // TODO fetch data
        case DepositFormConstants.FETCH_METADATA_PENDING: {
            return {...state, fetchMetadata: {...state.fetchMetadata, fetching: true, fetchError: undefined}}
        }
        case DepositFormConstants.FETCH_METADATA_FAILED: {
            return {...state, fetchMetadata: {...state.fetchMetadata, fetching: false, fetched: false, fetchError: action.payload}}
        }
        case DepositFormConstants.FETCH_METADATA_SUCCEEDED: {
            return {...state, initialState: {...state.initialState, metadata: action.payload}, fetchMetadata: {...state.fetchMetadata, fetching: false, fetched: true}}
        }
        case DepositFormConstants.SAVE_DRAFT_PENDING: {
            return {...state, saveDraft: {...state.saveDraft, saving: true, saveError: undefined}}
        }
        case DepositFormConstants.SAVE_DRAFT_FULFILLED: {
            return {...state, saveDraft: {...state.saveDraft, saving: false, saved: true}}
        }
        case DepositFormConstants.SAVE_DRAFT_FAILED: {
            return {...state, saveDraft: {...state.saveDraft, saving: false, saved: false, saveError: action.payload}}
        }
        case DepositFormConstants.SUBMIT_DEPOSIT_PENDING: {
            return {...state, submit: {...state.submit, submitting: true, submitError: undefined}}
        }
        case DepositFormConstants.SUBMIT_DEPOSIT_FULFILLED: {
            return {...state, submit: {...state.submit, submitting: false, submitted: true}}
        }
        case DepositFormConstants.SUBMIT_DEPOSIT_FAILED: {
            return {...state, submit: {...state.submit, submitting: false, submitted: true, submitError: action.payload}}
        }
        default:
            return state
    }
}
