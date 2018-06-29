import { expect } from "chai"
import { describe, it, xit } from "mocha"
import { DropdownListEntry } from "../../../../main/typescript/model/DropdownLists"
import {
    relatedIdentifierDeconverter,
    relationDeconverter,
    relationsConverter,
} from "../../../../main/typescript/lib/metadata/Relation"

describe("Relation", () => {

    const qualifiers: DropdownListEntry[] = [
        {
            key: "dcterms:relation",
            value: "relation",
            displayValue: "relation",
        },
        {
            key: "dcterms:hasFormat",
            value: "has format",
            displayValue: "has format",
        },
    ]

    const identifiers: DropdownListEntry[] = [
        {
            key: "id-type:ISBN",
            value: "ISBN",
            displayValue: "ISBN",
        },
        {
            key: "id-type:NWO_PROJECTNR",
            value: "NWO project number",
            displayValue: "NWO project number",
        },
    ]

    describe("relationsConverter", () => {

        it("should convert a valid sequence of relations/related identifiers and split them correctly", () => {
            const input = [
                {
                    qualifier: "dcterms:hasFormat",
                    scheme: "id-type:ISBN",
                    value: "2123-34X",
                },
                {
                    qualifier: "dcterms:relation",
                    url: "http://bit.ly/react-deposit-ui",
                    title: "title1",
                },
                {
                    qualifier: "dcterms:hasFormat",
                    title: "title2",
                },
                {
                    qualifier: "dcterms:hasFormat",
                    url: "http://www.google.com",
                },
            ]
            const expected = [
                [
                    {
                        qualifier: "dcterms:hasFormat",
                        scheme: "id-type:ISBN",
                        value: "2123-34X",
                    },
                ],
                [
                    {
                        qualifier: "dcterms:relation",
                        url: "http://bit.ly/react-deposit-ui",
                        title: "title1",
                    },
                    {
                        qualifier: "dcterms:hasFormat",
                        url: undefined,
                        title: "title2",
                    },
                    {
                        qualifier: "dcterms:hasFormat",
                        url: "http://www.google.com",
                        title: undefined,
                    },
                ],
            ]
            expect(relationsConverter(qualifiers, identifiers)(input)).to.eql(expected)
        })

        it("should convert a sequence of partial related identifiers and split them correctly", () => {
            const input = [
                {
                    qualifier: "dcterms:hasFormat",
                    value: "2123-34X",
                },
                {
                    qualifier: "dcterms:hasFormat",
                    scheme: "id-type:ISBN",
                },
                {
                    scheme: "id-type:NWO_PROJECTNR",
                    value: "my-value1",
                },
                {
                    scheme: "id-type:NWO_PROJECTNR",
                },
                {
                    value: "my-value",
                },
            ]
            const expected = [
                [
                    {
                        qualifier: "dcterms:hasFormat",
                        scheme: undefined,
                        value: "2123-34X",
                    },
                    {
                        qualifier: "dcterms:hasFormat",
                        scheme: "id-type:ISBN",
                        value: undefined,
                    },
                    {
                        qualifier: "dcterms:relation",
                        scheme: "id-type:NWO_PROJECTNR",
                        value: "my-value1",
                    },
                    {
                        qualifier: "dcterms:relation",
                        scheme: "id-type:NWO_PROJECTNR",
                        value: undefined,
                    },
                    {
                        qualifier: "dcterms:relation",
                        scheme: undefined,
                        value: "my-value",
                    },
                ],
                [],
            ]
            expect(relationsConverter(qualifiers, identifiers)(input)).to.eql(expected)
        })

        it("should convert a relation with only a title", () => {
            const input = [
                {
                    title: "my-title",
                },
            ]
            const expected = [
                [],
                [
                    {
                        qualifier: "dcterms:relation",
                        url: undefined,
                        title: "my-title",
                    },
                ],
            ]
            expect(relationsConverter(qualifiers, identifiers)(input)).to.eql(expected)
        })

        it("should convert a relation with only a url", () => {
            const input = [
                {
                    url: "my-url",
                },
            ]
            const expected = [
                [],
                [
                    {
                        qualifier: "dcterms:relation",
                        url: "my-url",
                        title: undefined,
                    },
                ],
            ]
            expect(relationsConverter(qualifiers, identifiers)(input)).to.eql(expected)
        })

        it("should convert a relation with only a url and title", () => {
            const input = [
                {
                    url: "my-url",
                    title: "my-title",
                },
            ]
            const expected = [
                [],
                [
                    {
                        qualifier: "dcterms:relation",
                        url: "my-url",
                        title: "my-title",
                    },
                ],
            ]
            expect(relationsConverter(qualifiers, identifiers)(input)).to.eql(expected)
        })

        it("should convert a qualifier to a relation with no title or url", () => {
            const input = [
                {
                    qualifier: "dcterms:hasFormat",
                },
            ]
            const expected = [
                [],
                [
                    {
                        qualifier: "dcterms:hasFormat",
                        url: undefined,
                        title: undefined,
                    },
                ],
            ]
            expect(relationsConverter(qualifiers, identifiers)(input)).to.eql(expected)
        })

        it("should fail when an invalid qualifier is given in a relation", () => {
            const input = [
                {
                    qualifier: "dcterms:invalid",
                    title: "my-title",
                },
            ]
            expect(() => relationsConverter(qualifiers, identifiers)(input)).to
                .throw("Error in metadata: no such relation qualifier found: 'dcterms:invalid'")
        })

        it("should fail when an invalid scheme is given for a related identifier", () => {
            const input = [
                {
                    qualifier: "dcterms:hasFormat",
                    scheme: "id-type:invalid",
                },
            ]
            expect(() => relationsConverter(qualifiers, identifiers)(input)).to
                .throw("Error in metadata: no such related identifier scheme found: 'id-type:invalid'")
        })

        it("should fail when an unknown object is given", () => {
            const input = [
                {
                    foo: "bar",
                },
            ]
            expect(() => relationsConverter(qualifiers, identifiers)(input)).to
                .throw("Error in metadata: unrecognized relation: {\"foo\":\"bar\"}")
        })
    })

    describe("relationDeconverter", () => {

        it("should convert a whole Relation into the correct external model", () => {
            const input = {
                qualifier: "dcterms:relation",
                url: "http://bit.ly/react-deposit-ui",
                title: "title1",
            }
            const expected = {
                qualifier: "dcterms:relation",
                url: "http://bit.ly/react-deposit-ui",
                title: "title1",
            }
            expect(relationDeconverter(input)).to.eql(expected)
        })
    })

    describe("relatedIdentifierDeconverter", () => {

        it("should convert a whole RelatedIdentifier into the correct external model", () => {
            const input = {
                qualifier: "dcterms:hasFormat",
                scheme: "id-type:ISBN",
                value: "2123-34X",
            }
            const expected = {
                qualifier: "dcterms:hasFormat",
                scheme: "id-type:ISBN",
                value: "2123-34X",
            }
            expect(relatedIdentifierDeconverter(input)).to.eql(expected)
        })
    })
})
