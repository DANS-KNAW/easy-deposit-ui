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
import { AppState } from "../model/AppState"
import { getApiUrl } from "./configuration"
import { DepositId } from "../model/Deposits"

const createUrl: (path: string) => (state: AppState) => string = path => state => {
    const apiUrl = getApiUrl(state)! // FIXME no '!' here

    return apiUrl.endsWith("/") ? `${apiUrl}${path}` : `${apiUrl}/${path}`
}

export const userUrl = createUrl("user")

export const listDepositUrl = createUrl("deposit")
export const deleteDepositUrl = (id: DepositId) => createUrl(`deposit/${id}`)

export const newDepositUrl = createUrl("deposit")

export const fetchDepositStateUrl = (id: DepositId) => createUrl(`deposit/${id}/state`)
export const fetchMetadataUrl = (id: DepositId) => createUrl(`deposit/${id}/metadata`)
export const fetchDoiUrl = (id: DepositId) => createUrl(`deposit/${id}/doi`)
export const saveDraftUrl = (id: DepositId) => createUrl(`deposit/${id}/metadata`)
export const submitDepositUrl = (id: DepositId) => createUrl(`deposit/${id}/state`)

export const listFilesUrl = (id: DepositId) => createUrl(`deposit/${id}/file/`)
export const deleteFileUrl = (id: DepositId, filePath: string) => createUrl(`deposit/${id}/file/${filePath}`)
export const uploadFileUrl = (id: DepositId, filePath: string) => createUrl(`deposit/${id}/file/${filePath}`)
