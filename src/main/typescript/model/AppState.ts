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
import { empty as emptyAuthenticatedUser, Authentication } from "./Authentication"
import { empty as emptyDeposits, DepositOverviewState } from "./Deposits"
import { empty as emptyFiles, FileOverviewState } from "./FileInfo"
import { empty as emptyUser } from "./UserDetails"
import { emptyFoldableCards, FoldableCards } from "./FoldableCards"
import { UserDetails } from "./UserDetails"
import { empty as emptyDepositForm } from "./DepositForm"
import { DepositFormState } from "./DepositForm"
import { FormStateMap } from "redux-form/lib/reducer"
import { DropdownLists, emptyDropdownLists } from "./DropdownLists"
import { empty as emptyConfig, ConfigurationState } from "./Configuration"
import { RouterState } from "react-router-redux"

export interface AppState {
    configuration: ConfigurationState
    authenticatedUser: Authentication
    user: UserDetails
    deposits: DepositOverviewState
    files: FileOverviewState
    foldableCards: FoldableCards,
    depositForm: DepositFormState,
    form: FormStateMap
    router: RouterState,
    dropDowns: DropdownLists
}

export const empty: AppState = {
    configuration: emptyConfig,
    authenticatedUser: emptyAuthenticatedUser,
    user: emptyUser,
    deposits: emptyDeposits,
    files: emptyFiles,
    foldableCards: emptyFoldableCards,
    depositForm: emptyDepositForm,
    form: {},
    router: { location: null },
    dropDowns: emptyDropdownLists
}
