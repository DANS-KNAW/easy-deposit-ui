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
import {
    qualifiedSchemedValueConverter,
    qualifiedSchemedValueDeconverter,
    schemedValueConverter,
    schemedValueDeconverter,
} from "../../../../main/typescript/lib/metadata/Value"

describe("Value", () => {

    describe("schemedValueConverter", () => {

        it("should convert a schemed value", () => {
            const scheme = "my-scheme"
            const value = "my-value"
            const expected = {
                scheme: "my-scheme",
                value: "my-value",
            }
            expect(schemedValueConverter(scheme, value)).to.eql(expected)
        })
    })

    describe("schemedValueDeconverter", () => {

        it("should convert a schemed value", () => {
            const input = {
                scheme: "my-scheme",
                value: "my-value",
            }
            const expected = {
                scheme: "my-scheme",
                value: "my-value",
            }
            expect(schemedValueDeconverter(input)).to.eql(expected)
        })

        it("should return an empty object when both scheme and value are empty", () => {
            const input = {
                scheme: "",
                value: "",
            }
            const expected = {}
            expect(schemedValueDeconverter(input)).to.eql(expected)
        })
    })

    describe("qualifiedSchemedValueConverter", () => {

        it("should convert a qualified schemed value", () => {
            const qualifier = "my-qualifier"
            const scheme = "my-scheme"
            const value = "my-value"
            const expected = {
                qualifier: "my-qualifier",
                scheme: "my-scheme",
                value: "my-value",
            }
            expect(qualifiedSchemedValueConverter(qualifier, scheme, value)).to.eql(expected)
        })
    })

    describe("qualifiedSchemedValueDeconverter", () => {

        it("should convert a qualified schemed value", () => {
            const input = {
                qualifier: "my-qualifier",
                scheme: "my-scheme",
                value: "my-value",
            }
            const expected = {
                qualifier: "my-qualifier",
                scheme: "my-scheme",
                value: "my-value",
            }
            expect(qualifiedSchemedValueDeconverter(input)).to.eql(expected)
        })

        it("should return an empty object when both qualifier, scheme and value are empty", () => {
            const input = {
                qualifier: "",
                scheme: "",
                value: "",
            }
            const expected = {}
            expect(qualifiedSchemedValueDeconverter(input)).to.eql(expected)
        })
    })
})
