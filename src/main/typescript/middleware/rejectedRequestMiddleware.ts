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
import { logout } from "../actions/authenticationActions"

const newRejectedMiddleware: Middleware = ({ dispatch }) => (next: Dispatch) => action => {
    if (action.type && action.type.endsWith("_REJECTED") && action.payload) {
        const { payload } = action

        if (payload.response && payload.response.status === 401) {
            dispatch(logout)
            next({ ...action, payload: payload.response.data })
        }
        else if (!!payload.response || !!payload.message) {
            const errorMessage = payload.response
                ? payload.response.data
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
