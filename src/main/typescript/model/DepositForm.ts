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
import { DepositFormMetadata } from "../components/form/parts"

export interface FetchState {
    fetching: boolean
    fetched: boolean
    fetchError?: string
}

const emptyFetchState: FetchState = {
    fetching: false,
    fetched: false,
}

export interface InitialState {
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
    fetchMetadata: FetchState
    initialState: InitialState
    fetchDoi: FetchState
    saveDraft: SaveDraftState
    submit: SubmitState
}

export const empty: DepositFormState = {
    fetchMetadata: emptyFetchState,
    initialState: {
        metadata: {},
    },
    fetchDoi: emptyFetchState,
    saveDraft: {
        saving: false,
        saved: false,
    },
    submit: {
        submitting: false,
        submitted: false,
    },
}
