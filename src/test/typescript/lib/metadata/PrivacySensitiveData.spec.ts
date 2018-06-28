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
            const output = PrivacySensitiveDataValue.YES
            expect(privacySensitiveDataConverter(input)).to.eql(output)
        })

        it("should fail when the input is invalid", () => {
            const input = "invalid"
            expect(() => privacySensitiveDataConverter(input)).to
                .throw("Error in metadata: no such privacy sensitive data value: 'invalid'")
        })
    })

    describe("privacySensitiveDataDeconverter", () => {

        it("should deconvert a PrivacySensitiveDataValue.YES to string 'yes'", () => {
            const input = PrivacySensitiveDataValue.YES
            const output = "yes"
            expect(privacySensitiveDataDeconverter(input)).to.eql(output)
        })

        it("should deconvert a PrivacySensitiveDataValue.UNSPECIFIED to 'undefined'", () => {
            const input = PrivacySensitiveDataValue.UNSPECIFIED
            const output = undefined
            expect(privacySensitiveDataDeconverter(input)).to.eql(output)
        })
    })
})
