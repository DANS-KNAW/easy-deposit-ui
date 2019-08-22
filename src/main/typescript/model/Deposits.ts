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
export type DepositId = string

export enum DepositStateLabel {
    DRAFT = "DRAFT",
    REJECTED = "REJECTED",
    IN_PROGRESS = "IN_PROGRESS",
    ARCHIVED = "ARCHIVED",
    SUBMITTED = "SUBMITTED",
}

/**
 * Transforms a string to a DepositStateLabel if the string matches one of its values. Otherwise it returns undefined.
 *
 * @param {string} value the value to be matched on
 * @returns {DepositStateLabel} the value represented by the input string
 */
export function toDepositStateLabel(value: string): DepositStateLabel | undefined {
    return Object.values(DepositStateLabel).find(v => v === value)
}

export type Deposits = { [depositId: string]: Deposit }

export const emptyDeposits: Deposits = {}

export interface Deposit {
    title: string
    state: DepositStateLabel
    stateDescription: string
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

export type DeletingStates = { [depositId: string]: DeleteState }

export const emptyDelete: DeleteState = ({
    deleting: false,
    deleted: false,
})

export const emptyDeleteStates: DeletingStates = {}

export interface NewDepositState {
    creating: boolean
    createError?: string
}

export interface DepositOverviewState {
    loading: LoadingState
    deleting: DeletingStates
    creatingNew: NewDepositState
    deposits: Deposits
}

export const empty: DepositOverviewState = {
    loading: {
        loading: false,
        loaded: false,
    },
    deleting: {},
    creatingNew: {
        creating: false,
    },
    deposits: {},
}
