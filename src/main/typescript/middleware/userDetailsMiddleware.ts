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
import { Dispatch, Middleware, MiddlewareAPI } from "redux"
import { fetchUserFailed, fetchUserSucceeded } from "../actions/userActions"
import { UserConstants } from "../constants/userConstants"
import { UserDetails } from "../model/UserDetails"
import { userConverter } from "../lib/user/user"

/*
 * action.payload is type User, convert to UserDetails
 */
const userFetchConverter: Middleware = ({dispatch}: MiddlewareAPI) => (next: Dispatch) => action => {
    next(action)

    if (action.type === UserConstants.USER_FULFILLED) {
        try {
            const user: UserDetails = userConverter(action.payload)
            dispatch(fetchUserSucceeded(user))
        }
        catch (errorMessage) {
            dispatch(fetchUserFailed(errorMessage))
        }
    }
}

const userRejectedConverter: Middleware = ({dispatch}) => next => action => {
    next(action)

    if (action.type === UserConstants.USER_REJECTED)
        dispatch(fetchUserFailed(action.payload.message))
}

export const userDetailsMiddleware: Middleware[] = [
    userFetchConverter,
    userRejectedConverter,
]
