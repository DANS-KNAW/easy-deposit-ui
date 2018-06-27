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

import { DatafileOverviewState, empty } from "../model/Datafiles"
import { Reducer } from "redux"
import { FileInfoConstants } from "../constants/fileInfoConstants"
import { DeleteState, emptyDelete } from "../model/Deposits"

export const datafilesOverviewReducer: Reducer<DatafileOverviewState> = (state = empty, action) => {
  switch(action.type) {
      case FileInfoConstants.FETCH_DATAFILES_PENDING: {
          return { ...state, loadingState: { ...state.loadingState, loading: true, loadingError: undefined}}
      }
      case FileInfoConstants.FETCH_DATAFILES_FAILED: {
          return { ...state, loadingState: { ...state.loadingState, loading: false, loadingError: action.payload} }
      }
      case FileInfoConstants.FETCH_DATAFILES_SUCCEEDED: {
          return { ...state, loadingState: { ...state.loadingState, loading: false, loaded: true}, datafiles: action.payload}
      }
      case FileInfoConstants.DELETE_DATAFILES_PENDING: {
          const { meta: { dirpath } } = action

          const deleteState: DeleteState = state.deleting[dirpath]
          const newDeleteState: DeleteState = deleteState
              ? { ...deleteState, deleting: true }
              : { ...emptyDelete, deleting: true }
          return { ...state, deleting: { ...state.deleting, [dirpath]: newDeleteState } }
      }
      default:
          return state
  }
}
