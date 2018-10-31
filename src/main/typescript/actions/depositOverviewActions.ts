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
import * as H from "history"
import { FetchAction, PromiseAction, ThunkAction } from "../lib/redux"
import { DepositOverviewConstants } from "../constants/depositOverviewConstants"
import axios from "axios"
import { DepositId, Deposits } from "../model/Deposits"
import { Action } from "redux"
import { depositsConverter, newDepositConverter } from "../lib/deposits/deposits"
import { deleteDepositUrl, listDepositUrl, newDepositUrl } from "../selectors/serverRoutes"

export const fetchDeposits: () => ThunkAction<FetchAction<Deposits>> = () => (dispatch, getState) => dispatch({
    type: DepositOverviewConstants.FETCH_DEPOSITS,
    async payload() {
        const response = await axios.get(listDepositUrl(getState()))
        return response.data
    },
    meta: {
        transform: depositsConverter,
    },
})

export const cleanDeposits: () => Action = () => ({
    type: DepositOverviewConstants.CLEAN_DEPOSITS,
})

export const deleteDeposit: (depositId: DepositId) => ThunkAction<PromiseAction<void>> = depositId => (dispatch, getState) => dispatch({
    type: DepositOverviewConstants.DELETE_DEPOSIT,
    async payload() {
        await axios.delete(deleteDepositUrl(depositId)(getState()))
    },
    meta: { depositId: depositId },
})

export const createNewDeposit: (history: H.History) => ThunkAction<FetchAction<DepositId>> = history => (dispatch, getState) => dispatch({
    type: DepositOverviewConstants.CREATE_NEW_DEPOSIT,
    async payload() {
        const response = await axios.post(newDepositUrl(getState()))
        return response.data
    },
    meta: {
        transform: newDepositConverter,
        history: history,
    },
})
