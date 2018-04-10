import { DepositId } from "./Deposits"
import { DepositFormMetadata } from "../components/form/parts"
import { AccessRightValue, PrivacySensitiveDataValue } from "./FormData"
import { DataFormData } from "../components/form/parts/DataForm"

export interface FetchMetadataState {
    fetching: boolean
    fetched: boolean
    fetchError?: string
}

export interface InitialState {
    data: DataFormData
    metadata: DepositFormMetadata
}

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
    fetchMetadata: FetchMetadataState
    initialState: InitialState
    saveDraft: SaveDraftState
    submit: SubmitState
}

export const empty: DepositFormState = {
    depositId: "invalid", // TODO this value is not correct!!!
    fetchMetadata: {
        fetching: false,
        fetched: false,
    },
    initialState: {
        data: {},
        metadata: {
            doi: "invalid", // TODO this value is not correct!!!
            languageOfDescription: "invalid", // TODO this value is not correct!!!
            titles: [],
            descriptions: [],
            creators: [],
            dateCreated: new Date(),
            audiences: [],
            accessRights: { category: AccessRightValue.OPEN },
            license: "invalid", // TODO this value is not correct!!!
            extraClarinMetadataPresent: false,
            privacySensitiveDataPresent: PrivacySensitiveDataValue.UNSPECIFIED,
        }
    },
    saveDraft: {
        saving: false,
        saved: false,
    },
    submit: {
        submitting: false,
        submitted: false,
    },
}
