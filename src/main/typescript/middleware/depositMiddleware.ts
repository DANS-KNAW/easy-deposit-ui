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
import { Middleware } from "redux"
import { DepositOverviewConstants } from "../constants/depositOverviewConstants"
import { push } from "react-router-redux"
import { depositFormRoute } from "../constants/clientRoutes"

const newDepositGotoForm: Middleware = ({ dispatch }) => next => action => {
    next(action)

    if (action.type === DepositOverviewConstants.CREATE_NEW_DEPOSIT_SUCCESS) {
        dispatch(push(depositFormRoute(action.payload)))
    }
}

export const depositMiddleware: Middleware[] = [
    newDepositGotoForm,
]
