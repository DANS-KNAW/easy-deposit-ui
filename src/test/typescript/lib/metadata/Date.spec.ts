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
import {
    Dates,
    QualifiedDate,
    qualifiedDateDeconverter,
    qualifiedDatesConverter,
    qualifiedDateStringDeconverter,
} from "../../../../main/typescript/lib/metadata/Date"
import { DropdownListEntry } from "../../../../main/typescript/model/DropdownLists"

describe("Date", () => {

    const dateChoices: DropdownListEntry[] = [
        {
            key: "dcterms:date",
            value: "Date",
            displayValue: "Date",
        },
        {
            key: "dcterms:valid",
            value: "Valid",
            displayValue: "Valid",
        },
        {
            key: "dcterms:issued",
            value: "Issued",
            displayValue: "Issued",
        },
        {
            key: "dcterms:modified",
            value: "Modified",
            displayValue: "Modified",
        },
        {
            key: "dcterms:dateAccepted",
            value: "Date accepted",
            displayValue: "Date accepted",
        },
        {
            key: "dcterms:dateCopyrighted",
            value: "Date copyrighted",
            displayValue: "Date copyrighted",
        },
    ]

    const converter = qualifiedDatesConverter(dateChoices)

    describe("qualifiedDatesConverter", () => {

        it("should convert a valid sequence of dates and split them correctly", () => {
            const input = [
                {
                    scheme: "dcterms:W3CDTF",
                    value: "2018-03-18",
                    qualifier: "dcterms:dateCopyrighted",
                },
                {
                    scheme: "dcterms:W3CDTF",
                    value: "2018-03-17",
                    qualifier: "dcterms:valid",
                },
                {
                    scheme: "dcterms:W3CDTF",
                    value: "2018-03-19",
                    qualifier: "dcterms:created",
                },
                {
                    value: "2018-02-02",
                    qualifier: "dcterms:modified",
                },
                {
                    scheme: "dcterms:W3CDTF",
                    value: "2018-03-14",
                    qualifier: "dcterms:available",
                },
                {
                    value: "Groundhog day",
                    qualifier: "dcterms:issued",
                },
            ]
            const expected: Dates = {
                dateCreated: {
                    qualifier: "dcterms:created",
                    value: new Date("2018-03-19"),
                },
                dateAvailable: {
                    qualifier: "dcterms:available",
                    value: new Date("2018-03-14"),
                },
                dates: [
                    {
                        qualifier: "dcterms:dateCopyrighted",
                        value: new Date("2018-03-18"),
                    },
                    {
                        qualifier: "dcterms:valid",
                        value: new Date("2018-03-17"),
                    },
                ],
                textDates: [
                    {
                        qualifier: "dcterms:modified",
                        value: "2018-02-02",
                    },
                    {
                        qualifier: "dcterms:issued",
                        value: "Groundhog day",
                    },
                ],
            }
            expect(converter(input)).to.eql(expected)
        })

        it("should succeed when no qualifier is given (default to Date)", () => {
            const input = [
                {
                    scheme: "dcterms:W3CDTF",
                    value: "2018-03-18",
                    // no qualifier
                },
                {
                    scheme: "dcterms:W3CDTF",
                    // no value
                    qualifier: "dcterms:date",
                },
                {
                    value: "Groundhog day",
                    // no qualifier
                },
            ]
            const expected: Dates = {
                dates: [
                    {
                        qualifier: "dcterms:date",
                        value: new Date("2018-03-18"),
                    },
                    {
                        qualifier: "dcterms:date",
                        value: undefined,
                    },
                ],
                textDates: [
                    {
                        qualifier: "dcterms:date",
                        value: "Groundhog day",
                    },
                ],
            }
            expect(converter(input)).to.eql(expected)
        })

        it("should fail when an invalid qualifier is given", () => {
            const input = [
                {
                    scheme: "dcterms:W3CDTF",
                    value: "2018-03-18",
                    qualifier: "dcterms:dateInvalid",
                },
            ]
            expect(() => converter(input)).to
                .throw("Error in metadata: no such date qualifier: 'dcterms:dateInvalid'")
        })

        it("should fail when multiple dateCreated fields are given", () => {
            const input = [
                {
                    scheme: "dcterms:W3CDTF",
                    value: "2018-03-18",
                    qualifier: "dcterms:created",
                },
                {
                    scheme: "dcterms:W3CDTF",
                    value: "2018-03-19",
                    qualifier: "dcterms:created",
                },
            ]
            expect(() => converter(input)).to
                .throw("Error in metadata: multiple dates with qualifier 'created' found")
        })

        it("should fail when multiple dateAvailable fields are given", () => {
            const input = [
                {
                    scheme: "dcterms:W3CDTF",
                    value: "2018-03-18",
                    qualifier: "dcterms:available",
                },
                {
                    scheme: "dcterms:W3CDTF",
                    value: "2018-03-19",
                    qualifier: "dcterms:available",
                },
            ]
            expect(() => converter(input)).to
                .throw("Error in metadata: multiple dates with qualifier 'available' found")
        })

        it("should fail when the date is not properly formatted", () => {
            const input = [
                {
                    scheme: "dcterms:W3CDTF",
                    value: "20180318",
                    qualifier: "dcterms:available",
                },
            ]
            expect(() => converter(input)).to
                .throw("Error in metadata: invalid date found: '20180318'")
        })
    })

    describe("qualifiedDateDeconverter", () => {

        it("should convert a QualifiedDate into the correct external model", () => {
            const input: QualifiedDate<Date> = {
                qualifier: "dcterms:issued",
                // month 2 == March
                value: new Date(new Date(2018, 2, 14).toUTCString()),
            }
            const result = qualifiedDateDeconverter(dateChoices)(input)
            expect(Object.keys(result)).to.eql(["qualifier", "scheme", "value"])
            expect(result.qualifier).to.eql("dcterms:issued")
            expect(result.scheme).to.eql("dcterms:W3CDTF")
            expect(result.value).to.match(/^2018-03-14T\d{2}:\d{2}:00[-+]\d{2}:\d{2}$/) // don't just match against the String, because of time zone issues
        })

        it("should convert a QualifiedDate with only a qualifier into the correct external model", () => {
            const input: QualifiedDate<Date> = {
                qualifier: "dcterms:issued",
            }
            const expected = {
                qualifier: "dcterms:issued",
                scheme: "dcterms:W3CDTF",
                value: "",
            }
            expect(qualifiedDateDeconverter(dateChoices)(input)).to.eql(expected)
        })

        it("should convert a QualifiedDate without a value into an empty object", () => {
            const input: QualifiedDate<Date> = {
                qualifier: "dcterms:date",
            }
            const expected = {}
            expect(qualifiedDateDeconverter(dateChoices)(input)).to.eql(expected)
        })

        it("should convert a QualifiedDate with empty fields into an empty object", () => {
            const input: QualifiedDate<Date> = {
                qualifier: "",
            }
            const expected = {}
            expect(qualifiedDateDeconverter(dateChoices)(input)).to.eql(expected)
        })
    })

    describe("qualifiedDateStringDeconverter", () => {

        it("should convert a QualifiedDate with string value into the correct external model", () => {
            const input: QualifiedDate<string> = {
                qualifier: "dcterms:issued",
                value: "today",
            }
            const expected = {
                value: "today",
                qualifier: "dcterms:issued",
            }
            expect(qualifiedDateStringDeconverter(dateChoices)(input)).to.eql(expected)
        })

        it("should convert a QualifiedDate with only a qualifier into the correct external model", () => {
            const input: QualifiedDate<string> = {
                qualifier: "dcterms:issued",
            }
            const expected = {
                qualifier: "dcterms:issued",
            }
            expect(qualifiedDateStringDeconverter(dateChoices)(input)).to.eql(expected)
        })

        it("should convert a QualifiedDate without a value into an empty object", () => {
            const input: QualifiedDate<string> = {
                qualifier: "dcterms:date",
            }
            const expected = {}
            expect(qualifiedDateStringDeconverter(dateChoices)(input)).to.eql(expected)
        })

        it("should convert a QualifiedDate with empty fields into an empty object", () => {
            const input: QualifiedDate<string> = {
                qualifier: "",
            }
            const expected = {}
            expect(qualifiedDateStringDeconverter(dateChoices)(input)).to.eql(expected)
        })
    })
})
