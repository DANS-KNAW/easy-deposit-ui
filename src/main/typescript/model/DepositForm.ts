import { DepositId } from "./Deposits"

export interface SaveDraftState {
    saving: boolean
    saved: boolean
    saveError?: string
}

export interface SubmitState {
    submitting: boolean
    submitted: boolean
    submitError?: string
}

export interface DepositFormState {
    depositId?: DepositId // TODO this is not really undefined...
    saveDraft: SaveDraftState
    submit: SubmitState
}

export const empty: DepositFormState = {
    saveDraft: {
        saving: false,
        saved: false,
    },
    submit: {
        submitting: false,
        submitted: false,
    },
}
