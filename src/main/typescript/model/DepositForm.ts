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
