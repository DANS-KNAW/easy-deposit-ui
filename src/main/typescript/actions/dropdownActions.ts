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
import { convertDropdownData } from "../lib/dropdown/dropdown"
import { DepositId } from "../model/Deposits"
import { Action } from "redux"
import { fetchMetadata } from "./depositFormActions"

const fetchDropdownPending: (type: DropdownConstants) => Action<DropdownConstants> = type => ({
    type: type,
})

const fetchDropdownFulfilled: (type: DropdownConstants, data: any) => FetchAction<any> = (type, data) => ({
    type: type,
    payload: data,
    meta: {
        transform: convertDropdownData,
    },
})

const fetchDropdownRejected: <T>(type: DropdownConstants, error: T) => ReduxAction<T> = (type, error) => ({
    type: type,
    payload: error,
})

const fetchDropdown: (pending: DropdownConstants, fulfilled: DropdownConstants, rejected: DropdownConstants, filename: string) => PromiseThunkAction = (pending, fulfilled, rejected, filename) => async dispatch => {
    dispatch(fetchDropdownPending(pending))

    try {
        const response = await axios.get(require(`../../resources/constants/${filename}`))
        dispatch(fetchDropdownFulfilled(fulfilled, response.data))
    }
    catch (e) {
        dispatch(fetchDropdownRejected(rejected, e))
    }
}

const fetchLanguagesData: () => PromiseThunkAction = () =>
    fetchDropdown(
        DropdownConstants.FETCH_LANGUAGES_DROPDOWN_PENDING,
        DropdownConstants.FETCH_LANGUAGES_DROPDOWN_FULFILLED,
        DropdownConstants.FETCH_LANGUAGES_DROPDOWN_REJECTED,
        "languages.json",
    )

const fetchContributorIdsData: () => PromiseThunkAction = () =>
    fetchDropdown(
        DropdownConstants.FETCH_CONTRIBUTOR_ID_DROPDOWN_PENDING,
        DropdownConstants.FETCH_CONTRIBUTOR_ID_DROPDOWN_FULFILLED,
        DropdownConstants.FETCH_CONTRIBUTOR_ID_DROPDOWN_REJECTED,
        "contributorIds.json",
    )

const fetchContributorRolesData: () => PromiseThunkAction = () =>
    fetchDropdown(
        DropdownConstants.FETCH_CONTRIBUTOR_ROLE_DROPDOWN_PENDING,
        DropdownConstants.FETCH_CONTRIBUTOR_ROLE_DROPDOWN_FULFILLED,
        DropdownConstants.FETCH_CONTRIBUTOR_ROLE_DROPDOWN_REJECTED,
        "contributorRoles.json",
    )

const fetchAudiencesData: () => PromiseThunkAction = () =>
    fetchDropdown(
        DropdownConstants.FETCH_AUDIENCE_DROPDOWN_PENDING,
        DropdownConstants.FETCH_AUDIENCE_DROPDOWN_FULFILLED,
        DropdownConstants.FETCH_AUDIENCE_DROPDOWN_REJECTED,
        "audiences.json",
    )

const fetchIdentifiersData: () => PromiseThunkAction = () =>
    fetchDropdown(
        DropdownConstants.FETCH_IDENTIFIER_DROPDOWN_PENDING,
        DropdownConstants.FETCH_IDENTIFIER_DROPDOWN_FULFILLED,
        DropdownConstants.FETCH_IDENTIFIER_DROPDOWN_REJECTED,
        "identifiers.json")

const fetchRelationsData: () => PromiseThunkAction = () =>
    fetchDropdown(
        DropdownConstants.FETCH_RELATION_DROPDOWN_PENDING,
        DropdownConstants.FETCH_RELATION_DROPDOWN_FULFILLED,
        DropdownConstants.FETCH_RELATION_DROPDOWN_REJECTED,
        "relations.json")

const fetchDatesData: () => PromiseThunkAction = () =>
    fetchDropdown(
        DropdownConstants.FETCH_DATES_DROPDOWN_PENDING,
        DropdownConstants.FETCH_DATES_DROPDOWN_FULFILLED,
        DropdownConstants.FETCH_DATES_DROPDOWN_REJECTED,
        "dates.json")

