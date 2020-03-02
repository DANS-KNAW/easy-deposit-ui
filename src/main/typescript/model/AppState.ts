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
import { Authentication, empty as emptyAuthenticatedUser } from "./Authentication"
import { DepositOverviewState, empty as emptyDeposits } from "./Deposits"
import { empty as emptyUser, UserDetails } from "./UserDetails"
import { DepositFormState, empty as emptyDepositForm } from "./DepositForm"
import { FormStateMap } from "redux-form/lib/reducer"
import { DropdownLists, emptyDropdownLists } from "./DropdownLists"
import { ConfigurationState, empty as emptyConfig } from "./Configuration"
import { emptyHelpTexts, HelpTexts } from "./HelpTexts"
import { empty as emptyFileUpload, FileUploadState } from "./FileUploadState"

export interface AppState {
    configuration: ConfigurationState
    authenticatedUser: Authentication
    user: UserDetails
    deposits: DepositOverviewState
    fileUpload: FileUploadState,
    helpTexts: HelpTexts,
    depositForm: DepositFormState,
    form: FormStateMap
    dropDowns: DropdownLists
}

export const empty: AppState = {
    configuration: emptyConfig,
    authenticatedUser: emptyAuthenticatedUser,
    user: emptyUser,
    deposits: emptyDeposits,
    fileUpload: emptyFileUpload,
    helpTexts: emptyHelpTexts,
    depositForm: emptyDepositForm,
    form: {},
    dropDowns: emptyDropdownLists,
}
