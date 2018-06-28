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
    alternativeIdentifersConverter,
    alternativeIdentifierDeconverter,
    archisIdentifierDeconverter,
    doiConverter,
    doiDeconverter,
    identifiersConverter,
} from "../../../../main/typescript/lib/metadata/Identifier"
import { DropdownListEntry } from "../../../../main/typescript/model/DropdownLists"

describe("Identifier", () => {

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

    describe("identifiersConverter", () => {

        it("should convert a valid sequence of identifiers and split them correctly", () => {
            const input = [
                {
                    scheme: "id-type:DOI",
                    value: "doi:10.17632/DANS.6wg5xccnjd.1",
                },
            ]
            const expected = {
                "id-type:DOI": "doi:10.17632/DANS.6wg5xccnjd.1",
            }
            expect(identifiersConverter(input)).to.eql(expected)
        })

        it("should fail when the identifier type is unknown", () => {
            const input = [
                {
                    scheme: "id-type:MENDELEY-DATA",
                    value: "a mendeley identifier",
                },
            ]
            expect(() => identifiersConverter(input)).to
                .throw("Error in metadata: no such identifier: 'id-type:MENDELEY-DATA'")
        })
    })

    describe("doiConverter", () => {

        it("should extract the DOI from the input object", () => {
            const input = {
                "id-type:DOI": "doi:10.17632/DANS.6wg5xccnjd.1",
            }
            const expected = "doi:10.17632/DANS.6wg5xccnjd.1"
            expect(doiConverter(input)).to.eql(expected)
        })
    })

    describe("doiDeconverter", () => {

        it("should convert a DOI into the correct external model", () => {
            const input = "doi:10.17632/DANS.6wg5xccnjd.1"
            const expected = {
                scheme: "id-type:DOI",
                value: "doi:10.17632/DANS.6wg5xccnjd.1",
            }
            expect(doiDeconverter(input)).to.eql(expected)
        })
    })

    describe("alternativeIdentifiersConverter", () => {

        it("should convert a valid sequence of alternative identifiers and split them correctly", () => {
            const input = [
                {
                    scheme: "id-type:ISBN",
                    value: "test identifier 1",
                },
                {
                    scheme: "id-type:NWO_PROJECTNR",
                    value: "test identifier 2",
                },
                {
                    scheme: "id-type:ARCHIS-ZAAK-IDENTIFICATIE",
                    value: "archis nr. 1",
                },
                {
                    scheme: "id-type:ARCHIS-ZAAK-IDENTIFICATIE",
                    value: "archis nr. 2",
                },
            ]
            const expected = [
                [
                    {
                        scheme: "id-type:ARCHIS-ZAAK-IDENTIFICATIE",
                        value: "archis nr. 1",
                    },
                    {
                        scheme: "id-type:ARCHIS-ZAAK-IDENTIFICATIE",
                        value: "archis nr. 2",
                    },
                ],
                [
                    {
                        scheme: "id-type:ISBN",
                        value: "test identifier 1",
                    },
                    {
                        scheme: "id-type:NWO_PROJECTNR",
                        value: "test identifier 2",
                    },
                ],
            ]
            expect(alternativeIdentifersConverter(identifiers)(input)).to.eql(expected)
        })

        it("should fail when an identifier is invalid", () => {
            const input = [
                {
                    scheme: "id-type:invalid",
                    value: "test identifier 1",
                },
            ]
            expect(() => alternativeIdentifersConverter(identifiers)(input)).to
                .throw("Error in metadata: no such identifier: 'id-type:invalid'")
        })
    })

    describe("alternativeIdentifierDeconverter", () => {

        it("should convert an identifier to the correct external model", () => {
            const input = {
                scheme: "id-type:ISBN",
                value: "test identifier 1",
            }
            const expected = {
                scheme: "id-type:ISBN",
                value: "test identifier 1",
            }
            expect(alternativeIdentifierDeconverter(input)).to.eql(expected)
        })

        it("should return an empty object when given an object with empty strings only", () => {
            const input = {
                scheme: "",
                value: "",
            }
            const expected = {}
            expect(alternativeIdentifierDeconverter(input)).to.eql(expected)
        })
    })

    describe("archisIdentifierDeconverter", () => {

        it("should convert an Archis identifier to the correct external model", () => {
            const input = "archis nr. 1"
            const expected = {
                scheme: "id-type:ARCHIS-ZAAK-IDENTIFICATIE",
                value: "archis nr. 1",
            }
            expect(archisIdentifierDeconverter(input)).to.eql(expected)
        })

        it("should return an empty object when given an empty string", () => {
            const input = ""
            const expected = {}
            expect(archisIdentifierDeconverter(input)).to.eql(expected)
        })
    })
})
