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
import { createMiddleware } from "../lib/redux"
import { FileInfoConstants } from "../constants/fileInfoConstants"
import { Datafile, Datafiles, FilePath } from "../model/Datafiles"
import { fetchDatafilesFailed, fetchDatafilesSucceeded } from "../actions/fileInfoActions"

const datafilesFetchConverter: Middleware = createMiddleware(({dispatch}, next, action) => {
    next(action)

    if(action.type === FileInfoConstants.FETCH_DATAFILES_FULFILLED) {
        try {
            const datafiles: Datafiles = action.payload.map((input: any) => {
                return ({
                    filename: input.filename,
                    dirpath: input.dirpath,
                    sha1sum: input.sha1sum,
                    filepath: input.dirpath+input.filename
                })
            }).reduce((obj: Datafiles, item: Datafile & {filepath: string }) => {
                obj[item.filepath] = ({
                    filename: item.filename,
                    filepath: item.dirpath + item.filename,
                    dirpath: item.dirpath,
                    sha1sum: item.sha1sum,
                })
                return obj
            },{})

            dispatch(fetchDatafilesSucceeded(datafiles))
        }
        catch(errorMessage){
            dispatch(fetchDatafilesFailed(errorMessage))
        }
    }
})

export const datafilesMiddleware = [datafilesFetchConverter]
