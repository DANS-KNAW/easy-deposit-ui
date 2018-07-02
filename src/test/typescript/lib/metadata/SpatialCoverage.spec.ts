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
import { describe, it, xit } from "mocha"
import { DropdownListEntry } from "../../../../main/typescript/model/DropdownLists"
import {
    isoSpatialCoverageDeconverter, spatialCoverageDeconverter,
    spatialCoveragesConverter,
} from "../../../../main/typescript/lib/metadata/SpatialCoverage"

describe("SpatialCoverage", () => {

    const isoValues: DropdownListEntry[] = [
        {
            key: "NLD",
            value: "Netherlands",
            displayValue: "Netherlands",
        },
        {
            key: "GBR",
            value: "United Kingdom",
            displayValue: "United Kingdom",
        },
    ]

    describe("spatialCoveragesConverter", () => {

        it("should convert a valid sequence of SpatialCoverages of both iso and non-iso coverages", () => {
            const input = [
                {
                    scheme: "dcterms:ISO3166",
                    key: "NLD",
                    value: "Nederland",
                },
                {
                    value: "Haringvliet",
                },
                {
                    value: "Grevelingenmeer",
                },
            ]
            const expected = [
                ["NLD"],
                ["Haringvliet", "Grevelingenmeer"],
            ]
            expect(spatialCoveragesConverter(isoValues)(input)).to.eql(expected)
        })

        it("should fail when an invalid scheme is provided", () => {
            const input = [
                {
                    scheme: "dcterms:invalid",
                    key: "NLD",
                    value: "Nederland",
                },
            ]
            expect(() => spatialCoveragesConverter(isoValues)(input)).to
                .throw("Error in metadata: unrecognized object: {\"scheme\":\"dcterms:invalid\",\"key\":\"NLD\",\"value\":\"Nederland\"}")
        })

        it("should fail when an invalid key is given for an iso coverage", () => {
            const input = [
                {
                    scheme: "dcterms:ISO3166",
                    key: "invalid-key",
                    value: "invalid-value",
                },
            ]
            expect(() => spatialCoveragesConverter(isoValues)(input)).to
                .throw("Error in metadata: unknown coverage value: 'invalid-key'")
        })
    })

    describe("isoSpatialCoverageDeconverter", () => {

        it("should convert a iso spatial coverage", () => {
            const input = "NLD"
            const expected = {
                scheme: "dcterms:ISO3166",
                key: "NLD",
                value: "Netherlands",
            }
            expect(isoSpatialCoverageDeconverter(isoValues)(input)).to.eql(expected)
        })

        it("should fail when the coverage does not match the allowed isoValues", () => {
            const input = "invalid-key"
            expect(() => isoSpatialCoverageDeconverter(isoValues)(input)).to
                .throw("Error in metadata: no valid coverage found for key 'invalid-key'")
        })

        it("should return an empty object when coverage is empty", () => {
            const input: string = ""
            const expected = {}
            expect(isoSpatialCoverageDeconverter(isoValues)(input)).to.eql(expected)
        })
    })

    describe("spatialCoverageDeconverter", () => {

        it("should convert a spatial coverage", () => {
            const input: string = "Haringvliet"
            const expected = {
                value: "Haringvliet",
            }
            expect(spatialCoverageDeconverter(input)).to.eql(expected)
        })

        it("should return an empty object when the coverage is empty", () => {
            const input: string = ""
            const expected = {}
            expect(spatialCoverageDeconverter(input)).to.eql(expected)
        })
    })
})
