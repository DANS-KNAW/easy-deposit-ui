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

export type Files = { [filepath: string]: FileInfo }

export interface FileInfo {
    filename: string
    dirpath: string
    fullpath: string
    size: number
    sha1sum: string
}

export interface InitialState {
    metadata: DepositFormMetadata
    files: Files
    depositState?: DepositState
}
export const emptyInitialState: InitialState = {
    metadata: {},
    files: {},
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
}

export interface SubmitState {
    submitting: boolean
    submitted: boolean
    submitError?: string
}
export const emptySubmitState: SubmitState = {
    submitting: false,
    submitted: false,
}

export type FetchDepositState = FetchState & { stateNotFound: boolean }
export const emptyFetchDepositState: FetchDepositState = { ...emptyFetchState, stateNotFound: false }

export interface DepositFormState {
    fetchDepositState: FetchDepositState
    fetchMetadata: FetchState
    initialState: InitialState
    fetchDoi: FetchState
    saveDraft: SaveDraftState
    submit: SubmitState
}

export const empty: DepositFormState = {
    fetchDepositState: emptyFetchDepositState,
    fetchMetadata: emptyFetchState,
    initialState: emptyInitialState,
    fetchDoi: emptyFetchState,
    saveDraft: emptySaveDraftState,
    submit: {
        submitting: false,
        submitted: false,
    },
}