const fetchLicensesData: () => PromiseThunkAction = () =>
    fetchDropdown(
        DropdownConstants.FETCH_LICENSES_DROPDOWN_PENDING,
        DropdownConstants.FETCH_LICENSES_DROPDOWN_FULFILLED,
        DropdownConstants.FETCH_LICENSES_DROPDOWN_REJECTED,
        "licenses.json")

const fetchDcmiTypesData: () => PromiseThunkAction = () =>
    fetchDropdown(
        DropdownConstants.FETCH_DCMI_TYPES_DROPDOWN_PENDING,
        DropdownConstants.FETCH_DCMI_TYPES_DROPDOWN_FULFILLED,
        DropdownConstants.FETCH_DCMI_TYPES_DROPDOWN_REJECTED,
        "dcmiTypes.json")

const fetchImtFormatsData: () => PromiseThunkAction = () =>
    fetchDropdown(
        DropdownConstants.FETCH_IMT_FORMATS_DROPDOWN_PENDING,
        DropdownConstants.FETCH_IMT_FORMATS_DROPDOWN_FULFILLED,
        DropdownConstants.FETCH_IMT_FORMATS_DROPDOWN_REJECTED,
        "imtFormats.json")

const fetchAbrComplexSubjectsData: () => PromiseThunkAction = () =>
    fetchDropdown(
        DropdownConstants.FETCH_ABR_COMPLEX_SUBJECTS_DROPDOWN_PENDING,
        DropdownConstants.FETCH_ABR_COMPLEX_SUBJECTS_DROPDOWN_FULFILLED,
        DropdownConstants.FETCH_ABR_COMPLEX_SUBJECTS_DROPDOWN_REJECTED,
        "abrComplexSubjects.json",
    )

const fetchAbrPeriodeTemporalsData: () => PromiseThunkAction = () =>
    fetchDropdown(
        DropdownConstants.FETCH_ABR_PERIODE_TEMPORALS_DROPDOWN_PENDING,
        DropdownConstants.FETCH_ABR_PERIODE_TEMPORALS_DROPDOWN_FULFILLED,
        DropdownConstants.FETCH_ABR_PERIODE_TEMPORALS_DROPDOWN_REJECTED,
        "abrPeriodeTemporals.json",
    )

const fetchSpatialCoordinatesData: () => PromiseThunkAction = () =>
    fetchDropdown(
        DropdownConstants.FETCH_SPATIAL_COORDINATES_DROPDOWN_PENDING,
        DropdownConstants.FETCH_SPATIAL_COORDINATES_DROPDOWN_FULFILLED,
        DropdownConstants.FETCH_SPATIAL_COORDINATES_DROPDOWN_REJECTED,
        "spatialCoordinates.json",
    )

const fetchSpatialCoveragesIsoData: () => PromiseThunkAction = () =>
    fetchDropdown(
        DropdownConstants.FETCH_SPATIAL_COVERAGES_ISO_DROPDOWN_PENDING,
        DropdownConstants.FETCH_SPATIAL_COVERAGES_ISO_DROPDOWN_FULFILLED,
        DropdownConstants.FETCH_SPATIAL_COVERAGES_ISO_DROPDOWN_REJECTED,
        "spatialCoveragesIso.json",
    )

export const fetchAllDropdownsAndMetadata: (depositId: DepositId) => ComplexThunkAction = (depositId) => async dispatch => {
    await Promise.all(
        [
            fetchLanguagesData(),
            fetchContributorIdsData(),
            fetchContributorRolesData(),
            fetchAudiencesData(),
            fetchIdentifiersData(),
            fetchRelationsData(),
            fetchDatesData(),
            fetchLicensesData(),
            fetchDcmiTypesData(),
            fetchImtFormatsData(),
            fetchAbrComplexSubjectsData(),
            fetchAbrPeriodeTemporalsData(),
            fetchSpatialCoordinatesData(),
            fetchSpatialCoveragesIsoData(),
        ].map(dispatch),
    )

    dispatch(fetchMetadata(depositId))
}
