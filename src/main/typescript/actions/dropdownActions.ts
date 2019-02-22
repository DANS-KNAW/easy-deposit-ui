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
import { DropdownConstants } from "../constants/dropdownConstants"
import { ComplexThunkAction, FetchAction, PromiseThunkAction, ReduxAction } from "../lib/redux"
import axios from "axios"
import {
    convertContributorIdDropdownData,
    convertDropdownData,
    convertSpatialCoordinatesDropdownData,
} from "../lib/dropdown/dropdown"
import { DepositId } from "../model/Deposits"
import { Action } from "redux"
import { fetchMetadata } from "./depositFormActions"
import { DropdownList, DropdownListEntry, DropdownLists } from "../model/DropdownLists"

const fetchDropdownPending: (type: DropdownConstants) => Action<DropdownConstants> = type => ({
    type: type,
})

function fetchDropdownFulfilled<Entry extends DropdownListEntry>(type: DropdownConstants,
                                                                 data: any,
                                                                 convertData: (data: any) => Entry[]): FetchAction<any> {
    return {
        type: type,
        payload: data,
        meta: {
            transform: convertData,
        },
    }
}

const fetchDropdownRejected: <T>(type: DropdownConstants, error: T) => ReduxAction<T> = (type, error) => ({
    type: type,
    payload: error,
})

function fetchDropdown<Entry extends DropdownListEntry>(pending: DropdownConstants,
                                                        fulfilled: DropdownConstants,
                                                        rejected: DropdownConstants,
                                                        filename: string,
                                                        storeLocation: (dropDowns: DropdownLists) => DropdownList,
                                                        convertData: (data: any) => Entry[]): PromiseThunkAction {
    return async (dispatch, getState) => {
        if (!storeLocation(getState().dropDowns).state.fetchedList) {
            dispatch(fetchDropdownPending(pending))

            try {
                const response = await axios.get(require(`../../resources/constants/${filename}`))
                dispatch(fetchDropdownFulfilled(fulfilled, response.data, convertData))
            } catch (e) {
                dispatch(fetchDropdownRejected(rejected, e))
            }
        }
    }
}

const fetchLanguagesData: PromiseThunkAction = fetchDropdown(
    DropdownConstants.FETCH_LANGUAGES_DROPDOWN_PENDING,
    DropdownConstants.FETCH_LANGUAGES_DROPDOWN_FULFILLED,
    DropdownConstants.FETCH_LANGUAGES_DROPDOWN_REJECTED,
    "languages.json",
    dds => dds.languages,
    convertDropdownData,
)

const fetchContributorIdsData: PromiseThunkAction = fetchDropdown(
    DropdownConstants.FETCH_CONTRIBUTOR_ID_DROPDOWN_PENDING,
    DropdownConstants.FETCH_CONTRIBUTOR_ID_DROPDOWN_FULFILLED,
    DropdownConstants.FETCH_CONTRIBUTOR_ID_DROPDOWN_REJECTED,
    "contributorIds.json",
    dds => dds.contributorIds,
    convertContributorIdDropdownData,
)

const fetchContributorRolesData: PromiseThunkAction = fetchDropdown(
    DropdownConstants.FETCH_CONTRIBUTOR_ROLE_DROPDOWN_PENDING,
    DropdownConstants.FETCH_CONTRIBUTOR_ROLE_DROPDOWN_FULFILLED,
    DropdownConstants.FETCH_CONTRIBUTOR_ROLE_DROPDOWN_REJECTED,
    "contributorRoles.json",
    dds => dds.contributorRoles,
    convertDropdownData,
)

const fetchAudiencesData: PromiseThunkAction = fetchDropdown(
    DropdownConstants.FETCH_AUDIENCE_DROPDOWN_PENDING,
    DropdownConstants.FETCH_AUDIENCE_DROPDOWN_FULFILLED,
    DropdownConstants.FETCH_AUDIENCE_DROPDOWN_REJECTED,
    "audiences.json",
    dds => dds.audiences,
    convertDropdownData,
)

const fetchIdentifiersData: PromiseThunkAction = fetchDropdown(
    DropdownConstants.FETCH_IDENTIFIER_DROPDOWN_PENDING,
    DropdownConstants.FETCH_IDENTIFIER_DROPDOWN_FULFILLED,
    DropdownConstants.FETCH_IDENTIFIER_DROPDOWN_REJECTED,
    "identifiers.json",
    dds => dds.identifiers,
    convertDropdownData,
)

const fetchRelationsData: PromiseThunkAction = fetchDropdown(
    DropdownConstants.FETCH_RELATION_DROPDOWN_PENDING,
    DropdownConstants.FETCH_RELATION_DROPDOWN_FULFILLED,
    DropdownConstants.FETCH_RELATION_DROPDOWN_REJECTED,
    "relations.json",
    dds => dds.relations,
    convertDropdownData,
)

