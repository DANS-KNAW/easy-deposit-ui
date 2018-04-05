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
import {reducer as formReducer} from 'redux-form'
import { depositOverviewReducer } from "./depositOverviewReducer"
import { userReducer } from "./userReducer";
import {toPath} from 'lodash'
import immutable from "object-path-immutable"
import { FormState } from "redux-form/lib/reducer"
import { foldableCardReducer } from "./foldableCardReducer"

export default combineReducers({
    user: userReducer,
    deposits: depositOverviewReducer,
    form: formReducer.plugin({login: changeReducer, })
    foldableCards: foldableCardReducer,
})

function changeReducer(state: FormState, action: AnyAction) {
    switch (action.type) {
        case "@@redux-form/CHANGE":
            const fieldName = toPath(action.meta.field + ".changed")
            const newState = immutable.set(state.fields, fieldName, true)

            return {...state, fields: newState}
    }
    return state
}
