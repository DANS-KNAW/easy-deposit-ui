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
    accessRightConverter,
    accessRightDeconverter,
    AccessRightValue,
} from "../../../../main/typescript/lib/metadata/AccessRight"

describe("AccessRight", () => {

    describe("accessRightConverter", () => {

        it("should convert a valid open-access", () => {
            const input = {
                category: "OPEN_ACCESS",
            }
            const expected = {
                category: "OPEN_ACCESS",
            }
            expect(accessRightConverter(input)).to.eql(expected)
        })

        it("should fail when an unknown category is given", () => {
            const input = {
                category: "unknown-category",
            }
            expect(() => accessRightConverter(input)).to
                .throw("Error in metadata: no such access category: 'unknown-category'")
        })

        it("should fail when an empty object is given", () => {
            const input = {
                // no category here
            }
            expect(() => accessRightConverter(input)).to
                .throw("Error in metadata: no such access category: 'undefined'")
        })
    })

    describe("accessRightDeconverter", () => {

        it("should convert an empty AccessRight to an empty output", () => {
            expect(accessRightDeconverter({})).to.eql({})
        })

        it("should convert an AccessRight with only a category into the correct external model", () => {
            expect(accessRightDeconverter({ category: AccessRightValue.OPEN_ACCESS })).to
                .eql({ category: "OPEN_ACCESS" })
        })
    })
})
