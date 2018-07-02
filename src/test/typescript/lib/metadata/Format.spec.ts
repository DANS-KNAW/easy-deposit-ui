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
import {
    cmdiFormatDeconverter,
    formatDeconverter,
    formatsConverter,
    imtFormatDeconverter,
} from "../../../../main/typescript/lib/metadata/Format"

describe("Format", () => {

    describe("formatsConverter", () => {

        const imtFormats: DropdownListEntry[] = [
            {
                key: "text/plain",
                value: "text/plain",
                displayValue: "text/plain",
            },
            {
                key: "image/tiff",
                value: "image/tiff",
                displayValue: "image/tiff",
            },
        ]

        it("should convert a valid sequence of formats and split them correctly", () => {
            const input = [
                {
                    scheme: "dcterms:IMT",
                    value: "text/plain",
                },
                {
                    scheme: "dcterms:IMT",
                    value: "image/tiff",
                },
                {
                    value: "paperback",
                },
                {
                    value: "audiobook",
                },
                {
                    scheme: "dcterms:IMT",
                    value: "application/x-cmdi+xml",
                },
            ]
            const expected = [
                ["text/plain", "image/tiff"],
                ["paperback", "audiobook"],
                true,
            ]
            expect(formatsConverter(imtFormats)(input)).to.eql(expected)
        })

        it("should convert and merge multiple instances of cmdi formats", () => {
            const input = [
                {
                    scheme: "dcterms:IMT",
                    value: "application/x-cmdi+xml",
                },
                {
                    scheme: "dcterms:IMT",
                    value: "application/x-cmdi+xml",
                },
                {
                    scheme: "dcterms:IMT",
                    value: "application/x-cmdi+xml",
                },
            ]
            const expected = [
                [],
                [],
                true,
            ]
            expect(formatsConverter(imtFormats)(input)).to.eql(expected)
        })

        it("should fail when an invalid mediatype in combination with the dcterms:IMT scheme is used", () => {
            const input = [
                {
                    scheme: "dcterms:IMT",
                    value: "text/invalid",
                },
            ]
            expect(() => formatsConverter(imtFormats)(input)).to
                .throw("Error in metadata: invalid internet media type: 'text/invalid'")
        })

        it("should fail when the object isn't recognized", () => {
            const input = [
                {
                    scheme: "dcterms:invalid-scheme",
                    value: "text/invalid",
                    other: "some other field",
                },
            ]
            expect(() => formatsConverter(imtFormats)(input)).to
                .throw("Error in metadata: unrecognized object: {\"scheme\":\"dcterms:invalid-scheme\",\"value\":\"text/invalid\",\"other\":\"some other field\"}")
        })
    })

    describe("imtFormatDeconverter", () => {

        it("should convert an ImtFormat into the correct external model", () => {
            const input = "text/plain"
            const expected = {
                scheme: "dcterms:IMT",
                value: "text/plain",
            }
            expect(imtFormatDeconverter(input)).to.eql(expected)
        })

        it("should return an empty object if an empty string was given", () => {
            expect(imtFormatDeconverter("")).to.eql({})
        })
    })

    describe("formatDeconverter", () => {

        it("should convert a Format into the correct external model", () => {
            const input = "book"
            const expected = {
                value: "book",
            }
            expect(formatDeconverter(input)).to.eql(expected)
        })

        it("should return an empty object if an empty string was given", () => {
            expect(formatDeconverter("")).to.eql({})
        })
    })

    describe("cmdiFormatDeconverter", () => {

        it("should convert a Format into the correct external model", () => {
            const expected = {
                scheme: "dcterms:IMT",
                value: "application/x-cmdi+xml",
            }
            expect(cmdiFormatDeconverter()).to.eql(expected)
        })
    })
})
