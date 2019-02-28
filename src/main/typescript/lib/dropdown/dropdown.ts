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
import {
    ContributorIdDropdownListEntry,
    DropdownListEntry,
    SpatialCoordinatesDropdownListEntry,
} from "../../model/DropdownLists"

export const convertDropdownData: (data: any) => DropdownListEntry[] = data => {
    return Object.keys(data)
        .map(key => {
            const obj = data[key]

            return {
                key: key,
                value: obj.title,
                displayValue: obj.viewName,
            }
        })
}

export const convertContributorIdDropdownData: (data: any) => ContributorIdDropdownListEntry[] = data => {
    return Object.keys(data)
        .map(key => {
            const obj = data[key]

            return {
                key: key,
                value: obj.title,
                displayValue: obj.viewName,
                format: obj.format,
                baseURL: obj.baseURL,
            }
        })
}

export const convertSpatialCoordinatesDropdownData: (data: any) => SpatialCoordinatesDropdownListEntry[] = data => {
    return Object.keys(data)
        .map(key => {
            const obj = data[key]

            return {
                key: key,
                value: obj.title,
                displayValue: obj.viewName,
                xLabel: obj["x-label"],
                yLabel: obj["y-label"],
                xMin: obj["x-min"],
                xMax: obj["x-max"],
                yMin: obj["y-min"],
                yMax: obj["y-max"],
            }
        })
}
