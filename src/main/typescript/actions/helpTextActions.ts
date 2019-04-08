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
import { PromiseAction, ReduxAction } from "../lib/redux"
import fetch from "../lib/fetch"
import { HelpTextConstants } from "../constants/helpTextConstants"
import { AxiosRequestConfig } from "axios"

export const registerHelpText: (fieldName: string) => ReduxAction<string> = fieldName => ({
    type: HelpTextConstants.REGISTER_HELP_TEXT,
    payload: fieldName,
})

export const unregisterHelpText: (fieldName: string) => ReduxAction<string> = fieldName => ({
    type: HelpTextConstants.UNREGISTER_HELP_TEXT,
    payload: fieldName,
})

export const fetchHelpText: (fieldName: string) => PromiseAction<void> = fieldName => ({
    type: HelpTextConstants.FETCH_HELP_TEXT,
    async payload() {
        const requestConfig: AxiosRequestConfig = { headers: { "Cache-Control": "no-cache" } }
        const response = await fetch.get(require(`../../resources/helptexts/${fieldName}.html`), requestConfig)
        return response.data
    },
    meta: {
        fieldName: fieldName,
    },
})

export const toggleHelpText: (fieldName: string) => ReduxAction<string> = fieldName => ({
    type: HelpTextConstants.TOGGLE_HELP_TEXT,
    payload: fieldName,
})
