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
import { FileOverviewConstants } from "../constants/fileOverviewConstants"
import {
    fetchFilesFailed,
    fetchFilesSucceeded,
} from "../actions/fileOverviewActions"
import { push } from "react-router-redux"
import { filesConverter } from "../lib/files/files"
import { Files } from "../model/FileInfo"

const fileFetchConverter: Middleware = ({ dispatch }: MiddlewareAPI) => (next: Dispatch) => action => {
    next(action)

    if (action.type === FileOverviewConstants.FETCH_FILES_FULFILLED) {
        try {
            const files: Files = filesConverter(action.payload)
            dispatch(fetchFilesSucceeded(files))
        }
        catch (errorMessage) {
            dispatch(fetchFilesFailed(errorMessage))
        }
    }
}

export const fileMiddleware = [fileFetchConverter]
