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
import { clean, isEmptyString, nonEmptyObject, normalizeEmpty } from "../../../../main/typescript/lib/metadata/misc"

describe("misc", () => {

    describe("normalizeEmpty", () => {

        it("should return the input when the array is not empty", () => {
            const input = [1, 2, 3, 4, 5]
            expect(normalizeEmpty(input, () => 1)).to.eql(input)
        })

        it("should return the empty default when the array is empty", () => {
            const input: number[] | undefined = []
            const expected = [1]
            expect(normalizeEmpty(input, () => 1)).to.eql(expected)
        })

        it("should return the empty default when the array is undefined", () => {
            const input: number[] | undefined = undefined
            const expected = [1]
            expect(normalizeEmpty(input, () => 1)).to.eql(expected)
        })
    })

    describe("clean", () => {

        it("should remove a field from an object when its value is an empty string", () => {
            const input = {
                foo: "fooValue",
                bar: "",
            }
            const expected = {
                foo: "fooValue"
            }
            expect(clean(input)).to.eql(expected)
        })

        it("should remove a field from an object when its value is 0", () => {
            const input = {
                foo: "fooValue",
                bar: 0,
            }
            const expected = {
                foo: "fooValue"
            }
            expect(clean(input)).to.eql(expected)
        })

        it("should remove a field from an object when its value is an empty object", () => {
            const input = {
                foo: "fooValue",
                bar: {},
            }
            const expected = {
                foo: "fooValue"
            }
            expect(clean(input)).to.eql(expected)
        })

        it("should remove a field from an object when its value is an empty array", () => {
            const input = {
                foo: "fooValue",
                bar: [],
            }
            const expected = {
                foo: "fooValue"
            }
            expect(clean(input)).to.eql(expected)
        })
    })

    describe("nonEmptyObject", () => {

        it("should return true when an object is not empty", () => {
            const input = { foo: "fooValue" }
            expect(nonEmptyObject(input)).to.eql(true)
        })

        it("should return false when an object is empty", () => {
            const input = {}
            expect(nonEmptyObject(input)).to.eql(false)
        })

        it("should return false when an object is undefined", () => {
            const input: { foo: string } | undefined = undefined
            expect(nonEmptyObject(input)).to.eql(false)
        })
    })

    describe("isEmptyString", () => {

        it("should return true when a string is empty", () => {
            expect(isEmptyString("")).to.eql(true)
        })

        it("should return false when a string is not empty", () => {
            expect(isEmptyString("foobar")).to.eql(false)
        })
    })
})
