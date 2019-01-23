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
import { Dispatch, Middleware } from "redux"
import LocalStorage from "../lib/LocalStorage"
import { AuthenticationConstants } from "../constants/authenticationConstants"

const newRejectedMiddleware: Middleware = ({ dispatch }) => (next: Dispatch) => action => {
    if (action.type && action.type.endsWith("_REJECTED") && action.payload) {
        const { payload, meta } = action

        if (payload.response && payload.response.status === 401 &&
            // discard any FETCH_XXX_REJECTED actions with 401 status, except if we're on the login page
            meta && meta.location && meta.location.pathname !== "/login") {
            LocalStorage.setLogout()
            dispatch({
                type: AuthenticationConstants.AUTH_LOGIN_REJECTED,
            })
            next(action)
        }
        else if (!!payload.response || !!payload.message) {
            const response = payload.response
            const errorMessage = response
                ? response.data
                : payload.message

            next({ ...action, payload: errorMessage })
        }
        else
            next(action)
    }
    else
        next(action)
}

export default newRejectedMiddleware
