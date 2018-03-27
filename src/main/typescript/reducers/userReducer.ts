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
import {UserConstants} from "../constants/userConstants";
import { UserDetails, empty } from "../model/UserDetails"
import { Reducer } from "redux"
import { AuthenticationConstants } from "../constants/authenticationConstants"

export const userReducer: Reducer<UserDetails> = (state = empty, action) => {
    switch (action.type) {
        case UserConstants.USER_SUCCESS: {
            return {...state, userName: action.payload.userName}
        }
        case UserConstants.USER_FAILED: {
            return {...state, isAuthenticated: false}
        }
        case UserConstants.USER_PENDING: {
            return {...state, userName: "loading ..."}
        }
        case AuthenticationConstants.AUTH_LOGIN_FULFILLED: {
            return { ...state, isAuthenticated: true }
        }
        case AuthenticationConstants.AUTH_LOGIN_REJECTED: {
            return { ...state, isAuthenticated: false, authenticationError: action.payload }
        }
        case AuthenticationConstants.AUTH_LOGIN_FAILED: {
            return { ...state, isAuthenticated: false, authenticationError: action.payload }
        }
        case AuthenticationConstants.AUTH_LOGOUT: {
            return { ...state, isAuthenticated: false, userName: "" }
        }
        default:
            return state
    }
}