const fetchDatesData: PromiseThunkAction = fetchDropdown(
    DropdownConstants.FETCH_DATES_DROPDOWN_PENDING,
    DropdownConstants.FETCH_DATES_DROPDOWN_FULFILLED,
    DropdownConstants.FETCH_DATES_DROPDOWN_REJECTED,
    "dates.json",
    dds => dds.dates,
    convertDropdownData,
)

const fetchLicensesData: PromiseThunkAction = fetchDropdown(
    DropdownConstants.FETCH_LICENSES_DROPDOWN_PENDING,
    DropdownConstants.FETCH_LICENSES_DROPDOWN_FULFILLED,
    DropdownConstants.FETCH_LICENSES_DROPDOWN_REJECTED,
    "licenses.json",
    dds => dds.licenses,
    convertDropdownData,
)

const fetchDcmiTypesData: PromiseThunkAction = fetchDropdown(
    DropdownConstants.FETCH_DCMI_TYPES_DROPDOWN_PENDING,
    DropdownConstants.FETCH_DCMI_TYPES_DROPDOWN_FULFILLED,
    DropdownConstants.FETCH_DCMI_TYPES_DROPDOWN_REJECTED,
    "dcmiTypes.json",
    dds => dds.dcmiTypes,
    convertDropdownData,
)

const fetchImtFormatsData: PromiseThunkAction = fetchDropdown(
    DropdownConstants.FETCH_IMT_FORMATS_DROPDOWN_PENDING,
    DropdownConstants.FETCH_IMT_FORMATS_DROPDOWN_FULFILLED,
    DropdownConstants.FETCH_IMT_FORMATS_DROPDOWN_REJECTED,
    "imtFormats.json",
    dds => dds.imtFormats,
    convertDropdownData,
)

const fetchAbrComplexSubjectsData: PromiseThunkAction = fetchDropdown(
    DropdownConstants.FETCH_ABR_COMPLEX_SUBJECTS_DROPDOWN_PENDING,
    DropdownConstants.FETCH_ABR_COMPLEX_SUBJECTS_DROPDOWN_FULFILLED,
    DropdownConstants.FETCH_ABR_COMPLEX_SUBJECTS_DROPDOWN_REJECTED,
    "abrComplexSubjects.json",
    dds => dds.abrComplexSubjects,
    convertDropdownData,
)

const fetchAbrPeriodeTemporalsData: PromiseThunkAction = fetchDropdown(
    DropdownConstants.FETCH_ABR_PERIODE_TEMPORALS_DROPDOWN_PENDING,
    DropdownConstants.FETCH_ABR_PERIODE_TEMPORALS_DROPDOWN_FULFILLED,
    DropdownConstants.FETCH_ABR_PERIODE_TEMPORALS_DROPDOWN_REJECTED,
    "abrPeriodeTemporals.json",
    dds => dds.abrPeriodeTemporals,
    convertDropdownData,
)

const fetchSpatialCoordinatesData: PromiseThunkAction = fetchDropdown(
    DropdownConstants.FETCH_SPATIAL_COORDINATES_DROPDOWN_PENDING,
    DropdownConstants.FETCH_SPATIAL_COORDINATES_DROPDOWN_FULFILLED,
    DropdownConstants.FETCH_SPATIAL_COORDINATES_DROPDOWN_REJECTED,
    "spatialCoordinates.json",
    dds => dds.spatialCoordinates,
    convertSpatialCoordinatesDropdownData,
)

const fetchSpatialCoveragesIsoData: PromiseThunkAction = fetchDropdown(
    DropdownConstants.FETCH_SPATIAL_COVERAGES_ISO_DROPDOWN_PENDING,
    DropdownConstants.FETCH_SPATIAL_COVERAGES_ISO_DROPDOWN_FULFILLED,
    DropdownConstants.FETCH_SPATIAL_COVERAGES_ISO_DROPDOWN_REJECTED,
    "spatialCoveragesIso.json",
    dds => dds.spatialCoveragesIso,
    convertDropdownData,
)

export const fetchAllDropdownsAndMetadata: (depositId: DepositId) => ComplexThunkAction = (depositId) => async (dispatch, getState, extraArguments) => {
    await Promise.all(
        [
            fetchLanguagesData,
            fetchContributorIdsData,
            fetchContributorRolesData,
            fetchAudiencesData,
            fetchIdentifiersData,
            fetchRelationsData,
            fetchDatesData,
            fetchLicensesData,
            fetchDcmiTypesData,
            fetchImtFormatsData,
            fetchAbrComplexSubjectsData,
            fetchAbrPeriodeTemporalsData,
            fetchSpatialCoordinatesData,
            fetchSpatialCoveragesIsoData,
        ].map(f => f(dispatch, getState, extraArguments)),
    )

    dispatch(fetchMetadata(depositId))
}
