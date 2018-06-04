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
import "mocha"
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
            expect(accessRightConverter(input)).to.deep.equal(expected)
        })

        it("should fail when given an open-access with a group", () => {
            const input = {
                category: "OPEN_ACCESS",
                group: "an unexpected group",
            }
            expect(() => accessRightConverter(input)).to
                .throw("Error in metadata: access right is not GROUP_ACCESS but has a 'group' defined")
        })

        it("should convert a valid group-access", () => {
            const input = {
                category: "GROUP_ACCESS",
                group: "my-group",
            }
            const expected = {
                category: "GROUP_ACCESS",
                group: "my-group",
            }
            expect(accessRightConverter(input)).to.deep.equal(expected)
        })

        it("should fail when given a group-access without a group", () => {
            const input = {
                category: "GROUP_ACCESS",
                // no group here
            }
            expect(() => accessRightConverter(input)).to
                .throw("Error in metadata: access right GROUP_ACCESS has no 'group' defined")
        })

        it("should fail when no category is given", () => {
            const input = {
                // no category here
                group: "my-group",
            }
            expect(() => accessRightConverter(input)).to
                .throw("Error in metadata: no such access category: 'undefined'")
        })

        it("should fail when an unknown category is given", () => {
            const input = {
                category: "unknown-category",
                group: "my-group",
            }
            expect(() => accessRightConverter(input)).to
                .throw("Error in metadata: no such access category: 'unknown-category'")
        })

        it("should fail when an empty object is given", () => {
            const input = {
                // no category here
                // no group here
            }
            expect(() => accessRightConverter(input)).to
                .throw("Error in metadata: no such access category: 'undefined'")
        })
    })

    describe("accessRightDeconverter", () => {

        it("should convert an empty AccessRight to an empty output", () => {
            expect(accessRightDeconverter({})).to.deep.equal({})
        })

        it("should convert an AccessRight with only a category into the correct external model", () => {
            expect(accessRightDeconverter({ category: AccessRightValue.OPEN_ACCESS })).to.deep
                .equal({ category: "OPEN_ACCESS" })
        })

        it("should convert an AccessRight with both a category and group into the correct external model", () => {
            expect(accessRightDeconverter({ category: AccessRightValue.OPEN_ACCESS, group: "my-group" })).to.deep
                .equal({ category: "OPEN_ACCESS", group: "my-group" })
        })
    })
})
