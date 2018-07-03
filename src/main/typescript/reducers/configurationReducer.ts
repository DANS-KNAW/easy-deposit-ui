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
import {Reducer} from "redux";
import {empty} from "../model/Configuration";
import {ConfigurationState} from "../model/Configuration";
import {ConfigurationConstants} from "../constants/configurationConstants";

export const configurationReducer: Reducer<ConfigurationState> = (state = empty, action) => {
    switch (action.type) {
        case ConfigurationConstants.FETCH_CONFIG_PENDING: {
            return { ...state, fetchingConfig: true }
        }
        case ConfigurationConstants.FETCH_CONFIG_FULFILLED: {
            return { ...state, fetchingConfig: false, fetchedConfig: true, config: action.payload }
        }
        case ConfigurationConstants.FETCH_CONFIG_FAILED: {
            return { ...state, fetchingConfig: false, fetchedConfig: false, fetchConfigError: action.payload }
        }
        default:
            return state
    }
}