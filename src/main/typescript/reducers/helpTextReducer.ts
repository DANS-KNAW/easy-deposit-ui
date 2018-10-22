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
import { Reducer } from "redux"
import { HelpTexts } from "../model/HelpTexts"
import { HelpTextConstants } from "../constants/helpTextConstants"
import immutable from "object-path-immutable"

export const helpTextReducer: Reducer<HelpTexts> = (state = {}, action) => {
    switch (action.type) {
        case HelpTextConstants.REGISTER_HELP_TEXT: {
            const fieldName = action.payload
            return {
                ...state,
                [fieldName]: {
                    ...state[fieldName],
                    visible: false,
                    fetching: false,
                    fetched: false,
                    helpText: "",
                },
            }
        }
        case HelpTextConstants.UNREGISTER_HELP_TEXT: {
            return immutable.del(state, action.payload)
        }
        case HelpTextConstants.TOGGLE_HELP_TEXT: {
            const fieldName = action.payload
            return {
                ...state,
                [fieldName]: {
                    ...state[fieldName],
                    visible: !state[fieldName].visible,
                },
            }
        }
        case HelpTextConstants.FETCH_HELP_TEXT_PENDING: {
            const { fieldName } = action.meta
            return {
                ...state,
                [fieldName]: {
                    ...state[fieldName],
                    fetching: true,
                    fetchError: undefined,
                },
            }
        }
        case HelpTextConstants.FETCH_HELP_TEXT_REJECTED: {
            const { fieldName } = action.meta
            return {
                ...state,
                [fieldName]: {
                    ...state[fieldName],
                    fetching: false,
                    fetched: false,
                    fetchError: "help text not available",
                },
            }
        }
        case HelpTextConstants.FETCH_HELP_TEXT_FULFILLED: {
            const { fieldName } = action.meta
            return {
                ...state,
                [fieldName]: {
                    ...state[fieldName],
                    fetching: false,
                    fetched: true,
                    text: action.payload,
                },
            }
        }
        default:
            return state
    }
}
