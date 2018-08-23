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
import { Dispatch, Middleware, MiddlewareAPI } from "redux"
import { DepositFormConstants, depositFormName, saveDraftResetTimeout } from "../constants/depositFormConstants"
import { push } from "react-router-redux"
import { depositOverviewRoute } from "../constants/clientRoutes"
import { saveDraftResetAction } from "../actions/depositFormActions"
import { actionTypes, change } from "redux-form"
import { AccessRightValue } from "../lib/metadata/AccessRight"

const fetchDoiProcessor: Middleware = ({ dispatch }: MiddlewareAPI) => (next: Dispatch) => action => {
    next(action)

    if (action.type === DepositFormConstants.FETCH_DOI_SUCCESS)
        dispatch(change(depositFormName, "doi", action.payload))
}

// make sure to reset the access right group when the category changes from GROUP_ACCESS to something else
// the access right group can only be used with category=GROUP_ACCESS
const resetAccessrightGroupOnCategoryChange: Middleware = ({ dispatch, getState }: MiddlewareAPI) => (next: Dispatch) => action => {
    if (action.type === actionTypes.CHANGE && // only trigger on a redux-form CHANGE event ...
        action.meta.field === "accessRights.category" && // ... that is caused by an 'accessRights.category' field ...
        getState().form.depositForm.values.accessRights.category === AccessRightValue.GROUP_ACCESS && // ... whose previous value was GROUP_ACCESS ...
        action.payload !== AccessRightValue.GROUP_ACCESS) // ... and whose new value will be something else than GROUP_ACCESS ...
        dispatch(change(depositFormName, "accessRights.group", "")) // ... then reset the 'accessRights.category' field

    next(action)
}

const saveTimer: Middleware = ({ dispatch }: MiddlewareAPI) => (next: Dispatch) => action => {
    next(action)

    if (action.type === DepositFormConstants.SAVE_DRAFT_FULFILLED)
        setTimeout(() => dispatch(saveDraftResetAction()), saveDraftResetTimeout * 1000)
}

const submitReroute: Middleware = ({ dispatch }: MiddlewareAPI) => (next: Dispatch) => action => {
    next(action)

    if (action.type === DepositFormConstants.SUBMIT_DEPOSIT_FULFILLED)
        dispatch(push(depositOverviewRoute))
}

export const depositFormMiddleware: Middleware[] = [
    fetchDoiProcessor,
    resetAccessrightGroupOnCategoryChange,
    saveTimer,
    submitReroute,
]
