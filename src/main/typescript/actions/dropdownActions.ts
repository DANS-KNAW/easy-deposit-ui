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
import { ReduxAction } from "../lib/redux"
import axios from "axios"
import { DropdownListEntry } from "../model/DropdownLists"

const createFetchAction: (type: DropdownConstants, filename: string) => ReduxAction<Promise<DropdownListEntry[]>> = (type, filename) => ({
    type: type,
    async payload() {
        const response = await axios.get(require(`../../resources/constants/${filename}`))
        return convertDropdownData(response.data)
    }
})

const convertDropdownData: (data: any) => DropdownListEntry[] = data => {
    return Object.keys(data)
        .map(key => {
            const obj = data[key]

            return {
                key: key,
                value: obj.title,
                displayValue: obj.viewName
            }
        })
}

const createFailedAction: (type: DropdownConstants) => (errorMessage: string) => ReduxAction<string> = type => errorMessage => ({
    type: type,
    payload: errorMessage,
})

export const fetchLanguagesData: () => ReduxAction<Promise<DropdownListEntry[]>> = () =>
    createFetchAction(DropdownConstants.FETCH_LANGUAGES_DROPDOWN, "languages.json")

export const fetchLanguagesDataFailed: (errorMessage: string) => ReduxAction<string> =
    createFailedAction(DropdownConstants.FETCH_LANGUAGES_DROPDOWN_FAILED)

export const fetchAudiencesData: () => ReduxAction<Promise<DropdownListEntry[]>> = () =>
    createFetchAction(DropdownConstants.FETCH_AUDIENCE_DROPDOWN, "audiences.json")

export const fetchAudiencesDataFailed: (errorMessage: string) => ReduxAction<string> =
    createFailedAction(DropdownConstants.FETCH_AUDIENCE_DROPDOWN_FAILED)

export const fetchIdentifiersData: () => ReduxAction<Promise<DropdownListEntry[]>> = () =>
    createFetchAction(DropdownConstants.FETCH_IDENTIFIER_DROPDOWN, "identifiers.json")

export const fetchIdentifiersDataFailed: (errorMessage: string) => ReduxAction<string> =
    createFailedAction(DropdownConstants.FETCH_IDENTIFIER_DROPDOWN_FAILED)

export const fetchDatesData: () => ReduxAction<Promise<DropdownListEntry[]>> = () =>
    createFetchAction(DropdownConstants.FETCH_DATES_DROPDOWN, "dates.json")

export const fetchDatesDataFailed: (errorMessage: string) => ReduxAction<string> =
    createFailedAction(DropdownConstants.FETCH_DATES_DROPDOWN_FAILED)

export const fetchLicensesData: () => ReduxAction<Promise<DropdownListEntry[]>> = () =>
    createFetchAction(DropdownConstants.FETCH_LICENSES_DROPDOWN, "licenses.json")

export const fetchLicensesDataFailed: (errorMessage: string) => ReduxAction<string> =
    createFailedAction(DropdownConstants.FETCH_LICENSES_DROPDOWN_FAILED)

export const fetchDcmiTypesData: () => ReduxAction<Promise<DropdownListEntry[]>> = () =>
    createFetchAction(DropdownConstants.FETCH_DCMI_TYPES_DROPDOWN, "dcmiTypes.json")

export const fetchDcmiTypesDataFailed: (errorMessage: string) => ReduxAction<string> =
    createFailedAction(DropdownConstants.FETCH_DCMI_TYPES_DROPDOWN_FAILED)

export const fetchImtFormatsData: () => ReduxAction<Promise<DropdownListEntry[]>> = () =>
    createFetchAction(DropdownConstants.FETCH_IMT_FORMATS_DROPDOWN, "imtFormats.json")

export const fetchImtFormatsDataFailed: (errorMessage: string) => ReduxAction<string> =
    createFailedAction(DropdownConstants.FETCH_IMT_FORMATS_DROPDOWN_FAILED)

export const fetchAbrComplexSubjectsData: () => ReduxAction<Promise<DropdownListEntry[]>> = () =>
    createFetchAction(DropdownConstants.FETCH_ABR_COMPLEX_SUBJECTS_DROPDOWN, "abrComplexSubjects.json")

export const fetchAbrComplexSubjectsDataFailed: (errorMessage: string) => ReduxAction<string> =
    createFailedAction(DropdownConstants.FETCH_ABR_COMPLEX_SUBJECTS_DROPDOWN_FAILED)

export const fetchAbrPeriodeTemporalsData: () => ReduxAction<Promise<DropdownListEntry[]>> = () =>
    createFetchAction(DropdownConstants.FETCH_ABR_PERIODE_TEMPORALS_DROPDOWN, "abrPeriodeTemporals.json")

export const fetchAbrPeriodeTemporalsDataFailed: (errorMessage: string) => ReduxAction<string> =
    createFailedAction(DropdownConstants.FETCH_ABR_PERIODE_TEMPORALS_DROPDOWN_FAILED)

export const fetchSpatialCoordinatesData: () => ReduxAction<Promise<DropdownListEntry[]>> = () =>
    createFetchAction(DropdownConstants.FETCH_SPATIAL_COORDINATES_DROPDOWN, "spatialCoordinates.json")

export const fetchSpatialCoordinatesDataFailed: (errorMessage: string) => ReduxAction<string> =
    createFailedAction(DropdownConstants.FETCH_SPATIAL_COORDINATES_DROPDOWN_FAILED)

export const fetchSpatialCoveragesIsoData: () => ReduxAction<Promise<DropdownListEntry[]>> = () =>
    createFetchAction(DropdownConstants.FETCH_SPATIAL_COVERAGES_ISO_DROPDOWN, "spatialCoveragesIso.json")

export const fetchSpatialCoveragesIsoDataFailed: (errorMessage: string) => ReduxAction<string> =
    createFailedAction(DropdownConstants.FETCH_SPATIAL_COVERAGES_ISO_DROPDOWN_FAILED)
