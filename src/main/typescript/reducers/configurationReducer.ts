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
import { combineReducers, Reducer } from "redux"
import { Configuration, emptyConfiguration } from "../model/Configuration"
import { ConfigurationConstants } from "../constants/configurationConstants"
import FetchState, { empty as emptyFetchState } from "../model/FetchState"

const fetchStateReducer: Reducer<FetchState> = (state = emptyFetchState, action) => {
    switch (action.type) {
        case ConfigurationConstants.CONFIGURATION_LOADING_PENDING:
            return { fetching: true, fetched: false, fetchError: undefined }
        case ConfigurationConstants.CONFIGURATION_LOADING_SUCCESS:
            return { fetching: false, fetched: true, fetchError: undefined }
        case ConfigurationConstants.CONFIGURATION_LOADING_REJECTED:
            return { fetching: false, fetched: false, fetchError: action.payload }
        default:
            return state
    }
}

const configurationReducer: Reducer<Configuration> = (state = emptyConfiguration, action) => {
    switch (action.type) {
        case ConfigurationConstants.CONFIGURATION_LOADING_SUCCESS:
            return action.payload
        default:
            return state
    }
}

export default combineReducers({
    fetchState: fetchStateReducer,
    configuration: configurationReducer,
})
