import { expect } from "chai"
import { describe, it, xit } from "mocha"
import { DropdownListEntry } from "../../../../main/typescript/model/DropdownLists"
import { dcmiTypeDeconverter, typeDeconverter, typesConverter } from "../../../../main/typescript/lib/metadata/Type"

describe("Type", () => {

    const dcmiTypes: DropdownListEntry[] = [
        {
            key: "Software",
            value: "Software",
            displayValue: "Software",
        },
        {
            key: "Dataset",
            value: "Dataset",
            displayValue: "Dataset",
        },
    ]

    describe("typesConverter", () => {

        it("should convert a valid sequence of Types of both dcmi and non-dcmi types", () => {
            const input = [
                {
                    scheme: "dcterms:DCMIType",
                    value: "Dataset",
                },
                {
                    scheme: "dcterms:DCMIType",
                    value: "Software",
                },
                {
                    value: "drawings",
                },
                {
                    value: "paintings",
                },
            ]
            const expected = [
                [
                    "Dataset",
                    "Software",
                ],
                [
                    "drawings",
                    "paintings",
                ],
            ]
            expect(typesConverter(dcmiTypes)(input)).to.eql(expected)
        })

        it("should fail when an invalid scheme is provided", () => {
            const input = [
                {
                    scheme: "dcterms:DCMIType",
                    value: "Invalid",
                },
            ]
            expect(() => typesConverter(dcmiTypes)(input)).to
                .throw("Error in metadata: no such DCMI type found: 'Invalid'")
        })

        it("should fail when an invalid key is given for the dcmi type", () => {
            const input = [
                {
                    scheme: "dcterms:invalid",
                    value: "Dataset",
                },
            ]
            expect(() => typesConverter(dcmiTypes)(input)).to
                .throw("Error in metadata: unrecognized object: {\"scheme\":\"dcterms:invalid\",\"value\":\"Dataset\"}")
        })
    })

    describe("dcmiTypeDeconverter", () => {

        it("should convert a dcmi type", () => {
            const input = "Dataset"
            const expected = {
                scheme: "dcterms:DCMIType",
                value: "Dataset",
            }
            expect(dcmiTypeDeconverter(input)).to.eql(expected)
        })

        it("should return an empty object when type is empty", () => {
            const input = ""
            const expected = {}
            expect(dcmiTypeDeconverter(input)).to.eql(expected)
        })
    })

    describe("typeDeconverter", () => {

        it("should convert a type", () => {
            const input = "Dataset"
            const expected = {
                value: "Dataset",
            }
            expect(typeDeconverter(input)).to.eql(expected)
        })

        it("should return an empty object when type is empty", () => {
            const input = ""
            const expected = {}
            expect(typeDeconverter(input)).to.eql(expected)
        })
    })
})
