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
import { applyMiddleware, createStore } from "redux"
import thunkMiddleware from "redux-thunk"
import promiseMiddleware from "redux-promise-middleware"
import reducers from "./reducers/index"
import customMiddleware from "./middleware"
import * as H from "history"
import { routerMiddleware } from "react-router-redux"
import { inDevelopmentMode } from "./lib/config"
import { AppState } from "./model/AppState"
import { fetchConfiguration } from "./actions/configurationActions"

///
// import {Action} from 'redux'
// const predicate = (state: AppState, action: Action) => !action.type.startsWith('@@redux-form')

// import {Action} from 'redux'
// const predicate = (state: AppState, action: Action) => !action.type.startsWith('@@redux-form/CHANGE')

const predicate = () => true // if you want to see all actions
// const predicate = () => false // if you want to see no actions

export const newStore = (history: H.History) => {
    const store = makeStore(history)

    store.dispatch(fetchConfiguration())

    return store
}

const makeStore = (history: H.History) => {
    if (inDevelopmentMode) {
        const { createLogger } = require("redux-logger")
        const { composeWithDevTools } = require("redux-devtools-extension")
        const composeEnhancers = composeWithDevTools({ predicate })
        return createStore(
            reducers,
            composeEnhancers(
                applyMiddleware(
                    ...customMiddleware,
                    thunkMiddleware,
                    promiseMiddleware(),
                    routerMiddleware(history),
                    createLogger({ predicate }),
                ),
            ),
        )
    }
    else
        return createStore(
            reducers,
            applyMiddleware(
                ...customMiddleware,
                thunkMiddleware,
                routerMiddleware(history),
                promiseMiddleware(),
            ),
        )
}
