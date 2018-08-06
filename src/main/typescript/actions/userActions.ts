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
import { FetchAction } from "../lib/redux"
import { userURL } from "../constants/serverRoutes"
import { UserConstants } from "../constants/userConstants"
import axios from "axios"
import { UserDetails } from "../model/UserDetails"
import { userConverter } from "../lib/user/user"

export const getUser: () => FetchAction<UserDetails> = () => ({
    type: UserConstants.FETCH_USER,
    async payload() {
        const url = await userURL
        const response = await axios.get(url)
        return response.data
    },
    meta: {
        transform: userConverter
    }
})
