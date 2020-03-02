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
import { expect } from "chai"
import { describe, it } from "mocha"
import { AnyAction } from "redux"
import { ConfigurationState, empty } from "../../../main/typescript/model/Configuration"
import { ConfigurationConstants } from "../../../main/typescript/constants/configurationConstants"
import configurationReducer from "../../../main/typescript/reducers/configurationReducer"

describe("configurationReducer", () => {

    describe("CONFIGURATION_LOADING_PENDING", () => {
        it("should handle a CONFIGURATION_LOADING_PENDING action", () => {
            const inputState: ConfigurationState = empty
            const expectedOutputState: ConfigurationState = {
                fetchState: {
                    fetching: true,
                    fetched: false,
                    fetchError: undefined,
                },
                configuration: {
                    apiUrl: "",
                },
            }
            const action: AnyAction = {
                type: ConfigurationConstants.CONFIGURATION_LOADING_PENDING,
            }
            expect(configurationReducer(inputState, action)).to.eql(expectedOutputState)
        })

        it("should remove an error", () => {
            const inputState: ConfigurationState = {
                ...empty,
                fetchState: { ...empty.fetchState, fetchError: "ERR!!!" },
            }
            const expectedOutputState: ConfigurationState = {
                fetchState: {
                    fetching: true,
                    fetched: false,
                    fetchError: undefined,
                },
                configuration: {
                    apiUrl: "",
                },
            }
            const action: AnyAction = {
                type: ConfigurationConstants.CONFIGURATION_LOADING_PENDING,
            }
            expect(configurationReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("CONFIGURATION_LOADING_SUCCESS", () => {
        it("should handle a CONFIGURATION_LOADING_SUCCESS action", () => {
            const inputState: ConfigurationState = empty
            const expectedOutputState: ConfigurationState = {
                fetchState: {
                    fetching: false,
                    fetched: true,
                    fetchError: undefined,
                },
                configuration: {
                    apiUrl: "my-url",
                },
            }
            const action: AnyAction = {
                type: ConfigurationConstants.CONFIGURATION_LOADING_SUCCESS,
                payload: {
                    apiUrl: "my-url",
                },
            }
            expect(configurationReducer(inputState, action)).to.eql(expectedOutputState)
        })

        it("should remove an error", () => {
            const inputState: ConfigurationState = {
                ...empty,
                fetchState: { ...empty.fetchState, fetchError: "ERR!!!" },
            }
            const expectedOutputState: ConfigurationState = {
                fetchState: {
                    fetching: false,
                    fetched: true,
                    fetchError: undefined,
                },
                configuration: {
                    apiUrl: "my-url",
                },
            }
            const action: AnyAction = {
                type: ConfigurationConstants.CONFIGURATION_LOADING_SUCCESS,
                payload: {
                    apiUrl: "my-url",
                },
            }
            expect(configurationReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("CONFIGURATION_LOADING_REJECTED", () => {
        it("should handle a CONFIGURATION_LOADING_REJECTED action", () => {
            const inputState: ConfigurationState = empty
            const expectedOutputState: ConfigurationState = {
                fetchState: {
                    fetching: false,
                    fetched: false,
                    fetchError: "ERR!!!",
                },
                configuration: {
                    apiUrl: "",
                },
            }
            const action: AnyAction = {
                type: ConfigurationConstants.CONFIGURATION_LOADING_REJECTED,
                payload: "ERR!!!",
            }
            expect(configurationReducer(inputState, action)).to.eql(expectedOutputState)
        })

        it("should overwrite an existing error", () => {
            const inputState: ConfigurationState = {
                ...empty,
                fetchState: { ...empty.fetchState, fetchError: "ERR!!!" },
            }
            const expectedOutputState: ConfigurationState = {
                fetchState: {
                    fetching: false,
                    fetched: false,
                    fetchError: "ERRR222!!!",
                },
                configuration: {
                    apiUrl: "",
                },
            }
            const action: AnyAction = {
                type: ConfigurationConstants.CONFIGURATION_LOADING_REJECTED,
                payload: "ERRR222!!!",
            }
            expect(configurationReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })
})
