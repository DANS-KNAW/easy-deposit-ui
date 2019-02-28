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
export interface DropdownListState {
    fetchingList: boolean
    fetchedList: boolean
    fetchListError?: string
}

const emptyDropdownListState: DropdownListState = {
    fetchingList: false,
    fetchedList: false,
}

export interface DropdownListEntry {
    key: string
    value: string
    displayValue: string
}

export interface ContributorIdDropdownListEntry extends DropdownListEntry {
    format: string
    baseURL?: string
}

export interface SpatialCoordinatesDropdownListEntry extends DropdownListEntry {
    xLabel: string
    yLabel: string
    xMin: number
    xMax: number
    yMin: number
    yMax: number
}

export interface DropdownList<Entry extends DropdownListEntry = DropdownListEntry> {
    list: Entry[]
    state: DropdownListState
}

export function emptyDropdownList<Entry extends DropdownListEntry>(): DropdownList<Entry> {
    return {
        list: [],
        state: emptyDropdownListState,
    }
}

export interface DropdownLists {
    languages: DropdownList
    contributorIds: DropdownList<ContributorIdDropdownListEntry>
    contributorRoles: DropdownList
    audiences: DropdownList
    identifiers: DropdownList
    relations: DropdownList
    dates: DropdownList
    licenses: DropdownList
    dcmiTypes: DropdownList
    imtFormats: DropdownList
    abrComplexSubjects: DropdownList
    abrPeriodeTemporals: DropdownList
    spatialCoordinates: DropdownList<SpatialCoordinatesDropdownListEntry>
    spatialCoveragesIso: DropdownList
}

export const emptyDropdownLists: DropdownLists = {
    languages: emptyDropdownList(),
    contributorIds: emptyDropdownList(),
    contributorRoles: emptyDropdownList(),
    audiences: emptyDropdownList(),
    identifiers: emptyDropdownList(),
    relations: emptyDropdownList(),
    dates: emptyDropdownList(),
    licenses: emptyDropdownList(),
    dcmiTypes: emptyDropdownList(),
    imtFormats: emptyDropdownList(),
    abrComplexSubjects: emptyDropdownList(),
    abrPeriodeTemporals: emptyDropdownList(),
    spatialCoordinates: emptyDropdownList(),
    spatialCoveragesIso: emptyDropdownList(),
}
