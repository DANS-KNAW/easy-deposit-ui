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
import { ReduxAction } from "../lib/redux"
import { loginURL, userURL, logoutURL } from "../constants/apiConstants"
import { AuthenticationConstants } from "../constants/authenticationConstants"
import axios from "axios"

export const authenticate: (userName: string, password: string) => ReduxAction<Promise<void>> = (userName, password) => ({
    type: AuthenticationConstants.AUTH_LOGIN,
    async payload() {
        const params = new URLSearchParams()
        params.append('login', userName)
        params.append('password',password)
        await axios.post(loginURL, params)
    },
})

export const signout: () => ReduxAction<Promise<void>> = () => ({
    type: AuthenticationConstants.AUTH_LOGOUT,
    async payload() {
        await axios.post(logoutURL)
    }
})

