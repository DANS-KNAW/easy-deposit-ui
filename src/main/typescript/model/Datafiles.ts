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


import { DeletingStates, LoadingState } from "./Deposits"

export type FilePath = string
export type Datafiles = { [filepath: string]: Datafile}

export interface Datafile {
    filename: string
    filepath: FilePath
    dirpath: FilePath
    sha1sum: string
}

export interface DatafileOverviewState {
    loadingState: LoadingState
    deleting: DeletingStates
    datafiles : Datafiles
}

export const empty: DatafileOverviewState = {
    loadingState: {
        loading: false,
        loaded: false,
    },
    deleting: {},
    datafiles: {},
}
