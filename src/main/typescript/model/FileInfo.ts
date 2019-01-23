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
export type Files = { [filepath: string]: FileInfo }

export interface FileInfo {
    filename: string
    dirpath: string
    fullpath: string
    sha1sum: string
}

export interface LoadingState {
    loading: boolean
    loaded: boolean
    loadingError?: string
}

export interface DeleteState {
    deleting: boolean
    deleted: boolean
    deleteError?: string
}

export type DeletingStates = { [filePath: string]: DeleteState }

export const emptyDelete: DeleteState = ({
    deleting: false,
    deleted: false,
})

export const emptyDeleteStates: DeletingStates = {}

export interface NewFileState {
    creating: boolean
    createError?: string
}

export interface FileOverviewState {
    loading: LoadingState
    deleting: DeletingStates
    creatingNew: NewFileState
    files: Files
}

export const empty: FileOverviewState = {
    loading: {
        loading: false,
        loaded: false,
    },
    deleting: {},
    creatingNew: {
        creating: false,
    },
    files: {},
}
