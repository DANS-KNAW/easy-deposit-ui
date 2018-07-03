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
import axios from "axios";
import {ReduxAction} from "../lib/redux";
import {ConfigurationConstants} from "../constants/configurationConstants";
import {Configuration} from "../model/Configuration";

export const fetchConfiguration: () => ReduxAction<Promise<Configuration>> = () => ({
    type: ConfigurationConstants.FETCH_CONFIG,
    async payload() {
        const response = await axios.get(require(`../../resources/application.json`))
        return response.data
    },
})

export const fetchConfigurationFailed: (errorMessage: string) => ReduxAction<string> = errorMessage => ({
    type: ConfigurationConstants.FETCH_CONFIG_FAILED,
    payload: errorMessage,
})
