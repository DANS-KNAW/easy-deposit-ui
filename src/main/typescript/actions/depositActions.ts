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
import { DepositConstants } from "../constants/depositConstants"
import axios from "axios"
import { deleteDepositURL, listDepositsURL } from "../constants/apiConstants"
import { DatasetId, Deposit } from "../model/Deposits"
import { Action } from "redux"

export const fetchDeposits: () => ReduxAction<Promise<Deposit[]>> = () => ({
    type: DepositConstants.FETCH_DEPOSITS,
    async payload() {
        // TODO temporary do a fake timeout to simulate server I/O
        await new Promise(resolve => setTimeout(resolve, 1000))
        const response = await axios.get(listDepositsURL)
        return response.data
    },
})

export const fetchDepositsSucceeded: (deposits: Deposit[]) => ReduxAction<Deposit[]> = deposits => ({
    type: DepositConstants.FETCH_DEPOSITS_SUCCESS,
    payload: deposits,
})

export const fetchDepositsFailed: (errorMessage: string) => ReduxAction<string> = errorMessage => ({
    type: DepositConstants.FETCH_DEPOSITS_FAILED,
    payload: errorMessage,
})

export const cleanDeposits: () => Action = () => ({
    type: DepositConstants.CLEAN_DEPOSITS,
})

export const deleteDeposit: (id: DatasetId) => ReduxAction<Promise<void>> = id => ({
    type: DepositConstants.DELETE_DEPOSIT,
    async payload() {
        // TODO temporary do a fake timeout to simulate server I/O
        await new Promise(resolve => setTimeout(resolve, 1000))
        await axios.delete(deleteDepositURL(id))
    },
    meta: { id: id },
})

export const deleteDepositFailed: (id: DatasetId) => (errorMessage: string) => ReduxAction<string> = id => errorMessage => ({
    type: DepositConstants.DELETE_DEPOSIT_FAILED,
    payload: errorMessage,
    meta: { id: id },
})
