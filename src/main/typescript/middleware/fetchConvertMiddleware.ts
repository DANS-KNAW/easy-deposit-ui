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

const triggerPostfix = "_FULFILLED"
const triggerPostfixLength = triggerPostfix.length
const successPostfix = "_SUCCESS"
const failedPostfix = "_REJECTED"

const fetchConvertMiddleware: Middleware = ({ dispatch, getState }) => next => action => {
    next(action)

    if (typeof action === "object" &&
        action.type &&
        action.type.endsWith(triggerPostfix) &&
        action.meta &&
        action.meta.transform &&
        typeof action.meta.transform === "function") {

        const actionType = action.type.slice(0, action.type.length - triggerPostfixLength)
        try {
            const newPayload = action.meta.transform(action.payload, getState)
            dispatch({
                ...action,
                type: actionType + successPostfix,
                payload: newPayload,
            })
        }
        catch (errorMessage) {
            dispatch({
                type: actionType + failedPostfix,
                payload: errorMessage,
            })
        }
    }
}

export default fetchConvertMiddleware
