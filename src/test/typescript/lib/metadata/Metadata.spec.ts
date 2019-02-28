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
import { expect } from "chai"
import { describe, it } from "mocha"
import { allfields, mandatoryOnly, newMetadata } from "../../mockserver/metadata"
import { metadataConverter, metadataDeconverter } from "../../../../main/typescript/lib/metadata/Metadata"
import { DropdownList, DropdownListEntry, DropdownLists } from "../../../../main/typescript/model/DropdownLists"
import {
    convertContributorIdDropdownData,
    convertDropdownData,
    convertSpatialCoordinatesDropdownData,
} from "../../../../main/typescript/lib/dropdown/dropdown"

describe("Metadata", () => {

    const fetchDropdownList: (filename: string) => any = filename => require(`../../../../main/resources/constants/${filename}`)

    function dropdownList<Entry extends DropdownListEntry>(filename: string,
                                                           convertData: (data: any) => Entry[]): DropdownList<Entry> {
        return {
            list: convertData(fetchDropdownList(filename)),
            state: {
                fetchingList: false,
                fetchedList: true,
            },
        }
    }

    const dropdownLists: DropdownLists = {
        languages: dropdownList("languages.json", convertDropdownData),
        contributorIds: dropdownList("contributorIds.json", convertContributorIdDropdownData),
        contributorRoles: dropdownList("contributorRoles.json", convertDropdownData),
        audiences: dropdownList("audiences.json", convertDropdownData),
        identifiers: dropdownList("identifiers.json", convertDropdownData),
        relations: dropdownList("relations.json", convertDropdownData),
        dates: dropdownList("dates.json", convertDropdownData),
        licenses: dropdownList("licenses.json", convertDropdownData),
        dcmiTypes: dropdownList("dcmiTypes.json", convertDropdownData),
        imtFormats: dropdownList("imtFormats.json", convertDropdownData),
        abrComplexSubjects: dropdownList("abrComplexSubjects.json", convertDropdownData),
        abrPeriodeTemporals: dropdownList("abrPeriodeTemporals.json", convertDropdownData),
        spatialCoordinates: dropdownList("spatialCoordinates.json", convertSpatialCoordinatesDropdownData),
        spatialCoveragesIso: dropdownList("spatialCoveragesIso.json", convertDropdownData),
    }

    it("should return the same object when doing a convert and deconvert consecutively for allfields example", () => {
        const input = allfields
        const converted = metadataConverter(input, dropdownLists)
        const deconverted = metadataDeconverter(converted, dropdownLists, false)

        expect(deconverted).to.eql(input)
    })

    it("should return the same object when doing a convert and deconvert consecutively for mandatoryOnly example", () => {
        const input = mandatoryOnly
        const converted = metadataConverter(input, dropdownLists)
        const deconverted = metadataDeconverter(converted, dropdownLists, false)

        expect(deconverted).to.eql(input)
    })

    it("should return the same object when doing a convert and deconvert consecutively for newMetadata example", () => {
        const input = newMetadata()
        const converted = metadataConverter(input, dropdownLists)
        const deconverted = metadataDeconverter(converted, dropdownLists, false)

        expect(deconverted).to.eql(input)
    })
})
