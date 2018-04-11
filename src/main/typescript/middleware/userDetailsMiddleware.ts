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
import {Middleware} from "redux"
import {fetchUserFailed, fetchUserSucceeded} from "../actions/userActions"
import {createMiddleware} from "../lib/redux"
import {UserConstants} from "../constants/userConstants";
import {Authentication} from "../model/Authentication";

/*
action.payload is type User, convert to Authentication
 */
const userFetchConverter: Middleware = createMiddleware(({dispatch}, next, action) => {
    next(action)

    if (action.type === UserConstants.USER_FULFILLED) {
        try {

            const user: Authentication = {
                userName: action.payload.username,
                isAuthenticated: true
            }

            dispatch(fetchUserSucceeded(user))
        }
        catch (errorMessage) {
            dispatch(fetchUserFailed(errorMessage))
        }
    }
})

export const userDetailsMiddleware = [userFetchConverter]
