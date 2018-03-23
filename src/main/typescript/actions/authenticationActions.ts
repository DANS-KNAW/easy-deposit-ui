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
import { AuthenticationConstants } from "../constants/authenticationConstants"
import { Action } from "redux"
import { ReduxAction } from "../lib/redux"
import axios from "axios";
import {loginURL} from "../constants/apiConstants";

export const authenticate: (userName: string, password: string) => ReduxAction<Promise<any>> = (userName, password) => ({
    type: AuthenticationConstants.AUTH_LOGIN,
    async payload() {
        await new Promise(vs => {
         setTimeout(vs, 1000)}
         )

        // TODO temporary do a GET login instead of a POST, with timeout to simulate server I/O
        const response = await axios({
            method: 'get',
            url: loginURL,
            auth: {
                username: userName,
                password: password
            }
        });
         return response.data
    },
})

// TODO signout also requires a server call...
export const signout: () => Action = () => ({
    type: AuthenticationConstants.AUTH_LOGOUT,
})
