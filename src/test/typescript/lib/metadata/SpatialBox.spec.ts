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
import { DropdownListEntry } from "../../../../main/typescript/model/DropdownLists"
import { boxConverter, boxDeconverter } from "../../../../main/typescript/lib/metadata/SpatialBox"

describe("SpatialBox", () => {

    const schemes: DropdownListEntry[] = [
        {
            key: "http://www.opengis.net/def/crs/EPSG/0/28992",
            value: "RD (in m.)",
            displayValue: "RD (in m.)",
        },
        {
            key: "http://www.opengis.net/def/crs/EPSG/0/4326",
            value: "lengte/breedte (graden)",
            displayValue: "lengte/breedte (graden)",
        },
    ]

    describe("boxConverter", () => {

        it("should convert a valid spatial box", () => {
            const input = {
                scheme: "http://www.opengis.net/def/crs/EPSG/0/28992",
                north: "1",
                east: "2",
                south: "3",
                west: "4",
            }
            const expected = {
                scheme: "http://www.opengis.net/def/crs/EPSG/0/28992",
                north: "1",
                east: "2",
                south: "3",
                west: "4",
            }
            expect(boxConverter(schemes)(input)).to.eql(expected)
        })

        it("should convert a partial spatial box (only scheme)", () => {
            const input = {
                scheme: "http://www.opengis.net/def/crs/EPSG/0/28992",
            }
            const expected = {
                scheme: "http://www.opengis.net/def/crs/EPSG/0/28992",
                north: undefined,
                east: undefined,
                south: undefined,
                west: undefined,
            }
            expect(boxConverter(schemes)(input)).to.eql(expected)
        })

        it("should convert a partial spatial box (only some coordinates)", () => {
            const input = {
                west: "4",
            }
            const expected = {
                scheme: undefined,
                north: undefined,
                east: undefined,
                south: undefined,
                west: "4",
            }
            expect(boxConverter(schemes)(input)).to.eql(expected)
        })

        it("should fail when an invalid scheme is provided", () => {
            const input = {
                scheme: "http://www.opengis.net/def/crs/EPSG/0/fail",
                north: "1",
                east: "2",
                south: "3",
                west: "4",
            }
            expect(() => boxConverter(schemes)(input)).to
                .throw("Error in metadata: unknown coordinate system: 'http://www.opengis.net/def/crs/EPSG/0/fail'")
        })

        it("should fail when a coordinate does not represent a number", () => {
            const input = {
                scheme: "http://www.opengis.net/def/crs/EPSG/0/28992",
                north: "abc",
                east: 2,
                south: 3,
                west: 4,
            }
            expect(() => boxConverter(schemes)(input)).to
                .throw("Error in metadata: Box {\"scheme\":\"http://www.opengis.net/def/crs/EPSG/0/28992\",\"north\":\"abc\",\"east\":2,\"south\":3,\"west\":4} consists of something else than a Number")
        })
    })

    describe("boxDeconverter", () => {

        it("should convert a SpatialBox to the correct external format", () => {
            const input = {
                scheme: "http://www.opengis.net/def/crs/EPSG/0/28992",
                north: "1",
                east: "2",
                south: "3",
                west: "4",
            }
            const expected = {
                scheme: "http://www.opengis.net/def/crs/EPSG/0/28992",
                north: 1,
                east: 2,
                south: 3,
                west: 4,
            }
            expect(boxDeconverter(input)).to.eql(expected)
        })

        it("should convert empty fields in the object to an empty object", () => {
            const input = {
                scheme: "",
                north: "",
                east: "",
                south: "",
                west: "",
            }
            const expected = {}
            expect(boxDeconverter(input)).to.eql(expected)
        })
    })
})
