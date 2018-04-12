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
// TODO signout also requires a server call...
import { ReduxAction } from "../lib/redux"
import { userURL } from "../constants/apiConstants"
import { UserConstants } from "../constants/userConstants"
import axios from "axios"
import { UserDetails } from "../model/UserDetails"

export const getUser: () => ReduxAction<Promise<any>> = () => ({
    type: UserConstants.USER,
    async payload() {
        // TODO temporary do a fake timeout to simulate server I/O
        await new Promise(resolve => setTimeout(resolve, 1000))
        const response = await axios.get(userURL)
        return response.data
    },
})

export const fetchUserFailed: (errorMessage: string) => ReduxAction<string> = errorMessage => ({
    type: UserConstants.USER_FAILED,
    payload: errorMessage,
})

export const fetchUserSucceeded: (user: UserDetails) => ReduxAction<UserDetails> = user => ({
    type: UserConstants.USER_SUCCEEDED,
    payload: user,
})
