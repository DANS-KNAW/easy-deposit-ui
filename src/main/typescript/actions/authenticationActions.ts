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
import { ReduxAction, PromiseAction } from "../lib/redux"
import { loginURL, logoutURL } from "../constants/serverRoutes"
import { AuthenticationConstants } from "../constants/authenticationConstants"
import axios from "axios"

export const authenticate: (userName: string, password: string) => PromiseAction<void> = (userName, password) => ({
    type: AuthenticationConstants.AUTH_LOGIN,
    async payload() {
        const url = await loginURL
        await axios.post(url, {}, {
            auth: {
                password: password,
                username: userName,
            },
        })
    },
})

export const signout: () => PromiseAction<void> = () => ({
    type: AuthenticationConstants.AUTH_LOGOUT,
    async payload() {
        const url = await logoutURL
        await axios.post(url)
    },
})

