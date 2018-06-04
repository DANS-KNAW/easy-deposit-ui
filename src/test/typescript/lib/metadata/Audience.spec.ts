import { expect } from "chai"
import "mocha"
import {
    audienceConverter,
    audienceDeconverter,
} from "../../../../main/typescript/lib/metadata/Audience"
import { DropdownListEntry } from "../../../../main/typescript/model/DropdownLists"

describe("Audience", () => {

    const audienceChoices: DropdownListEntry[] = [
        {
            key: "D35200",
            value: "Musicology",
            displayValue: "------ Musicology",
        },
        {
            key: "D33000",
            value: "Theology and religious studies",
            displayValue: "--- Theology and religious studies",
        },
    ]

    const converter = audienceConverter(audienceChoices)
    const deconverter = audienceDeconverter(audienceChoices)

    describe("audienceConverter", () => {

        it("should convert a valid audience", () => {
            const input = {
                scheme: "narcis:DisciplineType",
                key: "D35200",
                value: "Musicology",
            }
            const expected = "D35200"
            expect(converter(input)).to.deep.equal(expected)
        })

        it("should fail when no scheme is defined", () => {
            const input = {
                // no scheme
                key: "D35200",
                value: "Musicology",
            }
            expect(() => converter(input)).to
                .throw("Error in metadata: no such audience scheme: 'undefined'")
        })

        it("should fail when an invalid scheme is used", () => {
            const input = {
                scheme: "invalid-scheme",
                key: "D35200",
                value: "Musicology",
            }
            expect(() => converter(input)).to
                .throw("Error in metadata: no such audience scheme: 'invalid-scheme'")
        })

        it("should fail when no audience key is defined", () => {
            const input = {
                scheme: "narcis:DisciplineType",
                // no key
                value: "Musicology",
            }
            expect(() => converter(input)).to
                .throw("Error in metadata: no such audience found: 'undefined'")
        })

        it("should fail when an unknown audience key is used", () => {
            const input = {
                scheme: "narcis:DisciplineType",
                key: "D35200x",
                value: "Musicology",
            }
            expect(() => converter(input)).to
                .throw("Error in metadata: no such audience found: 'D35200x'")
        })
    })

    describe("audienceDeconverter", () => {

        it("should convert a known Audience into the correct external model", () => {
            expect(deconverter("D33000")).to.deep
                .equal({ scheme: "narcis:DisciplineType", key: "D33000", value: "Theology and religious studies" })
        })

        it("should fail when converting an unknown Audience", () => {
            expect(() => deconverter("D33000x")).to
                .throw("Error in metadata: no valid audience found for key 'D33000x'")
        })
    })
})
