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
export type DatasetId = string

export enum DepositState {
    DRAFT = "DRAFT",
    REJECTED = "REJECTED",
    IN_PROGRESS = "IN_PROGRESS",
    ARCHIVED = "ARCHIVED",
}

export interface Deposit {
    id: DatasetId
    title: string
    state: DepositState
    state_description: string
    date: Date
}

export interface LoadingState {
    loading: boolean
    loaded: boolean
    loadingError?: string
}

export interface DeleteState {
    deleting: boolean
    deleted: boolean
    deleteError?: string
}

export type DeletingStates = {[id: string]: DeleteState}

export const emptyDelete: DeleteState = ({
    deleting: false,
    deleted: false
})

export interface Deposits {
    loading: LoadingState
    deleting: DeletingStates
    deposits: Deposit[]
}

export const empty: Deposits = {
    loading: {
        loading: false,
        loaded: false
    },
    deleting: {},
    deposits: [],
}
