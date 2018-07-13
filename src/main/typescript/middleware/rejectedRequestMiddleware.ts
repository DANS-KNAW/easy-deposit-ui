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
import { DepositOverviewConstants } from "../constants/depositOverviewConstants"
import { Action, AnyAction, Dispatch, Middleware, MiddlewareAPI } from "redux"
import { createNewDepositFailed, deleteDepositFailed, fetchDepositsFailed } from "../actions/depositOverviewActions"
import { DepositFormConstants } from "../constants/depositFormConstants"
import {
    fetchDoiFailed,
    fetchMetadataFailed,
    saveDraftFailedAction,
    sendSubmitDepositFailed,
} from "../actions/depositFormActions"
import { DropdownConstants } from "../constants/dropdownConstants"
import {
    fetchAbrComplexSubjectsDataFailed,
    fetchAbrPeriodeTemporalsDataFailed,
    fetchAudiencesDataFailed,
    fetchContributorIdsDataFailed,
    fetchContributorRolesDataFailed,
    fetchDatesDataFailed,
    fetchDcmiTypesDataFailed,
    fetchIdentifiersDataFailed,
    fetchImtFormatsDataFailed,
    fetchLanguagesDataFailed,
    fetchLicensesDataFailed, fetchRelationsDataFailed,
    fetchSpatialCoordinatesDataFailed,
    fetchSpatialCoveragesIsoDataFailed,
} from "../actions/dropdownActions"

type NewActionGenerator = (action: AnyAction) => (errorMessage: string) => Action

function rejectedMiddleware(type: string) {
    return function (newActionGenerator: NewActionGenerator): Middleware {
        return ({dispatch}: MiddlewareAPI) => (next: Dispatch) => action => {
            next(action)

            if (action.type === type) {
                const response = action.payload.response
                const errorMessage = response
                    ? `${response.status} - ${response.statusText}`
                    : action.payload.message

                dispatch(newActionGenerator(action)(errorMessage))
            }
        }
    }
}

const depositFetchRejected = rejectedMiddleware(DepositOverviewConstants.FETCH_DEPOSITS_REJECTED)(() => fetchDepositsFailed)

const depositDeleteRejected = rejectedMiddleware(DepositOverviewConstants.DELETE_DEPOSIT_REJECTED)(({ meta: { depositId } }) => deleteDepositFailed(depositId))

const newDepositRejected = rejectedMiddleware(DepositOverviewConstants.CREATE_NEW_DEPOSIT_REJECTED)(() => createNewDepositFailed)

const fetchMetadataRejected = rejectedMiddleware(DepositFormConstants.FETCH_METADATA_REJECTED)(() => fetchMetadataFailed)

const fetchDoiRejected = rejectedMiddleware(DepositFormConstants.FETCH_DOI_REJECTED)(() => fetchDoiFailed)

const sendSaveDraftRejected = rejectedMiddleware(DepositFormConstants.SAVE_DRAFT_REJECTED)(() => saveDraftFailedAction)

const sendSubmitDepositRejected = rejectedMiddleware(DepositFormConstants.SEND_SUBMIT_DEPOSIT_REJECTED)(() => sendSubmitDepositFailed)

const fetchLanguageDataRejected = rejectedMiddleware(DropdownConstants.FETCH_LANGUAGES_DROPDOWN_REJECTED)(() => fetchLanguagesDataFailed)
const fetchContributorIdDataRejected = rejectedMiddleware(DropdownConstants.FETCH_CONTRIBUTOR_ID_DROPDOWN_REJECTED)(() => fetchContributorIdsDataFailed)
const fetchContributorRoleDataRejected = rejectedMiddleware(DropdownConstants.FETCH_CONTRIBUTOR_ROLE_DROPDOWN_REJECTED)(() => fetchContributorRolesDataFailed)
const fetchAudienceDataRejected = rejectedMiddleware(DropdownConstants.FETCH_AUDIENCE_DROPDOWN_REJECTED)(() => fetchAudiencesDataFailed)
const fetchIdentifierDataRejected = rejectedMiddleware(DropdownConstants.FETCH_IDENTIFIER_DROPDOWN_REJECTED)(() => fetchIdentifiersDataFailed)
const fetchRelationDataRejected = rejectedMiddleware(DropdownConstants.FETCH_RELATION_DROPDOWN_REJECTED)(() => fetchRelationsDataFailed)
const fetchDateDataRejected = rejectedMiddleware(DropdownConstants.FETCH_DATES_DROPDOWN_REJECTED)(() => fetchDatesDataFailed)
const fetchLicenseDataRejected = rejectedMiddleware(DropdownConstants.FETCH_LICENSES_DROPDOWN_REJECTED)(() => fetchLicensesDataFailed)
const fetchDcmiTypeDataRejected = rejectedMiddleware(DropdownConstants.FETCH_DCMI_TYPES_DROPDOWN_REJECTED)(() => fetchDcmiTypesDataFailed)
const fetchImtFormatsDataRejected = rejectedMiddleware(DropdownConstants.FETCH_IMT_FORMATS_DROPDOWN_REJECTED)(() => fetchImtFormatsDataFailed)
const fetchAbrComplexSubjectsDataRejected = rejectedMiddleware(DropdownConstants.FETCH_ABR_COMPLEX_SUBJECTS_DROPDOWN_REJECTED)(() => fetchAbrComplexSubjectsDataFailed)
const fetchAbrPeriodeTemporalsDataRejected = rejectedMiddleware(DropdownConstants.FETCH_ABR_PERIODE_TEMPORALS_DROPDOWN_REJECTED)(() => fetchAbrPeriodeTemporalsDataFailed)
const fetchSpatialCoordinatesDataRejected = rejectedMiddleware(DropdownConstants.FETCH_SPATIAL_COORDINATES_DROPDOWN_REJECTED)(() => fetchSpatialCoordinatesDataFailed)
const fetchSpatialCoveragesIsoDataRejected = rejectedMiddleware(DropdownConstants.FETCH_SPATIAL_COVERAGES_ISO_DROPDOWN_REJECTED)(() => fetchSpatialCoveragesIsoDataFailed)

export const rejectedRequestMiddleware = [
    depositFetchRejected,
    depositDeleteRejected,
    newDepositRejected,
    fetchMetadataRejected,
    fetchDoiRejected,
    sendSaveDraftRejected,
    sendSubmitDepositRejected,
    fetchLanguageDataRejected,
    fetchContributorIdDataRejected,
    fetchContributorRoleDataRejected,
    fetchAudienceDataRejected,
    fetchIdentifierDataRejected,
    fetchRelationDataRejected,
    fetchDateDataRejected,
    fetchLicenseDataRejected,
    fetchDcmiTypeDataRejected,
    fetchImtFormatsDataRejected,
    fetchAbrComplexSubjectsDataRejected,
    fetchAbrPeriodeTemporalsDataRejected,
    fetchSpatialCoordinatesDataRejected,
    fetchSpatialCoveragesIsoDataRejected,
]
