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
import { FileInfoConstants } from "../constants/fileInfoConstants"
import axios from "axios"
import { fileInfoUrl } from "../constants/apiConstants"
import { DepositId } from "../model/Deposits"
import { Datafiles, FilePath } from "../model/Datafiles"

export const fetchDatafiles: (depositId: DepositId, dirpath: string) => ReduxAction<Promise<any>> = (depositId, dirpath) =>({
    type: FileInfoConstants.FETCH_DATAFILES,
    async payload(){
        const url = await fileInfoUrl(depositId, dirpath)
        const response = await axios.get(url)
        console.log(response.data)
        return response.data
    },
})

export const fetchDatafilesSucceeded: (datafiles: Datafiles) => ReduxAction<Datafiles> = datafiles => ({
    type: FileInfoConstants.FETCH_DATAFILES_SUCCEEDED,
    payload: datafiles
})

export const fetchDatafilesFailed: (errorMessage: string) => ReduxAction<string> = errorMessage => ({
    type: FileInfoConstants.FETCH_DATAFILES_FAILED,
    payload: errorMessage,
})

export const deleteDatafiles: (depositId: DepositId, dirpath: FilePath) => ReduxAction<Promise<void>> = (depositId, dirpath) => ({
    type: FileInfoConstants.DELETE_DATAFILE,
    async payload(){
        const url = await fileInfoUrl(depositId, dirpath)
        await axios.delete(url)
    },
    meta: {depositId: depositId, dirpath: dirpath}

})
