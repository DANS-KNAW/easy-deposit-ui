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
import { apiUrl } from "../lib/config"
import { DepositId } from "../model/Deposits"

// TODO rename to serverRoutes.ts

const createURL = (path: string) => apiUrl.endsWith('/') ? `${apiUrl}${path}` : `${apiUrl}/${path}`

export const listDepositsURL = createURL("deposit")
export const deleteDepositURL = (id: DepositId) => createURL(`deposit/${id}`)

export const loginURL  = createURL("auth/login")
export const logoutURL  = createURL("auth/logout")

export const userURL = createURL("user")

export const newDepositURL = createURL("deposit")

export const fetchMetadataURL = (id: DepositId) => createURL(`deposit/${id}/metadata`)
export const saveDraftURL = (id: DepositId) => createURL(`deposit/${id}/metadata`)
export const submitDepositURL = (id: DepositId) => createURL(`deposit/${id}/state`)

export const submitState = ({
    state: "SUBMITTED",
    state_description: "Deposit is ready for post-submission processing"
})
