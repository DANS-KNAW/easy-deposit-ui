import { expect } from "chai"
import "mocha"
import {
    Contributor,
    contributorConverter, contributorDeconverter,
    contributorsConverter,
} from "../../../../main/typescript/lib/metadata/Contributor"

describe("Contributor", () => {

    describe("contributorConverter", () => {

        it("should convert a valid contributor", () => {
            const input = {
                titles: "Drs.",
                initials: "D.A.",
                insertions: "",
                surname: "NS",
                ids: [
                    {
                        scheme: "id-type:DAI",
                        value: "123456",
                    },
                    {
                        scheme: "id-type:ORCID",
                        value: "abcdef",
                    },
                ],
                role: {
                    scheme: "datacite:contributorType",
                    key: "ContactPerson",
                    value: "Contact Person",
                },
                organization: "KNAW",
            }
            const expected: Contributor = {
                titles: "Drs.",
                initials: "D.A.",
                insertions: "",
                surname: "NS",
                ids: [
                    {
                        scheme: "id-type:DAI",
                        value: "123456",
                    },
                    {
                        scheme: "id-type:ORCID",
                        value: "abcdef",
                    },
                ],
                role: "ContactPerson",
                organization: "KNAW",
            }
            expect(contributorConverter(input)).to.deep.equal(expected)
        })

        it("should convert an empty input to an internal representation with empty strings", () => {
            const input = {}
            const expected: Contributor = {
                titles: "",
                initials: "",
                insertions: "",
                surname: "",
                ids: [{ scheme: "", value: "" }],
                role: "",
                organization: "",
            }
            expect(contributorConverter(input)).to.deep.equal(expected)
        })

        it("should fail when using an invalid contributor schemeId", () => {
            const input = {
                ids: [
                    {
                        scheme: "id-type:invalid",
                        value: "123456",
                    },
                ],
            }
            expect(() => contributorConverter(input)).to
                .throw("Error in metadata: no such creator/contributor scheme: 'id-type:invalid'")
        })

        it("should fail when using an invalid contributor role scheme", () => {
            const input = {
                role: {
                    scheme: "datacite:invalid",
                    key: "ContactPerson",
                    value: "Contact Person",
                },
            }
            expect(() => contributorConverter(input)).to
                .throw("Error in metadata: no such creator/contributor role scheme: 'datacite:invalid'")
        })
    })

    describe("contributorsConverter", () => {

        it("should convert and partition valid contributors", () => {
            const input1 = {
                titles: "Drs.",
                initials: "D.A.",
                insertions: "",
                surname: "NS",
                ids: [
                    {
                        scheme: "id-type:DAI",
                        value: "123456",
                    },
                    {
                        scheme: "id-type:ORCID",
                        value: "abcdef",
                    },
                ],
                role: {
                    scheme: "datacite:contributorType",
                    key: "ContactPerson",
                    value: "Contact Person",
                },
                organization: "KNAW",
            }
            const input2 = {
                organization: "rightsHolder1",
                role: {
                    scheme: "datacite:contributorType",
                    key: "RightsHolder",
                    value: "rightsholder",
                },
            }
            const expected1: Contributor = {
                titles: "Drs.",
                initials: "D.A.",
                insertions: "",
                surname: "NS",
                ids: [
                    {
                        scheme: "id-type:DAI",
                        value: "123456",
                    },
                    {
                        scheme: "id-type:ORCID",
                        value: "abcdef",
                    },
                ],
                role: "ContactPerson",
                organization: "KNAW",
            }
            const expected2: Contributor = {
                titles: "",
                initials: "",
                insertions: "",
                surname: "",
                ids: [{ scheme: "", value: "" }],
                role: "RightsHolder",
                organization: "rightsHolder1",
            }
            expect(contributorsConverter([input1, input2])).to.deep.equal([[expected2], [expected1]])
        })
    })

    describe("contributorDeconverter", () => {

        it("should convert an empty Contributor to an empty object", () => {
            const input: Contributor = {
                titles: "",
                initials: "",
                insertions: "",
                surname: "",
                ids: [{ scheme: "", value: "" }],
                role: "",
                organization: "",
            }
            const expected = {}
            expect(contributorDeconverter(input)).to.deep.equal(expected)
        })

        it("should convert a Contributor into the correct external model", () => {
            const input: Contributor = {
                titles: "Drs.",
                initials: "D.A.",
                insertions: "van",
                surname: "NS",
                ids: [
                    {
                        scheme: "id-type:DAI",
                        value: "123456",
                    },
                    {
                        scheme: "id-type:ORCID",
                        value: "abcdef",
                    },
                ],
                role: "ContactPerson",
                organization: "KNAW",
            }
            const expected = {
                titles: "Drs.",
                initials: "D.A.",
                insertions: "van",
                surname: "NS",
                ids: [
                    {
                        scheme: "id-type:DAI",
                        value: "123456",
                    },
                    {
                        scheme: "id-type:ORCID",
                        value: "abcdef",
                    },
                ],
                role: {
                    scheme: "datacite:contributorType",
                    key: "ContactPerson",
                    value: "???",
                },
                organization: "KNAW",
            }
            expect(contributorDeconverter(input)).to.deep.equal(expected)
        })
    })
})
