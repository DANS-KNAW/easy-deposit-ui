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
    depositId: DepositId
    saveDraft: SaveDraftState
    submit: SubmitState
}

export const empty: DepositFormState = {
    depositId: "invalid", // TODO this value is not correct!!!
    saveDraft: {
        saving: false,
        saved: false,
    },
    submit: {
        submitting: false,
        submitted: false,
    },
}
