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

const createURL: (path: string) => Promise<string> = async path => {
    const url = await apiUrl()
    return url.endsWith("/") ? `${url}${path}` : `${url}/${path}`
}

export const loginURL: Promise<string> = createURL("auth/login")
export const logoutURL: Promise<string> = createURL("auth/logout")

export const userURL: Promise<string> = createURL("user")

export const fetchMetadataURL: (id: DepositId) => Promise<string> = id => createURL(`deposit/${id}/metadata`)
export const fetchDoiURL: (id: DepositId) => Promise<string> = id => createURL(`deposit/${id}/doi`)
export const saveDraftURL: (id: DepositId) => Promise<string> = id => createURL(`deposit/${id}/metadata`)
export const submitDepositURL: (id: DepositId) => Promise<string> = id => createURL(`deposit/${id}/state`)

export const listFiles: (id: DepositId) => Promise<string> = id => createURL(`deposit/${id}/file`)

export const submitState = ({
    state: "SUBMITTED",
    stateDescription: "Deposit is ready for post-submission processing"
})
