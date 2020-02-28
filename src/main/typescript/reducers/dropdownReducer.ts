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
import { DropdownList, DropdownListEntry, DropdownListState, emptyDropdownLists } from "../model/DropdownLists"
import { DropdownConstants } from "../constants/dropdownConstants"

function dropdownListReducer<Entry extends DropdownListEntry>(fulfilledAction: DropdownConstants,
                                                              failedAction: DropdownConstants,
                                                              emptyState: Entry[]): Reducer<Entry[]> {
    return (state = emptyState, action) => {
        switch (action.type) {
            case fulfilledAction:
                return action.payload
            case failedAction:
                return []
            default:
                return state
        }
    }
}

function dropdownStateReducer(pendingAction: DropdownConstants,
                              fulfilledAction: DropdownConstants,
                              failedAction: DropdownConstants,
                              emptyState: DropdownListState): Reducer<DropdownListState> {
    return (state = emptyState, action) => {
        switch (action.type) {
            case pendingAction:
                return {
                    fetchingList: true,
                    fetchedList: false,
                    fetchListError: undefined,
                }
            case fulfilledAction:
                return {
                    fetchingList: false,
                    fetchedList: true,
                    fetchListError: undefined,
                }
            case failedAction:
                return {
                    fetchingList: false,
                    fetchedList: false,
                    fetchListError: action.payload,
                }
            default:
                return state
        }
    }
}

function dropdownReducer<Entry extends DropdownListEntry>(pendingAction: DropdownConstants,
                                                          fulfilledAction: DropdownConstants,
                                                          failedAction: DropdownConstants,
                                                          emptyState: DropdownList<Entry>): Reducer<DropdownList<Entry>> {
    return combineReducers({
        list: dropdownListReducer(
            fulfilledAction,
            failedAction,
            emptyState.list,
        ),
        state: dropdownStateReducer(
            pendingAction,
            fulfilledAction,
            failedAction,
            emptyState.state,
        ),
    })
}

export const allDropdownReducers = combineReducers({
    languages: dropdownReducer(
        DropdownConstants.FETCH_LANGUAGES_DROPDOWN_PENDING,
        DropdownConstants.FETCH_LANGUAGES_DROPDOWN_SUCCESS,
        DropdownConstants.FETCH_LANGUAGES_DROPDOWN_REJECTED,
        emptyDropdownLists.languages,
    ),
    contributorRoles: dropdownReducer(
        DropdownConstants.FETCH_CONTRIBUTOR_ROLE_DROPDOWN_PENDING,
        DropdownConstants.FETCH_CONTRIBUTOR_ROLE_DROPDOWN_SUCCESS,
        DropdownConstants.FETCH_CONTRIBUTOR_ROLE_DROPDOWN_REJECTED,
        emptyDropdownLists.contributorRoles,
    ),
    audiences: dropdownReducer(
        DropdownConstants.FETCH_AUDIENCE_DROPDOWN_PENDING,
        DropdownConstants.FETCH_AUDIENCE_DROPDOWN_SUCCESS,
        DropdownConstants.FETCH_AUDIENCE_DROPDOWN_REJECTED,
        emptyDropdownLists.audiences,
    ),
    identifiers: dropdownReducer(
        DropdownConstants.FETCH_IDENTIFIER_DROPDOWN_PENDING,
        DropdownConstants.FETCH_IDENTIFIER_DROPDOWN_SUCCESS,
        DropdownConstants.FETCH_IDENTIFIER_DROPDOWN_REJECTED,
        emptyDropdownLists.identifiers,
    ),
    relations: dropdownReducer(
        DropdownConstants.FETCH_RELATION_DROPDOWN_PENDING,
        DropdownConstants.FETCH_RELATION_DROPDOWN_SUCCESS,
        DropdownConstants.FETCH_RELATION_DROPDOWN_REJECTED,
        emptyDropdownLists.relations,
    ),
    dates: dropdownReducer(
        DropdownConstants.FETCH_DATES_DROPDOWN_PENDING,
        DropdownConstants.FETCH_DATES_DROPDOWN_SUCCESS,
        DropdownConstants.FETCH_DATES_DROPDOWN_REJECTED,
        emptyDropdownLists.dates,
    ),
    licenses: dropdownReducer(
        DropdownConstants.FETCH_LICENSES_DROPDOWN_PENDING,
        DropdownConstants.FETCH_LICENSES_DROPDOWN_SUCCESS,
        DropdownConstants.FETCH_LICENSES_DROPDOWN_REJECTED,
        emptyDropdownLists.licenses,
    ),
    dcmiTypes: dropdownReducer(
        DropdownConstants.FETCH_DCMI_TYPES_DROPDOWN_PENDING,
        DropdownConstants.FETCH_DCMI_TYPES_DROPDOWN_SUCCESS,
        DropdownConstants.FETCH_DCMI_TYPES_DROPDOWN_REJECTED,
        emptyDropdownLists.dcmiTypes,
    ),
    imtFormats: dropdownReducer(
        DropdownConstants.FETCH_IMT_FORMATS_DROPDOWN_PENDING,
        DropdownConstants.FETCH_IMT_FORMATS_DROPDOWN_SUCCESS,
        DropdownConstants.FETCH_IMT_FORMATS_DROPDOWN_REJECTED,
        emptyDropdownLists.imtFormats,
    ),
    abrComplexSubjects: dropdownReducer(
        DropdownConstants.FETCH_ABR_COMPLEX_SUBJECTS_DROPDOWN_PENDING,
        DropdownConstants.FETCH_ABR_COMPLEX_SUBJECTS_DROPDOWN_SUCCESS,
        DropdownConstants.FETCH_ABR_COMPLEX_SUBJECTS_DROPDOWN_REJECTED,
        emptyDropdownLists.abrComplexSubjects,
    ),
    abrPeriodeTemporals: dropdownReducer(
        DropdownConstants.FETCH_ABR_PERIODE_TEMPORALS_DROPDOWN_PENDING,
        DropdownConstants.FETCH_ABR_PERIODE_TEMPORALS_DROPDOWN_SUCCESS,
        DropdownConstants.FETCH_ABR_PERIODE_TEMPORALS_DROPDOWN_REJECTED,
        emptyDropdownLists.abrPeriodeTemporals,
    ),
    spatialCoordinates: dropdownReducer(
        DropdownConstants.FETCH_SPATIAL_COORDINATES_DROPDOWN_PENDING,
        DropdownConstants.FETCH_SPATIAL_COORDINATES_DROPDOWN_SUCCESS,
        DropdownConstants.FETCH_SPATIAL_COORDINATES_DROPDOWN_REJECTED,
        emptyDropdownLists.spatialCoordinates,
    ),
    spatialCoveragesIso: dropdownReducer(
        DropdownConstants.FETCH_SPATIAL_COVERAGES_ISO_DROPDOWN_PENDING,
        DropdownConstants.FETCH_SPATIAL_COVERAGES_ISO_DROPDOWN_SUCCESS,
        DropdownConstants.FETCH_SPATIAL_COVERAGES_ISO_DROPDOWN_REJECTED,
        emptyDropdownLists.spatialCoveragesIso,
    ),
})
