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
import { combineReducers, Reducer } from "redux"
import { DropdownList, emptyDropdownList } from "../model/DropdownLists"
import { DropdownConstants } from "../constants/dropdownConstants"

function dropdownReducer(pendingAction: DropdownConstants,
                         fulfilledAction: DropdownConstants,
                         failedAction: DropdownConstants): Reducer<DropdownList> {
    return (state = emptyDropdownList, action) => {
        switch (action.type) {
            case pendingAction:
                return {
                    ...state,
                    state: {
                        ...state.state,
                        fetchingList: true,
                        fetchListError: undefined,
                    },
                }
            case fulfilledAction:
                return {
                    ...state,
                    list: action.payload,
                    state: {
                        ...state.state,
                        fetchingList: false,
                        fetchedList: true,
                    },
                }
            case failedAction:
                return {
                    ...state,
                    list: [],
                    state: {
                        ...state.state,
                        fetchingList: false,
                        fetchedList: true,
                        fetchListError: action.payload,
                    },
                }
            default:
                return state
        }
    }
}

export const allDropdownReducers = combineReducers({
    languages: dropdownReducer(
        DropdownConstants.FETCH_LANGUAGES_DROPDOWN_PENDING,
        DropdownConstants.FETCH_LANGUAGES_DROPDOWN_SUCCESS,
        DropdownConstants.FETCH_LANGUAGES_DROPDOWN_REJECTED,
    ),
    contributorIds: dropdownReducer(
        DropdownConstants.FETCH_CONTRIBUTOR_ID_DROPDOWN_PENDING,
        DropdownConstants.FETCH_CONTRIBUTOR_ID_DROPDOWN_SUCCESS,
        DropdownConstants.FETCH_CONTRIBUTOR_ID_DROPDOWN_REJECTED,
    ),
    contributorRoles: dropdownReducer(
        DropdownConstants.FETCH_CONTRIBUTOR_ROLE_DROPDOWN_PENDING,
        DropdownConstants.FETCH_CONTRIBUTOR_ROLE_DROPDOWN_SUCCESS,
        DropdownConstants.FETCH_CONTRIBUTOR_ROLE_DROPDOWN_REJECTED,
    ),
    audiences: dropdownReducer(
        DropdownConstants.FETCH_AUDIENCE_DROPDOWN_PENDING,
        DropdownConstants.FETCH_AUDIENCE_DROPDOWN_SUCCESS,
        DropdownConstants.FETCH_AUDIENCE_DROPDOWN_REJECTED,
    ),
    identifiers: dropdownReducer(
        DropdownConstants.FETCH_IDENTIFIER_DROPDOWN_PENDING,
        DropdownConstants.FETCH_IDENTIFIER_DROPDOWN_SUCCESS,
        DropdownConstants.FETCH_IDENTIFIER_DROPDOWN_REJECTED,
    ),
    relations: dropdownReducer(
        DropdownConstants.FETCH_RELATION_DROPDOWN_PENDING,
        DropdownConstants.FETCH_RELATION_DROPDOWN_SUCCESS,
        DropdownConstants.FETCH_RELATION_DROPDOWN_REJECTED,
    ),
    dates: dropdownReducer(
        DropdownConstants.FETCH_DATES_DROPDOWN_PENDING,
        DropdownConstants.FETCH_DATES_DROPDOWN_SUCCESS,
        DropdownConstants.FETCH_DATES_DROPDOWN_REJECTED,
    ),
    licenses: dropdownReducer(
        DropdownConstants.FETCH_LICENSES_DROPDOWN_PENDING,
        DropdownConstants.FETCH_LICENSES_DROPDOWN_SUCCESS,
        DropdownConstants.FETCH_LICENSES_DROPDOWN_REJECTED,
    ),
    dcmiTypes: dropdownReducer(
        DropdownConstants.FETCH_DCMI_TYPES_DROPDOWN_PENDING,
        DropdownConstants.FETCH_DCMI_TYPES_DROPDOWN_SUCCESS,
        DropdownConstants.FETCH_DCMI_TYPES_DROPDOWN_REJECTED,
    ),
    imtFormats: dropdownReducer(
        DropdownConstants.FETCH_IMT_FORMATS_DROPDOWN_PENDING,
        DropdownConstants.FETCH_IMT_FORMATS_DROPDOWN_SUCCESS,
        DropdownConstants.FETCH_IMT_FORMATS_DROPDOWN_REJECTED,
    ),
    abrComplexSubjects: dropdownReducer(
        DropdownConstants.FETCH_ABR_COMPLEX_SUBJECTS_DROPDOWN_PENDING,
        DropdownConstants.FETCH_ABR_COMPLEX_SUBJECTS_DROPDOWN_SUCCESS,
        DropdownConstants.FETCH_ABR_COMPLEX_SUBJECTS_DROPDOWN_REJECTED,
    ),
    abrPeriodeTemporals: dropdownReducer(
        DropdownConstants.FETCH_ABR_PERIODE_TEMPORALS_DROPDOWN_PENDING,
        DropdownConstants.FETCH_ABR_PERIODE_TEMPORALS_DROPDOWN_SUCCESS,
        DropdownConstants.FETCH_ABR_PERIODE_TEMPORALS_DROPDOWN_REJECTED,
    ),
    spatialCoordinates: dropdownReducer(
        DropdownConstants.FETCH_SPATIAL_COORDINATES_DROPDOWN_PENDING,
        DropdownConstants.FETCH_SPATIAL_COORDINATES_DROPDOWN_SUCCESS,
        DropdownConstants.FETCH_SPATIAL_COORDINATES_DROPDOWN_REJECTED,
    ),
    spatialCoveragesIso: dropdownReducer(
        DropdownConstants.FETCH_SPATIAL_COVERAGES_ISO_DROPDOWN_PENDING,
        DropdownConstants.FETCH_SPATIAL_COVERAGES_ISO_DROPDOWN_SUCCESS,
        DropdownConstants.FETCH_SPATIAL_COVERAGES_ISO_DROPDOWN_REJECTED,
    ),
})
