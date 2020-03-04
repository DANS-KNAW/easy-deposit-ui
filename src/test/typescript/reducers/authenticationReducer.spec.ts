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
import { Authentication, empty } from "../../../main/typescript/model/Authentication"
import { authenticationReducer } from "../../../main/typescript/reducers/authenticationReducer"
import { AuthenticationConstants } from "../../../main/typescript/constants/authenticationConstants"
import { logout } from "../../../main/typescript/actions/authenticationActions"

describe("authenticationReducer", () => {

    describe("AUTH_LOGIN_PENDING", () => {
        it("should handle an AUTH_LOGIN_PENDING action", () => {
            const inputState: Authentication = empty
            const expectedOutputState: Authentication = {
                isAuthenticating: true,
                isAuthenticated: false,
                authenticationError: undefined,
            }
            const action: AnyAction = {
                type: AuthenticationConstants.AUTH_LOGIN_PENDING,
            }
            expect(authenticationReducer(inputState, action)).to.eql(expectedOutputState)
        })

        it("should remove an error", () => {
            const inputState = { ...empty, authenticationError: "ERR!!!" }
            const expectedOutputState: Authentication = {
                isAuthenticating: true,
                isAuthenticated: false,
                authenticationError: undefined,
            }
            const action: AnyAction = {
                type: AuthenticationConstants.AUTH_LOGIN_PENDING,
            }
            expect(authenticationReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("AUTH_LOGIN_REJECTED", () => {
        it("should handle an AUTH_LOGIN_REJECTED action", () => {
            const inputState: Authentication = empty
            const expectedOutputState: Authentication = {
                isAuthenticating: false,
                isAuthenticated: false,
                authenticationError: "ERR!!!",
            }
            const action: AnyAction = {
                type: AuthenticationConstants.AUTH_LOGIN_REJECTED,
                payload: "ERR!!!",
            }
            expect(authenticationReducer(inputState, action)).to.eql(expectedOutputState)
        })

        it("should overwrite an existing error", () => {
            const inputState = { ...empty, authenticationError: "ERR!!!" }
            const expectedOutputState: Authentication = {
                isAuthenticating: false,
                isAuthenticated: false,
                authenticationError: "ERR222!!!",
            }
            const action: AnyAction = {
                type: AuthenticationConstants.AUTH_LOGIN_REJECTED,
                payload: "ERR222!!!",
            }
            expect(authenticationReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("AUTH_LOGIN_FULFILLED", () => {
        it("should handle an AUTH_LOGIN_FULFILLED action", () => {
            const inputState: Authentication = empty
            const expectedOutputState: Authentication = {
                isAuthenticating: false,
                isAuthenticated: true,
                authenticationError: undefined,
            }
            const action: AnyAction = {
                type: AuthenticationConstants.AUTH_LOGIN_FULFILLED,
            }
            expect(authenticationReducer(inputState, action)).to.eql(expectedOutputState)
        })

        it("should remove an error", () => {
            const inputState = { ...empty, authenticationError: "ERR!!!" }
            const expectedOutputState: Authentication = {
                isAuthenticating: false,
                isAuthenticated: true,
                authenticationError: undefined,
            }
            const action: AnyAction = {
                type: AuthenticationConstants.AUTH_LOGIN_FULFILLED,
            }
            expect(authenticationReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("AUTH_LOGOUT", () => {
        it("should handle an AUTH_LOGOUT action", () => {
            const inputState: Authentication = empty
            const expectedOutputState: Authentication = {
                isAuthenticating: false,
                isAuthenticated: false,
                authenticationError: "logout due to ERR!",
            }
            const action: AnyAction = logout("logout due to ERR!")
            expect(authenticationReducer(inputState, action)).to.eql(expectedOutputState)
        })

        it("should overwrite an existing error", () => {
            const inputState = { ...empty, authenticationError: "ERR!!!" }
            const expectedOutputState: Authentication = {
                isAuthenticating: false,
                isAuthenticated: false,
                authenticationError: "logout due to ERR!",
            }
            const action: AnyAction = logout("logout due to ERR!")
            expect(authenticationReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })
})
