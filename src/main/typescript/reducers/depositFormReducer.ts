import { DepositFormState, empty } from "../model/DepositForm"
import { Reducer } from "redux"
import { DepositFormConstants } from "../constants/depositFormConstants"

export const depositFormReducer: Reducer<DepositFormState> = (state = empty, action) => {
    switch (action.type) {
        case DepositFormConstants.SET_DEPOSIT_ID: {
            return {...state, depositId: action.payload}
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
