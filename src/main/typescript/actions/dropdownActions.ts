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
import { FetchAction } from "../lib/redux"
import axios from "axios"
import { DropdownListEntry } from "../model/DropdownLists"
import { convertDropdownData } from "../lib/dropdown/dropdown"

const fetchDropdown: (type: DropdownConstants, filename: string) => FetchAction<DropdownListEntry[]> = (type, filename) => ({
    type: type,
    async payload() {
        const response = await axios.get(require(`../../resources/constants/${filename}`))
        return response.data
    },
    meta: {
        transform: convertDropdownData,
    },
})

export const fetchLanguagesData: () => FetchAction<DropdownListEntry[]> = () =>
    fetchDropdown(DropdownConstants.FETCH_LANGUAGES_DROPDOWN, "languages.json")

export const fetchContributorIdsData: () => FetchAction<DropdownListEntry[]> = () =>
    fetchDropdown(DropdownConstants.FETCH_CONTRIBUTOR_ID_DROPDOWN, "contributorIds.json")

export const fetchContributorRolesData: () => FetchAction<DropdownListEntry[]> = () =>
    fetchDropdown(DropdownConstants.FETCH_CONTRIBUTOR_ROLE_DROPDOWN, "contributorRoles.json")

export const fetchAudiencesData: () => FetchAction<DropdownListEntry[]> = () =>
    fetchDropdown(DropdownConstants.FETCH_AUDIENCE_DROPDOWN, "audiences.json")

export const fetchIdentifiersData: () => FetchAction<DropdownListEntry[]> = () =>
    fetchDropdown(DropdownConstants.FETCH_IDENTIFIER_DROPDOWN, "identifiers.json")

export const fetchRelationsData: () => FetchAction<DropdownListEntry[]> = () =>
    fetchDropdown(DropdownConstants.FETCH_RELATION_DROPDOWN, "relations.json")

export const fetchDatesData: () => FetchAction<DropdownListEntry[]> = () =>
    fetchDropdown(DropdownConstants.FETCH_DATES_DROPDOWN, "dates.json")

export const fetchLicensesData: () => FetchAction<DropdownListEntry[]> = () =>
    fetchDropdown(DropdownConstants.FETCH_LICENSES_DROPDOWN, "licenses.json")

export const fetchDcmiTypesData: () => FetchAction<DropdownListEntry[]> = () =>
    fetchDropdown(DropdownConstants.FETCH_DCMI_TYPES_DROPDOWN, "dcmiTypes.json")

export const fetchImtFormatsData: () => FetchAction<DropdownListEntry[]> = () =>
    fetchDropdown(DropdownConstants.FETCH_IMT_FORMATS_DROPDOWN, "imtFormats.json")

export const fetchAbrComplexSubjectsData: () => FetchAction<DropdownListEntry[]> = () =>
    fetchDropdown(DropdownConstants.FETCH_ABR_COMPLEX_SUBJECTS_DROPDOWN, "abrComplexSubjects.json")

export const fetchAbrPeriodeTemporalsData: () => FetchAction<DropdownListEntry[]> = () =>
    fetchDropdown(DropdownConstants.FETCH_ABR_PERIODE_TEMPORALS_DROPDOWN, "abrPeriodeTemporals.json")

export const fetchSpatialCoordinatesData: () => FetchAction<DropdownListEntry[]> = () =>
    fetchDropdown(DropdownConstants.FETCH_SPATIAL_COORDINATES_DROPDOWN, "spatialCoordinates.json")

export const fetchSpatialCoveragesIsoData: () => FetchAction<DropdownListEntry[]> = () =>
    fetchDropdown(DropdownConstants.FETCH_SPATIAL_COVERAGES_ISO_DROPDOWN, "spatialCoveragesIso.json")
