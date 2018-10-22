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
import { HelpTextState } from "../model/HelpTexts"

export const isHelpTextVisible: (fieldName: string) => (state: AppState) => boolean = fieldName => state => {
    const helpText = state.helpTexts[fieldName]
    return helpText ? helpText.visible : false
}

export const isHelpTextDisplayable: (fieldName: string) => (state: AppState) => boolean = fieldName => state => {
    const helpText = state.helpTexts[fieldName]
    return helpText ? !helpText.fetchError : false
}

export const getHelpTextState: (fieldName: string) => (state: AppState) => HelpTextState = fieldName => state => {
    const helpText: HelpTextState = state.helpTexts[fieldName]

    return helpText || {
            visible: false,
            fetching: false,
            fetched: false,
            text: "",
            fetchError: undefined,
        }
}
