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
import { configurationConverter } from "../../../../main/typescript/lib/configuration/configuration"
import { Configuration } from "../../../../main/typescript/model/Configuration"

describe("configuration", () => {

    describe("configurationConverter", () => {

        it("should extract the apiUrl from the configuration object", () => {
            const input = { apiUrl: "http://localhost:3004/" }
            const expected: Configuration = { apiUrl: "http://localhost:3004/" }
            expect(configurationConverter(input)).to.eql(expected)

        })

        it("should fail when the apiUrl is not in the configuration object", () => {
            expect(() => configurationConverter({ foo: "bar" })).to
                .throw("configuration did not contain apiUrl")
        })

        it("should fail when the configuration is not an object", () => {
            expect(() => configurationConverter("abc")).to
                .throw("configuration did not contain apiUrl")
        })

        it("should fail when the configuration is undefined", () => {
            expect(() => configurationConverter(undefined)).to
                .throw("configuration did not contain apiUrl")
        })
    })
})
