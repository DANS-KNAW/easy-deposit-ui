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
import { Authentication, empty } from "../model/Authentication"
import { Reducer } from "redux"
import { AuthenticationConstants } from "../constants/authenticationConstants"

export const authenticationReducer: Reducer<Authentication> = (state = empty, action) => {
    switch (action.type) {
        case AuthenticationConstants.AUTH_LOGIN_FULFILLED: {
            return { ...state, isAuthenticated: true, isAuthenticating: false, authenticationError: undefined }
        }
        case AuthenticationConstants.AUTH_LOGIN_PENDING: {
            return { ...state, isAuthenticated: false, isAuthenticating: true, authenticationError: undefined }
        }
        case AuthenticationConstants.AUTH_LOGIN_REJECTED:
        case AuthenticationConstants.AUTH_LOGOUT: {
            return { ...state, isAuthenticated: false, isAuthenticating: false, authenticationError: action.payload }
        }
        default:
            return state
    }
}
