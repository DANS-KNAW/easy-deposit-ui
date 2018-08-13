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
