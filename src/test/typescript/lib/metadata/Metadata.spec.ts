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
import { DropdownList, DropdownLists } from "../../../../main/typescript/model/DropdownLists"
import { convertDropdownData } from "../../../../main/typescript/lib/dropdown/dropdown"

describe("Metadata", () => {

    const fetchDropdownList: (filename: string) => any = filename => require(`../../../../main/resources/constants/${filename}`)
    const dropdownList: (filename: string) => DropdownList = filename => {
        return {
            list: convertDropdownData(fetchDropdownList(filename)),
            state: {
                fetchingList: false,
                fetchedList: true,
            },
        }
    }

    const dropdownLists: DropdownLists = {
        languages: dropdownList("languages.json"),
        contributorIds: dropdownList("contributorIds.json"),
        contributorRoles: dropdownList("contributorRoles.json"),
        audiences: dropdownList("audiences.json"),
        identifiers: dropdownList("identifiers.json"),
        relations: dropdownList("relations.json"),
        dates: dropdownList("dates.json"),
        licenses: dropdownList("licenses.json"),
        dcmiTypes: dropdownList("dcmiTypes.json"),
        imtFormats: dropdownList("imtFormats.json"),
        abrComplexSubjects: dropdownList("abrComplexSubjects.json"),
        abrPeriodeTemporals: dropdownList("abrPeriodeTemporals.json"),
        spatialCoordinates: dropdownList("spatialCoordinates.json"),
        spatialCoveragesIso: dropdownList("spatialCoveragesIso.json"),
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
