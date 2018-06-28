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
    languageOfDescriptionConverter,
    languageOfDescriptionDeconverter,
    languageOfFilesDeconverter,
    languageOfFilesIsoDeconverter,
    languagesOfFilesConverter,
} from "../../../../main/typescript/lib/metadata/Language"
import { DropdownListEntry } from "../../../../main/typescript/model/DropdownLists"

describe("Language", () => {

    const languages: DropdownListEntry[] = [
        {
            key: "nld",
            value: "Dutch",
            displayValue: "Dutch",
        },
        {
            key: "deu",
            value: "German",
            displayValue: "German",
        },
    ]

    describe("languageOfDescriptionConverter", () => {

        it("should convert a valid description language object and extract the language", () => {
            const input = {
                scheme: "dcterms:ISO639-2",
                key: "nld",
                value: "Dutch",
            }
            const expected = "nld"
            expect(languageOfDescriptionConverter(languages)(input)).to.eql(expected)
        })

        it("should fail when an invalid language is given", () => {
            const input = {
                scheme: "dcterms:ISO639-2",
                key: "eng", // in principle valid, but doesn't appear in the listing above
                value: "English",
            }
            expect(() => languageOfDescriptionConverter(languages)(input)).to
                .throw("Error in metadata: no such language of description found: 'eng'")
        })

        it("should fail when the description language object has no scheme", () => {
            const input = {
                // no scheme
                key: "nld",
                value: "Dutch",
            }
            expect(() => languageOfDescriptionConverter(languages)(input)).to
                .throw("Error in metadata: no such language scheme: 'undefined'")
        })

        it("should fail when the description language object as an invalid scheme", () => {
            const input = {
                scheme: "dcterms:invalid",
                key: "nld",
                value: "Dutch",
            }
            expect(() => languageOfDescriptionConverter(languages)(input)).to
                .throw("Error in metadata: no such language scheme: 'dcterms:invalid'")
        })
    })

    describe("languageOfDescriptionDeconverter", () => {

        it("should convert a description language to the correct external model", () => {
            const input = "nld"
            const expected = {
                scheme: "dcterms:ISO639-2",
                key: "nld",
                value: "Dutch",
            }
            expect(languageOfDescriptionDeconverter(languages)(input)).to.eql(expected)
        })

        it("should fail when an unknown language is given", () => {
            const input = "eng" // in principle valid, but doesn't appear in the listing above
            expect(() => languageOfDescriptionDeconverter(languages)(input)).to
                .throw("Error in metadata: no valid language of description found for key 'eng'")
        })
    })

    describe("languagesOfFilesConverter", () => {

        it("should convert a valid sequence of file languages and split them correctly", () => {
            const input = [
                {
                    scheme: "dcterms:ISO639-2",
                    key: "deu",
                    value: "German",
                },
                {
                    scheme: "dcterms:ISO639-2",
                    key: "nld",
                    value: "Dutch",
                },
                {
                    value: "Flakkees",
                },
                {
                    value: "Goerees",
                },
            ]
            const expected = [
                ["deu", "nld"],
                ["Flakkees", "Goerees"],
            ]
            expect(languagesOfFilesConverter(languages)(input)).to.eql(expected)
        })

        it("should fail when an unknown language is encountered containing an ISO tag", () => {
            const input = [
                { // in principle valid, but doesn't appear in the listing above
                    scheme: "dcterms:ISO639-2",
                    key: "eng",
                    value: "English",
                },
            ]
            expect(() => languagesOfFilesConverter(languages)(input)).to
                .throw("Error in metadata: no such language of files found: 'eng'")
        })

        it("should fail when a file language is not properly formatted", () => {
            const input = [
                {
                    invalid: "Foobar",
                },
            ]
            expect(() => languagesOfFilesConverter(languages)(input)).to
                .throw("Error in metadata: unrecognized language of files object: {\"invalid\":\"Foobar\"}")
        })
    })

    describe("languageOfFilesIsoDeconverter", () => {

        it("should convert a iso file language to the correct external model", () => {
            const input = "deu"
            const expected = {
                scheme: "dcterms:ISO639-2",
                key: "deu",
                value: "German",
            }
            expect(languageOfFilesIsoDeconverter(languages)(input)).to.eql(expected)
        })

        it("should fail when the given language is not in the dropdown list", () => {
            const input = "eng" // in principle valid, but doesn't appear in the listing above
            expect(() => languageOfFilesIsoDeconverter(languages)(input)).to
                .throw("Error in metadata: no valid language of files found for key 'eng'")
        })

        it("should return an empty object when given an empty string", () => {
            const input = ""
            const expected = {}
            expect(languageOfFilesIsoDeconverter(languages)(input)).to.eql(expected)
        })
    })

    describe("languageOfFilesDeconverter", () => {

        it("should convert a file language to the correct external model", () => {
            const input = "Flakkees"
            const expected = {
                value: "Flakkees",
            }
            expect(languageOfFilesDeconverter(input)).to.eql(expected)
        })

        it("should return an empty object when given an empty string", () => {
            const input = ""
            const expected = {}
            expect(languageOfFilesDeconverter(input)).to.eql(expected)
        })
    })
})
