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
import { UserConstants } from "../constants/userConstants"
import { Reducer } from "redux"
import { UserDetails, empty } from "../model/UserDetails"
import { AuthenticationConstants } from "../constants/authenticationConstants"

export const userReducer: Reducer<UserDetails> = (state = empty, action) => {
    switch (action.type) {
        case UserConstants.FETCH_USER_SUCCEEDED: {
            return { ...state,
                displayName: action.payload.displayName,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                prefix: action.payload.prefix,
                groups: action.payload.groups,
                username: action.payload.username,
            }
        }
        case UserConstants.FETCH_USER_PENDING: {
            return { ...state, displayName: "" }
        }
        case AuthenticationConstants.AUTH_LOGOUT_FULFILLED: {
            return empty
        }
        case UserConstants.FETCH_USER_REJECTED: {
            return { ...state, displayName: action.payload }
        }
        default:
            return state
    }
}
