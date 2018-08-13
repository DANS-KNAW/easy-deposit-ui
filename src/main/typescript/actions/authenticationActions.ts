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
import { PromiseAction, ThunkAction } from "../lib/redux"
import { AuthenticationConstants } from "../constants/authenticationConstants"
import axios from "axios"
import { loginUrl, logoutUrl } from "../selectors/serverRoutes"

export const authenticate: (userName: string, password: string) => ThunkAction<PromiseAction<void>> = (userName, password) => (dispatch, getState) => dispatch({
    type: AuthenticationConstants.AUTH_LOGIN,
    async payload() {
        await axios.post(loginUrl(getState()), {}, {
            auth: {
                password: password,
                username: userName,
            },
        })
    },
})

export const signout: () => ThunkAction<PromiseAction<void>> = () => (dispatch, getState) => dispatch({
    type: AuthenticationConstants.AUTH_LOGOUT,
    async payload() {
        await axios.post(logoutUrl(getState()))
    },
})

