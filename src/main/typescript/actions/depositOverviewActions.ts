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
import { ReduxAction } from "../lib/redux"
import { DepositOverviewConstants } from "../constants/depositOverviewConstants"
import axios from "axios"
import { deleteDepositURL, listDepositsURL, newDepositURL } from "../constants/apiConstants"
import { DepositId, Deposits } from "../model/Deposits"
import { Action } from "redux"

export const fetchDeposits: () => ReduxAction<Promise<any>> = () => ({
    type: DepositOverviewConstants.FETCH_DEPOSITS,
    async payload() {
        // TODO temporary do a fake timeout to simulate server I/O
        await new Promise(resolve => setTimeout(resolve, 1000))
        const response = await axios.get(listDepositsURL)
        return response.data
    },
})

export const fetchDepositsSucceeded: (deposits: Deposits) => ReduxAction<Deposits> = deposits => ({
    type: DepositOverviewConstants.FETCH_DEPOSITS_SUCCESS,
    payload: deposits,
})

export const fetchDepositsFailed: (errorMessage: string) => ReduxAction<string> = errorMessage => ({
    type: DepositOverviewConstants.FETCH_DEPOSITS_FAILED,
    payload: errorMessage,
})

export const cleanDeposits: () => Action = () => ({
    type: DepositOverviewConstants.CLEAN_DEPOSITS,
})

export const deleteDeposit: (depositId: DepositId) => ReduxAction<Promise<void>> = depositId => ({
    type: DepositOverviewConstants.DELETE_DEPOSIT,
    async payload() {
        // TODO temporary do a fake timeout to simulate server I/O
        await new Promise(resolve => setTimeout(resolve, 1000))
        await axios.delete(deleteDepositURL(depositId))
    },
    meta: { depositId: depositId },
})

export const deleteDepositFailed: (depositId: DepositId) => (errorMessage: string) => ReduxAction<string> = depositId => errorMessage => ({
    type: DepositOverviewConstants.DELETE_DEPOSIT_FAILED,
    payload: errorMessage,
    meta: { depositId: depositId },
})

export const createNewDeposit: (pushHistory: (id: string) => void) => ReduxAction<Promise<any>> = pushHistory => ({
    type: DepositOverviewConstants.CREATE_NEW_DEPOSIT,
    async payload() {
        // TODO temporary do a fake timeout to simulate server I/O
        await new Promise(resolve => setTimeout(resolve, 1000))
        const response = await axios.post(newDepositURL)
        return response.data
    },
    meta: { pushHistory: pushHistory },
})

export const createNewDepositFailed: (errorMessage: string) => ReduxAction<string> = errorMessage => ({
    type: DepositOverviewConstants.CREATE_NEW_DEPOSIT_FAILED,
    payload: errorMessage,
})
