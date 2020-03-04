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
import FetchState, { empty as emptyFetchState } from "./FetchState"
import { DepositState } from "./DepositState"

export interface InitialState {
    metadata: DepositFormMetadata
    depositState?: DepositState
}

export const emptyInitialState: InitialState = {
    metadata: {},
    depositState: undefined,
}

export interface SaveDraftState {
    saving: boolean
    saved: boolean
    saveError?: string
}

export const emptySaveDraftState: SaveDraftState = {
    saving: false,
    saved: false,
    saveError: undefined,
}

export interface SubmitState {
    submitting: boolean
    submitted: boolean
    submitError?: string
}

export const emptySubmitState: SubmitState = {
    submitting: false,
    submitted: false,
    submitError: undefined,
}

export type FetchDepositState = FetchState & { stateNotFound: boolean }

export const emptyFetchDepositState: FetchDepositState = { ...emptyFetchState, stateNotFound: false }

export type FilesDeletingState = { [filePath: string]: FileDeletingState }

export interface FileDeletingState {
    deleting: boolean
    deleteError?: string
}

export const emptyFilesDeletingState: FilesDeletingState = {}

export const emptyFileDeletingState: FileDeletingState = ({
    deleting: false,
})

export interface DepositFormState {
    fetchDepositState: FetchDepositState
    fetchMetadata: FetchState
    fetchFiles: FetchState
    initialState: InitialState
    fetchDoi: FetchState
    saveDraft: SaveDraftState
    submit: SubmitState
    deletingFiles: FilesDeletingState
}

export const empty: DepositFormState = {
    fetchDepositState: emptyFetchDepositState,
    fetchMetadata: emptyFetchState,
    fetchFiles: emptyFetchState,
    initialState: emptyInitialState,
    fetchDoi: emptyFetchState,
    saveDraft: emptySaveDraftState,
    submit: emptySubmitState,
    deletingFiles: emptyFilesDeletingState,
}
