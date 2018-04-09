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
import { AnyAction, combineReducers } from "redux"
import { authenticationReducer } from "./authenticationReducer"
import { depositOverviewReducer } from "./depositOverviewReducer"
import { foldableCardReducer } from "./foldableCardReducer"
import immutable from "object-path-immutable"
import { FormState, reducer as formReducer } from "redux-form"
import {toPath} from 'lodash'
import { depositFormReducer } from "./depositFormReducer"
import { routerReducer } from "react-router-redux"

function changeReducer(state: FormState, action: AnyAction) {
    switch (action.type) {
        case "@@redux-form/CHANGE":
            const fieldName = toPath(action.meta.field + ".changed")
            const newState = immutable.set(state.fields, fieldName, true)

            return {...state, fields: newState}
    }
    return state
}

export default combineReducers({
    form: formReducer.plugin({
        depositForm: changeReducer,
    }),
    router: routerReducer,
    user: authenticationReducer,
    deposits: depositOverviewReducer,
    foldableCards: foldableCardReducer,
    depositForm: depositFormReducer,
})
