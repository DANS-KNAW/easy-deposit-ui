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
import { DepositConstants } from "../constants/depositConstants"
import axios from "axios"
import { deposits } from "../constants/urlConstants"
import { Deposit } from "../model/Deposit"

export const fetchDeposits: () => ReduxAction<Promise<Deposit[]>> = () => ({
    type: DepositConstants.FETCH_DEPOSITS,
    payload: doFetch(),
})

const doFetch = async () => {
    try {
        const response = await axios.get(deposits)
        return response.data
    }
    catch (e) {
        throw e
    }
}
