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
import { FetchAction, PromiseAction, ThunkAction } from "../lib/redux"
import { FileOverviewConstants } from "../constants/fileOverviewConstants"
import axios from "axios"
import { Action } from "redux"
import { DepositId } from "../model/Deposits"
import { filesConverter } from "../lib/files/files"
import { listFilesUrl, deleteFileUrl } from "../selectors/serverRoutes"
import { Files } from "../model/FileInfo"

export const fetchFiles: (depositId: DepositId) => ThunkAction<FetchAction<Files>> = (depositId) => (dispatch, getState) => dispatch({
    type: FileOverviewConstants.FETCH_FILES,
    async payload() {
        const response = await axios.get(listFilesUrl(depositId)(getState()))
        return response.data
    },
    meta: {
        transform: filesConverter,
    },
})

export const deleteFile: (depositId: DepositId, filePath: string) => ThunkAction<PromiseAction<void>> = (depositId, filePath) => (dispatch, getState)=> dispatch({
    type: FileOverviewConstants.DELETE_FILE,
    async payload() {
        await axios.delete(deleteFileUrl(depositId, filePath)(getState()))
        dispatch(fetchFiles(depositId))
    },
    meta: { filePath: filePath },
})

export const cancelDeleteFile: (filePath: string) => Action =(filePath) =>({
    type: FileOverviewConstants.DELETE_FILE_CANCELLED,
    meta: { filePath: filePath },
})

export const askConfirmation: (filePath: string) => Action =(filePath) =>({
    type: FileOverviewConstants.DELETE_FILE_CONFIRMATION,
    meta: { filePath: filePath },
})

export const cleanFiles: () => Action = () => ({
    type: FileOverviewConstants.CLEAN_FILES,
})

// TODO update not yet used (think upload)
