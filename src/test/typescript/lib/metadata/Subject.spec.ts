import { expect } from "chai"
import { describe, it, xit } from "mocha"
import { DropdownListEntry } from "../../../../main/typescript/model/DropdownLists"
import {
    subjectAbrDeconverter,
    subjectConverter,
    subjectDeconverter,
} from "../../../../main/typescript/lib/metadata/Subject"

describe("Subject", () => {

    const abrComplexSubjects: DropdownListEntry[] = [
        {
            key: "VK",
            value: "Versterking - Kasteel",
            displayValue: "Versterking - Kasteel",
        },
        {
            key: "RKER",
            value: "Religie - Kerk",
            displayValue: "Religie - Kerk",
        },
    ]

    describe("subjectConverter", () => {

        it("should convert a valid sequence of subjects", () => {
            const input = [
                {
                    value: "subject1",
                },
                {
                    value: "subject2",
                },
                {
                    scheme: "abr:ABRcomplex",
                    key: "RKER",
                    value: "Religie - Kerk",
                },
                {
                    scheme: "abr:ABRcomplex",
                    key: "VK",
                    value: "Versterking - Kasteel",
                },
            ]
            const expected = [
                [
                    "subject1",
                    "subject2",
                ],
                [
                    "RKER",
                    "VK"
                ]
            ]
            expect(subjectConverter(abrComplexSubjects)(input)).to.eql(expected)
        })

        it("should fail when the key for an abr subject does not match", () => {
            const input = [
                {
                    scheme: "abr:ABRcomplex",
                    key: "invalid-key",
                    value: "invalid-value",
                },
            ]
            expect(() => subjectConverter(abrComplexSubjects)(input)).to
                .throw("Error in metadata: no such ABR complex subject found: 'invalid-key'")
        })

        it("should fail when the scheme for an abr subject does not match", () => {
            const input = [
                {
                    scheme: "abr:invalid",
                    key: "RKER",
                    value: "Religie - Kerk",
                },
            ]
            expect(() => subjectConverter(abrComplexSubjects)(input)).to
                .throw("Error in metadata: unrecognized subject: {\"scheme\":\"abr:invalid\",\"key\":\"RKER\",\"value\":\"Religie - Kerk\"}")
        })
    })

    describe("subjectDeconverter", () => {

        it("should convert a subject", () => {
            const input: string = "some-subject"
            const expected = {
                value: "some-subject",
            }
            expect(subjectDeconverter(input)).to.eql(expected)
        })

        it("should return an empty object when the subject is empty", () => {
            const input: string = ""
            const expected = {}
            expect(subjectDeconverter(input)).to.eql(expected)
        })
    })

    describe("subjectAbrDeconverter", () => {

        it("should convert an abr subject", () => {
            const input = "RKER"
            const expected = {
                scheme: "abr:ABRcomplex",
                key: "RKER",
                value: "Religie - Kerk",
            }
            expect(subjectAbrDeconverter(abrComplexSubjects)(input)).to.eql(expected)
        })

        it("should fail when the abr subject does not match the allowed abr keys", () => {
            const input = "invalid-key"
            expect(() => subjectAbrDeconverter(abrComplexSubjects)(input)).to
                .throw("Error in metadata: no valid ABR complex subject found for key 'invalid-key'")
        })

        it("should return an empty object when abr subject is empty", () => {
            const input: string = ""
            const expected = {}
            expect(subjectAbrDeconverter(abrComplexSubjects)(input)).to.eql(expected)
        })
    })
})
