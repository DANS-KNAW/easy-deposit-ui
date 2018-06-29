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
    privacySensitiveDataConverter, privacySensitiveDataDeconverter,
    PrivacySensitiveDataValue,
} from "../../../../main/typescript/lib/metadata/PrivacySensitiveData"

describe("PrivacySensitiveData", () => {

    describe("privacySensitiveDataConverter", () => {

        it("should convert a valid value into a PrivacySensitiveData enum value", () => {
            const input = "yes"
            const expected = PrivacySensitiveDataValue.YES
            expect(privacySensitiveDataConverter(input)).to.eql(expected)
        })

        it("should fail when the input is invalid", () => {
            const input = "invalid"
            expect(() => privacySensitiveDataConverter(input)).to
                .throw("Error in metadata: no such privacy sensitive data value: 'invalid'")
        })
    })

    describe("privacySensitiveDataDeconverter", () => {

        it("should convert a PrivacySensitiveDataValue.YES to string 'yes'", () => {
            const input = PrivacySensitiveDataValue.YES
            const expected = "yes"
            expect(privacySensitiveDataDeconverter(input)).to.eql(expected)
        })

        it("should convert a PrivacySensitiveDataValue.UNSPECIFIED to 'undefined'", () => {
            const input = PrivacySensitiveDataValue.UNSPECIFIED
            const expected = undefined
            expect(privacySensitiveDataDeconverter(input)).to.eql(expected)
        })
    })
})
