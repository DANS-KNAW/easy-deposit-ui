import { expect } from "chai"
import { describe, it } from "mocha"
import { DropdownListEntry } from "../../../../main/typescript/model/DropdownLists"
import {
    abrTemporalCoverageDeconverter,
    temporalCoverageDeconverter,
    temporalCoveragesConverter,
} from "../../../../main/typescript/lib/metadata/TemporalCoverage"

describe("TemporalCoverage", () => {

    const abrPeriodeTemporals: DropdownListEntry[] = [
        {
            key: "ROMLA",
            value: "Romeinse tijd laat A: 270 - 350 nC",
            displayValue: "Romeinse tijd laat A: 270 - 350 nC",
        },
        {
            key: "ROMLB",
            value: "Romeinse tijd laat B: 350 - 450 nC",
            displayValue: "Romeinse tijd laat B: 350 - 450 nC",
        },
    ]

    describe("temporalCoveragesConverter", () => {

        it("should convert a valid sequence of TemporalCoverages of both abr and non-abr coverages", () => {
            const input = [
                {
                    scheme: "abr:ABRperiode",
                    key: "ROMLA",
                    value: "Romeinse tijd laat A: 270 - 350 nC",
                },
                {
                    scheme: "abr:ABRperiode",
                    key: "ROMLB",
                    value: "Romeinse tijd laat B: 350 - 450 nC",
                },
                {
                    value: "temp1",
                },
                {
                    value: "temp2",
                },
            ]
            const expected = [
                ["ROMLA", "ROMLB"],
                ["temp1", "temp2"],
            ]
            expect(temporalCoveragesConverter(abrPeriodeTemporals)(input)).to.eql(expected)
        })

        it("should fail when an invalid scheme is provided", () => {
            const input = [
                {
                    scheme: "abr:invalid",
                    key: "ROMLA",
                    value: "Romeinse tijd laat A: 270 - 350 nC",
                },
            ]
            expect(() => temporalCoveragesConverter(abrPeriodeTemporals)(input)).to
                .throw("Error in metadata: unrecognized object: {\"scheme\":\"abr:invalid\",\"key\":\"ROMLA\",\"value\":\"Romeinse tijd laat A: 270 - 350 nC\"}")
        })

        it("should fail when an invalid key is given for an abr coverage", () => {
            const input = [
                {
                    scheme: "abr:ABRperiode",
                    key: "invalid-key",
                    value: "invalid-value",
                },
            ]
            expect(() => temporalCoveragesConverter(abrPeriodeTemporals)(input)).to
                .throw("Error in metadata: no such ABR temporal periode found: 'invalid-key'")
        })
    })

    describe("abrTemporalCoverageDeconverter", () => {

        it("should convert a abr temporal coverage", () => {
            const input = "ROMLA"
            const expected = {
                scheme: "abr:ABRperiode",
                key: "ROMLA",
                value: "Romeinse tijd laat A: 270 - 350 nC",
            }
            expect(abrTemporalCoverageDeconverter(abrPeriodeTemporals)(input)).to.eql(expected)
        })

        it("should fail when the coverage does not match the allowed abr values", () => {
            const input = "invalid-key"
            expect(() => abrTemporalCoverageDeconverter(abrPeriodeTemporals)(input)).to
                .throw("Error in metadata: no valid ABR periode temporal found for key 'invalid-key'")
        })

        it("should return an empty object when coverage is empty", () => {
            const input: string = ""
            const expected = {}
            expect(abrTemporalCoverageDeconverter(abrPeriodeTemporals)(input)).to.eql(expected)
        })
    })

    describe("temporalCoverageDeconverter", () => {

        it("should convert a temporal coverage", () => {
            const input: string = "temp1"
            const expected = {
                value: "temp1",
            }
            expect(temporalCoverageDeconverter(input)).to.eql(expected)
        })

        it("should return an empty object when the coverage is empty", () => {
            const input: string = ""
            const expected = {}
            expect(temporalCoverageDeconverter(input)).to.eql(expected)
        })
    })
})
