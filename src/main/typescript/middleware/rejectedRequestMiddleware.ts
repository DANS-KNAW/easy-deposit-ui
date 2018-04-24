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
import { DepositOverviewConstants } from "../constants/depositOverviewConstants"
import { Action, AnyAction, Middleware } from "redux"
import { createMiddleware } from "../lib/redux"
import { createNewDepositFailed, deleteDepositFailed, fetchDepositsFailed } from "../actions/depositOverviewActions"
import { DepositFormConstants } from "../constants/depositFormConstants"
import {
    fetchDoiFailed,
    fetchMetadataFailed,
    sendSaveDraftFailed,
    sendSubmitDepositFailed,
} from "../actions/depositFormActions"

type NewActionGenerator = (action: AnyAction) => (errorMessage: string) => Action

function rejectedMiddleware(type: string) {
    return function (newActionGenerator: NewActionGenerator): Middleware {
        return createMiddleware(({ dispatch }, next, action) => {
            next(action)

            if (action.type === type) {
                const response = action.payload.response
                const errorMessage = response
                    ? `${response.status} - ${response.statusText}`
                    : action.payload.message

                dispatch(newActionGenerator(action)(errorMessage))
            }
        })
    }
}

const depositFetchRejected = rejectedMiddleware(DepositOverviewConstants.FETCH_DEPOSITS_REJECTED)(() => fetchDepositsFailed)

const depositDeleteRejected = rejectedMiddleware(DepositOverviewConstants.DELETE_DEPOSIT_REJECTED)(({ meta: { depositId } }) => deleteDepositFailed(depositId))

const newDepositRejected = rejectedMiddleware(DepositOverviewConstants.CREATE_NEW_DEPOSIT_REJECTED)(() => createNewDepositFailed)

const fetchMetadataRejected = rejectedMiddleware(DepositFormConstants.FETCH_METADATA_REJECTED)(() => fetchMetadataFailed)

const fetchDoiRejected = rejectedMiddleware(DepositFormConstants.FETCH_DOI_REJECTED)(() => fetchDoiFailed)

const sendSaveDraftRejected = rejectedMiddleware(DepositFormConstants.SEND_SAVE_DRAFT_REJECTED)(() => sendSaveDraftFailed)

const sendSubmitDepositRejected = rejectedMiddleware(DepositFormConstants.SEND_SUBMIT_DEPOSIT_REJECTED)(() => sendSubmitDepositFailed)

export const rejectedRequestMiddleware = [
    depositFetchRejected,
    depositDeleteRejected,
    newDepositRejected,
    fetchMetadataRejected,
    fetchDoiRejected,
    sendSaveDraftRejected,
    sendSubmitDepositRejected,
]
