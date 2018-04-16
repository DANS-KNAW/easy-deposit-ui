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
import { Middleware } from "redux"
import { fetchUserFailed, fetchUserSucceeded } from "../actions/userActions"
import { createMiddleware } from "../lib/redux"
import { UserConstants } from "../constants/userConstants"
import { UserDetails } from "../model/UserDetails"

/*
action.payload is type User, convert to UserDetails
 */
const userFetchConverter: Middleware = createMiddleware(({ dispatch }, next, action) => {
    next(action)

    if (action.type === UserConstants.USER_FULFILLED) {
        try {

            const user: UserDetails = {
                username: action.payload.username,
                firstName: action.payload.firstName,
                prefix: action.payload.prefix,
                lastName: action.payload.lastName,
                groups: action.payload.groups,
                displayName: `${action.payload.firstName} ${action.payload.prefix ? action.payload.prefix+" " : ""}${action.payload.lastName}`,
            }

            dispatch(fetchUserSucceeded(user))
        }
        catch (errorMessage) {
            dispatch(fetchUserFailed(errorMessage))
        }
    }
    if (action.type === UserConstants.USER_REJECTED) {
        dispatch(fetchUserFailed(action.payload.message))
    }
})

export const userDetailsMiddleware = [userFetchConverter]
