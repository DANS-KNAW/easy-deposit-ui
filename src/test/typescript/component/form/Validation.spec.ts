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
    atLeastOneCreator,
    atLeastOnePersonOrOrganization,
    checkboxMustBeChecked,
    dateAvailableMustBeAfterDateCreated,
    isDaiValid,
    mandatoryFieldArrayValidator,
    mandatoryFieldValidator,
    mandatoryPrivacySensitiveDataValidator,
    mandatoryRadioButtonValidator,
    validateContributors,
    validateDates,
    validateRelatedIdentifiers,
    validateRelations,
    validateAlternativeIdentifiers,
    validateSpatialBoxes,
    validateSpatialPoints,
} from "../../../../main/typescript/components/form/Validation"
import { PrivacySensitiveDataValue } from "../../../../main/typescript/lib/metadata/PrivacySensitiveData"
import { Contributor, creatorRole, emptyContributor } from "../../../../main/typescript/lib/metadata/Contributor"
import {
    IdentifiersDropdownListEntry,
    SpatialCoordinatesDropdownListEntry,
} from "../../../../main/typescript/model/DropdownLists"

describe("Validation", () => {

    const fieldName = "my-field-name"

    describe("mandatoryFieldValidator", () => {

        it("should return undefined when value is present", () => {
            expect(mandatoryFieldValidator("hello", fieldName)).to.be.undefined
        })

        it("should return undefined when value is anything else than a string", () => {
            expect(mandatoryFieldValidator(["hello", "array"], fieldName)).to.be.undefined
        })

        it("should return an error when the value is empty", () => {
            expect(mandatoryFieldValidator("", fieldName)).to.eql(`No ${fieldName} was provided`)
        })

        it("should return an error when the value is undefined", () => {
            expect(mandatoryFieldValidator(undefined, fieldName)).to.eql(`No ${fieldName} was provided`)
        })
    })

    describe("mandatoryFieldArrayValidator", () => {

        it("should return undefined when values are present", () => {
            expect(mandatoryFieldArrayValidator(["hello", "array"], fieldName)).to.be.undefined
        })

        it("should return undefined when the array contains a mix of empty and non-empty values", () => {
            expect(mandatoryFieldArrayValidator(["hello", "", "array"], fieldName)).to.be.undefined
        })

        it("should return an error when the array is empty", () => {
            expect(mandatoryFieldArrayValidator([], fieldName)).to.eql(`No ${fieldName} were provided`)
        })

        it("should return an error when the array only contains empty values", () => {
            expect(mandatoryFieldArrayValidator(["", "", ""], fieldName)).to.eql(`No ${fieldName} were provided`)
        })

        it("should return an error when the array is undefined", () => {
            expect(mandatoryFieldArrayValidator(undefined, fieldName)).to.eql(`No ${fieldName} were provided`)
        })
    })

    describe("mandatoryRadioButtonValidator", () => {

        it("should return undefined when the value is present", () => {
            expect(mandatoryRadioButtonValidator({ "hello": "world" }, fieldName)).to.be.undefined
        })

        it("should return undefined when the object contains a mix of empty and non-empty values", () => {
            expect(mandatoryRadioButtonValidator({
                "hello1": "world",
                "hello2": "",
            }, fieldName)).to.be.undefined
        })

        it("should return an error when the object contains only empty values", () => {
            expect(mandatoryRadioButtonValidator({ "hello": "" }, fieldName)).to.eql(`No ${fieldName} was chosen`)
        })

        it("should return an error when the value is undefined", () => {
            expect(mandatoryRadioButtonValidator(undefined, fieldName)).to.eql(`No ${fieldName} was chosen`)
        })
    })

    describe("mandatoryPrivacySensitiveDataValidator", () => {

        it("should return undefined when the value is a non-empty string", () => {
            expect(mandatoryPrivacySensitiveDataValidator(PrivacySensitiveDataValue.YES)).to.be.undefined
        })

        it("should return undefined when the value is an object with a mix of empty and non-empty values", () => {
            expect(mandatoryPrivacySensitiveDataValidator({ "hello1": "world", "hello2": "" })).to.be.undefined
        })

        it("should return an error when the value is a string that is empty", () => {
            expect(mandatoryPrivacySensitiveDataValidator(""))
                .to.eql("Please determine whether privacy sensitive data is present in this deposit")
        })

        it("should return an error when the value is a string that represents PrivacySensitiveDataValue.UNSPECIFIED", () => {
            expect(mandatoryPrivacySensitiveDataValidator(PrivacySensitiveDataValue.UNSPECIFIED))
                .to.eql("Please determine whether privacy sensitive data is present in this deposit")
        })

        it("should return an error when the value is an object with only empty values", () => {
            expect(mandatoryPrivacySensitiveDataValidator({ "hello": "" }))
                .to.eql("Please determine whether privacy sensitive data is present in this deposit")
        })

        it("should return an error when the value is undefined", () => {
            expect(mandatoryPrivacySensitiveDataValidator(undefined))
                .to.eql("Please determine whether privacy sensitive data is present in this deposit")
        })
    })

    describe("checkboxMustBeChecked", () => {

        it("should return undefined when the value is true", () => {
            expect(checkboxMustBeChecked(true, "hello world")).to.be.undefined
        })

        it("should return an error when the value is false", () => {
            expect(checkboxMustBeChecked(false, "hello world")).to.eql("hello world")
        })

        it("should return an error when the value is undefined", () => {
            expect(checkboxMustBeChecked(undefined, "hello world")).to.eql("hello world")
        })
    })

    describe("dateAvailableMustBeAfterDateCreated", () => {

        it("should return undefined when dateCreated and dateAvailable are given and the latter is later than the former", () => {
            expect(dateAvailableMustBeAfterDateCreated(new Date(2018, 11, 15), new Date(2018, 11, 16))).to.be.undefined
        })

        it("should return undefined when dateCreated is undefined", () => {
            expect(dateAvailableMustBeAfterDateCreated(undefined, new Date(2018, 11, 16))).to.be.undefined
        })

        it("should return undefined when dateAvailable is undefined", () => {
            expect(dateAvailableMustBeAfterDateCreated(new Date(2018, 11, 15), undefined)).to.be.undefined
        })

        it("should return undefined when both dateCreated and dateAvailable are undefined", () => {
            expect(dateAvailableMustBeAfterDateCreated(undefined, undefined)).to.be.undefined
        })

        it("should return an error when dateCreated is later than dateAvailable", () => {
            expect(dateAvailableMustBeAfterDateCreated(new Date(2018, 11, 16), new Date(2018, 11, 15)))
                .to.eql("'Date available' cannot be a date earlier than 'Date created'")
        })
    })

    describe("atLeastOneContributor", () => {
        const contributor1: Contributor = {
            initials: "D.A.",
            surname: "N.S.",
            isni: "000000012281955X",
        }
        const contributor2: Contributor = {
            organization: "K.N.A.W.",
        }
        const contributor3: Contributor = emptyContributor
        const contributor4: Contributor = {}

        it("should return undefined when at least one Contributor is not empty", () => {
            expect(atLeastOnePersonOrOrganization([contributor1, contributor2, contributor3, contributor4])).to.be.undefined
        })

        it("should return an error when undefined is given", () => {
            expect(atLeastOnePersonOrOrganization(undefined)).to.eql("No person or organization details were provided")
        })

        it("should return an error when an empty list is given", () => {
            expect(atLeastOnePersonOrOrganization([])).to.eql("No person or organization details were provided")
        })

        it("should return an error when only empty Contributors are given", () => {
            expect(atLeastOnePersonOrOrganization([contributor3, contributor4])).to.eql("No person or organization details were provided")
        })
    })

    describe("atLeastOneCreator", () => {
        const contributor1: Contributor = {
            initials: "D.A.",
            surname: "N.S.",
            orcid: "0000-0002-1825-0097",
        }
        const contributor2: Contributor = {
            organization: "K.N.A.W.",
        }
        const contributor3: Contributor = emptyContributor
        const contributor4: Contributor = {}
        const creator: Contributor = {
            initials: "my",
            surname: "name",
            role: creatorRole,
        }

        it("should return undefined when at least one Contributor has role 'Creator'", () => {
            expect(atLeastOneCreator([contributor1, contributor2, contributor3, contributor4, creator]))
                .to.be.undefined
        })

        it("should return an error when undefined is given", () => {
            expect(atLeastOneCreator(undefined)).to.eql("At least one creator is required")
        })

        it("should return an error when an empty list is given", () => {
            expect(atLeastOneCreator([])).to.eql("At least one creator is required")
        })

        it("should return an error when no Contributor has role 'Creator'", () => {
            expect(atLeastOneCreator([contributor1, contributor2, contributor3, contributor4]))
                .to.eql("At least one creator is required")
        })
    })

    describe("isDaiValid", () => {
        it("should test whether DAIs are valid", () => {
            expect(isDaiValid("123456780")).to.be.false
            expect(isDaiValid("123456781")).to.be.false
            expect(isDaiValid("123456782")).to.be.false
            expect(isDaiValid("123456783")).to.be.false
            expect(isDaiValid("123456784")).to.be.false
            expect(isDaiValid("123456785")).to.be.false
            expect(isDaiValid("123456786")).to.be.false
            expect(isDaiValid("123456787")).to.be.false
            expect(isDaiValid("123456788")).to.be.false
            expect(isDaiValid("123456789")).to.be.true
            expect(isDaiValid("12345678x")).to.be.false
        })

        it("should test whether DAIs are valid with prefix", () => {
            expect(isDaiValid("info:eu-repo/dai/nl/123456780")).to.be.false
            expect(isDaiValid("info:eu-repo/dai/nl/123456781")).to.be.false
            expect(isDaiValid("info:eu-repo/dai/nl/123456782")).to.be.false
            expect(isDaiValid("info:eu-repo/dai/nl/123456783")).to.be.false
            expect(isDaiValid("info:eu-repo/dai/nl/123456784")).to.be.false
            expect(isDaiValid("info:eu-repo/dai/nl/123456785")).to.be.false
            expect(isDaiValid("info:eu-repo/dai/nl/123456786")).to.be.false
            expect(isDaiValid("info:eu-repo/dai/nl/123456787")).to.be.false
            expect(isDaiValid("info:eu-repo/dai/nl/123456788")).to.be.false
            expect(isDaiValid("info:eu-repo/dai/nl/123456789")).to.be.true
            expect(isDaiValid("info:eu-repo/dai/nl/12345678x")).to.be.false
        })
    })

    describe("validateContributors", () => {
        const mandatoryFieldsContributor: Contributor = {
            initials: "D.A.",
            surname: "N.S.",
        }
        const organizationContributor: Contributor = {
            organization: "K.N.A.W.",
        }

        it("should return an empty array when an empty list is provided", () => {
            expect(validateContributors([])).to.eql([])
        })

        it("should return empty objects when for each Contributor at least 'initials' and 'surname' are provided", () => {
            expect(validateContributors([mandatoryFieldsContributor, mandatoryFieldsContributor])).to.eql([{}, {}])
        })

        it("should return empty objects when for each Contributor at least the 'organization' is provided", () => {
            expect(validateContributors([organizationContributor, organizationContributor])).to.eql([{}, {}])
        })

        it("should return empty objects when for each Contributor at least either 'initials' and 'surname' or 'organization' are/is provided", () => {
            expect(validateContributors([mandatoryFieldsContributor, organizationContributor])).to.eql([{}, {}])
        })

        it("should return an empty object when the contributor is completely empty", () => {
            expect(validateContributors([emptyContributor])).to.eql([{}])
        })

        it("should return an empty object when an empty object is given", () => {
            expect(validateContributors([{}])).to.eql([{}])
        })

        it("should return an empty object when blank identifiers are provided", () => {
            expect(validateContributors([{
                ...mandatoryFieldsContributor,
                orcid: " ",
                isni: " ",
                dai: " ",
            }])).to.eql([{}])
        })

        it("should return an error object with only field 'surname' when only 'initials' is provided", () => {
            expect(validateContributors([{ initials: "D.A." }])).to.eql([{
                surname: "No surname given",
            }])
        })

        it("should return an error object with only field 'initials' when only 'surname' is provided", () => {
            expect(validateContributors([{ surname: "N.S." }])).to.eql([{
                initials: "No initials given",
            }])
        })

        it("should return an error object with all of 'initials', 'surname' and 'organization' when only an insertion is given", () => {
            expect(validateContributors([{ insertions: "van" }])).to.eql([{
                organization: "No organisation given",
                initials: "No initials given",
                surname: "No surname given",
            }])
        })

        it("should return an error object when for any id, only the scheme or value is given", () => {
            expect(validateContributors([{
                ...mandatoryFieldsContributor,
                orcid: "invalid-orcid",
                dai: "123456789",
            }])).to.eql([{
                orcid: "Invalid ORCID identifier (e.g.: 0000-0002-1825-0097)",
            }])
        })

        it("should return an error object when the organization and surname are given, but initials is missing", () => {
            expect(validateContributors([{
                organization: "some organisation",
                surname: "surname",
            }])).to.eql([{
                initials: "No initials given",
            }])
        })

        it("should return an error object when the organization and initials are given, but surname is missing", () => {
            expect(validateContributors([{
                organization: "some organisation",
                initials: "initials",
            }])).to.eql([{
                surname: "No surname given",
            }])
        })

        it("should return an error object when the organization and titles are given, but initials and surname are missing", () => {
            expect(validateContributors([{
                organization: "some organisation",
                titles: "titles",
            }])).to.eql([{
                initials: "No initials given",
                surname: "No surname given",
            }])
        })
    })

    const identifierSettings: IdentifiersDropdownListEntry[] = [
        {
            key: "id-type:DOI",
            value: "doi",
            displayValue: "doi",
            baseUrl: "https://doi.org/",
        },
        {
            key: "id-type:URN",
            value: "urn",
            displayValue: "urn",
            baseUrl: "http://persistent-identifier.nl/",
            format: /^urn:nbn:nl:ui:.*$/,
        },
        {
            key: "id-type:ISBN",
            value: "ISBN",
            displayValue: "ISBN",
        },
        {
            key: "id-type:ISSN",
            value: "ISSN",
            displayValue: "ISSN",
        },
        {
            key: "id-type:NWO-PROJECTNR",
            value: "NWO project no.",
            displayValue: "NWO project no.",
        },
    ]

    describe("validateAlternativeIdentifiers", () => {
        it("should return empty objects when all AlternativeIdentifiers are valid", () => {
            expect(validateAlternativeIdentifiers(identifierSettings, [
                {
                    scheme: "foo",
                    value: "bar",
                },
                {
                    scheme: "abc",
                    value: "def",
                }])).to.eql([{}, {}])
        })

        it("should return empty objects when the AlternativeIdentifiers are empty", () => {
            expect(validateAlternativeIdentifiers(identifierSettings, [{ scheme: "", value: "" }, {}])).to.eql([{}, {}])
        })

        it("should return an empty list when no AlternativeIdentifiers are given", () => {
            expect(validateAlternativeIdentifiers(identifierSettings, [])).to.eql([])
        })

        it("should return an empty object when only the scheme is given", () => {
            expect(validateAlternativeIdentifiers(identifierSettings, [{ scheme: "foo" }])).to.eql([{}])
        })

        it("should return an empty object when only the value is given", () => {
            expect(validateAlternativeIdentifiers(identifierSettings, [{ value: "bar" }])).to.eql([{}])
        })

        it("should return error objects when AlternativeIdentifier values don't match the selected schema", () => {
            expect(validateAlternativeIdentifiers(identifierSettings, [
                {
                    scheme: "id-type:DOI",
                    value: "10.17026/dans-z52-ybfe",
                },
                {
                    scheme: "id-type:URN",
                    value: "urn:nbn:nl:ui:13-79-7q2b",
                },
                {
                    scheme: "id-type:DOI",
                    value: "hello world",
                },
                {
                    scheme: "id-type:URN",
                    value: "hello world",
                },
            ])).to.eql([
                {},
                {},
                {
                    value: "Invalid doi",
                },
                {
                    value: "Invalid urn",
                },
            ])
        })
    })

    describe("validateRelatedIdentifiers", () => {
        it("should return an empty list when no related identifier are given", () => {
            expect(validateRelatedIdentifiers(identifierSettings, [])).to.eql([])
        })

        it("should return an empty object when one empty related identifier is given", () => {
            expect(validateRelatedIdentifiers(identifierSettings, [{}])).to.eql([{}])
        })

        it("should return an empty object when one related identifier is given with only a qualifier", () => {
            expect(validateRelatedIdentifiers(identifierSettings, [{
                qualifier: "q",
            }])).to.eql([{}])
        })

        it("should return an empty object when one related identifier is given with all fields filled in", () => {
            expect(validateRelatedIdentifiers(identifierSettings, [{
                qualifier: "q",
                scheme: "s",
                value: "v",
            }])).to.eql([{}])
        })

        it("should return an empty object when one related identifier is given with 'scheme' missing", () => {
            expect(validateRelatedIdentifiers(identifierSettings, [{
                qualifier: "q",
                // no scheme
                value: "v",
            }])).to.eql([{}])
        })

        it("should return an empty object when one related identifier is given with 'value' missing", () => {
            expect(validateRelatedIdentifiers(identifierSettings, [{
                qualifier: "q",
                scheme: "s",
                // no value
            }])).to.eql([{}])
        })

        it("should return an error object when one related identifier is given with a value that does not form a valid URL", () => {
            expect(validateRelatedIdentifiers(identifierSettings, [{
                qualifier: "q",
                scheme: "id-type:URN",
                value: "hello world",
            }])).to.eql([{ value: "Invalid urn" }])
        })

        it("should return an error object when one related identifier is given with a value that does not match the given format", () => {
            expect(validateRelatedIdentifiers(identifierSettings, [{
                qualifier: "q",
                scheme: "id-type:URN",
                value: "hello_world",
            }])).to.eql([{ value: "Invalid urn" }])
        })

        it("should return error objects when multiple (some incomplete) related identifiers are given", () => {
            expect(validateRelatedIdentifiers(identifierSettings, [
                {
                    qualifier: "q",
                    scheme: "s",
                    value: "v",
                },
                {
                    qualifier: "q",
                    // no scheme
                    value: "v",
                },
                {
                    qualifier: "q",
                    scheme: "s",
                    // no value
                },
                {
                    qualifier: "q",
                    // no scheme
                    // no value
                },
                {
                    qualifier: "q",
                    scheme: "id-type:DOI",
                    value: "10.17026/dans-z52-ybfe",
                },
                {
                    qualifier: "q",
                    scheme: "id-type:URN",
                    value: "urn:nbn:nl:ui:13-79-7q2b",
                },
                {
                    qualifier: "q",
                    scheme: "id-type:DOI",
                    value: "hello world",
                },
                {
                    qualifier: "q",
                    scheme: "id-type:URN",
                    value: "hello world",
                },
            ])).to.eql([
                {},
                {},
                {},
                {},
                {},
                {},
                {
                    value: "Invalid doi",
                },
                {
                    value: "Invalid urn",
                },
            ])
        })
    })

    describe("validateRelations", () => {
        it("should return an empty list when no Relations are given", () => {
            expect(validateRelations([])).to.eql([])
        })

        it("should return an empty object when one empty Relation is given", () => {
            expect(validateRelations([{}])).to.eql([{}])
        })

        it("should return an empty object when one Relation is given with only a qualifier", () => {
            expect(validateRelations([{ qualifier: "q" }])).to.eql([{}])
        })

        it("should return an empty object when one Relation is given with all fields filled in", () => {
            expect(validateRelations([{ qualifier: "q", title: "t", url: "http://easy.dans.knaw.nl/" }])).to.eql([{}])
        })

        it("should return an error object when one Relation is given with 'title' missing", () => {
            expect(validateRelations([{
                qualifier: "q",
                // no title
                url: "http://easy.dans.knaw.nl/",
            }])).to.eql([{ title: "No title given" }])
        })

        it("should return an empty object when one Relation is given with 'url' missing", () => {
            expect(validateRelations([{
                qualifier: "q",
                title: "t",
                // no url
            }])).to.eql([{}])
        })

        it("should return an error object when one Relation is given with an invalid 'url'", () => {
            expect(validateRelations([{
                qualifier: "q",
                title: "t",
                url: "invalid",
            }])).to.eql([{ url: "No valid url given" }])
        })

        it("should return an error object when one Relation is given with a 'javascript url'", () => {
            expect(validateRelations([{
                qualifier: "q",
                title: "t",
                url: "javascript:alert('XSS')",
            }])).to.eql([{ url: "No valid url given" }])
        })

        it("should return an error object when one Relation is given with a 'ftp url'", () => {
            expect(validateRelations([{
                qualifier: "q",
                title: "t",
                url: "ftp://ftp.funet.fi/pub/standards/RFC/rfc959.txt",
            }])).to.eql([{ url: "No valid url given" }])
        })

        it("should return error objects when multiple (some incomplete) Relations are given", () => {
            expect(validateRelations([
                {
                    qualifier: "q",
                    title: "t",
                    url: "http://easy.dans.knaw.nl/",
                },
                {
                    qualifier: "q",
                    // no title
                    url: "http://easy.dans.knaw.nl/",
                },
                {
                    qualifier: "q",
                    title: "t",
                    // no url
                },
                {
                    qualifier: "q",
                    // no title
                    // no url
                },
                {
                    qualifier: "q",
                    title: "t",
                    url: "invalid",
                },
            ])).to.eql([
                {},
                {
                    title: "No title given",
                },
                {},
                {
                    title: "No title given",
                    url: "No url given",
                },
                {
                    url: "No valid url given",
                },
            ])
        })
    })

    describe("validateDates", () => {
        it("should return an empty list when no dates are given", () => {
            expect(validateDates([])).to.eql([])
        })

        it("should return an empty object when only one date is given", () => {
            expect(validateDates([{ qualifier: "q", value: Date.now() }])).to.eql([{}])
        })

        it("should return empty objects when multiple valid dates are given", () => {
            expect(validateDates([
                {
                    qualifier: "q",
                    value: "tomorrow",
                },
                {
                    qualifier: "q",
                    value: "yesterweek",
                },
            ])).to.eql([{}, {}])
        })

        it("should return error objects when invalid dates are given", () => {
            expect(validateDates([
                {
                    qualifier: "q",
                    value: Date.now(),
                },
                {
                    qualifier: "q",
                    // no value
                },
            ])).to.eql([{}, { value: "No date given" }])
        })
    })

    const spatialCoordinatesSettings: SpatialCoordinatesDropdownListEntry[] = [
        {
            key: "http://www.opengis.net/def/crs/EPSG/0/28992",
            value: "RD (in m.)",
            displayValue: "RD (in m.)",
            xLabel: "X",
            yLabel: "Y",
            step: "1.0",
            xMin: -7000,
            xMax: 300000,
            yMin: 289000,
            yMax: 629000,
        },
        {
            key: "http://www.opengis.net/def/crs/EPSG/0/4326",
            value: "lengte/breedte (graden)",
            displayValue: "lengte/breedte (graden)",
            xLabel: "Lat",
            yLabel: "Long",
            step: "0.000001",
            xMin: -90,
            xMax: 90,
            yMin: -180,
            yMax: 180,
        },
    ]

    describe("validateSpatialPoints", () => {
        it("should return an empty list when no SpatialPoints are given", () => {
            expect(validateSpatialPoints(spatialCoordinatesSettings, [])).to.eql([])
        })

        it("should return empty objects when valid SpatialPoints are given", () => {
            expect(validateSpatialPoints(spatialCoordinatesSettings, [
                {},
                {
                    scheme: "http://www.opengis.net/def/crs/EPSG/0/28992",
                    x: "12",
                    y: "289001",
                },
            ])).to.eql([{}, {}])
        })

        it("should return error objects when invalid SpatialPoints are given", () => {
            expect(validateSpatialPoints(spatialCoordinatesSettings, [
                {
                    scheme: "",
                    x: "12",
                    y: "15",
                },
                {
                    scheme: "http://www.opengis.net/def/crs/EPSG/0/28992",
                    x: "",
                    y: "",
                },
            ])).to.eql([{ scheme: "No scheme given" }, { x: "Coordinate incomplete", y: "Coordinate incomplete" }])
        })

        it("should return error objects when out-of-range SpatialPoints are given", () => {
            expect(validateSpatialPoints(spatialCoordinatesSettings, [
                {
                    scheme: "", // no scheme, so no checks on range
                    x: "12",
                    y: "15",
                },
                {
                    scheme: "http://www.opengis.net/def/crs/EPSG/0/28992", // RD
                    x: "-7001",
                    y: "288999",
                },
                {
                    scheme: "http://www.opengis.net/def/crs/EPSG/0/28992", // RD
                    x: "300001",
                    y: "629001",
                },
            ])).to.eql([
                {
                    scheme: "No scheme given",
                },
                {
                    x: "X is out of range: [-7000,300000]",
                    y: "Y is out of range: [289000,629000]",
                },
                {
                    x: "X is out of range: [-7000,300000]",
                    y: "Y is out of range: [289000,629000]",
                },
            ])
        })
    })

    describe("validateSpatialBoxes", () => {
        it("should return an empty list when no SpatialBoxes are given", () => {
            expect(validateSpatialBoxes(spatialCoordinatesSettings, [])).to.eql([])
        })

        it("should return empty objects when valid SpatialBoxes are given", () => {
            expect(validateSpatialBoxes(spatialCoordinatesSettings, [
                {},
                {
                    scheme: "http://www.opengis.net/def/crs/EPSG/0/28992",
                    north: "289002",
                    east: "52",
                    south: "289001",
                    west: "15",
                },
            ])).to.eql([{}, {}])
        })

        it("should return error objects when invalid SpatialBoxes are given", () => {
            expect(validateSpatialBoxes(spatialCoordinatesSettings, [
                {
                    scheme: "",
                    north: "12",
                    east: "15",
                    south: "26",
                    west: "52",
                },
                {
                    scheme: "http://www.opengis.net/def/crs/EPSG/0/28992",
                    north: "",
                    east: "",
                    south: "",
                    west: "",
                },
            ])).to.eql([
                {
                    scheme: "No scheme given",
                    "east": "east coordinate must be larger than west coordinate",
                    "north": "north coordinate must be larger than south coordinate",
                },
                {
                    north: "No north coordinate given",
                    east: "No east coordinate given",
                    south: "No south coordinate given",
                    west: "No west coordinate given",
                }])
        })

        it("should return error objects when out-of-range SpatialBox are given", () => {
            expect(validateSpatialBoxes(spatialCoordinatesSettings, [
                {
                    scheme: "", // no scheme, so no checks on range
                    north: "26",
                    east: "52",
                    south: "12",
                    west: "15",
                },
                {
                    scheme: "http://www.opengis.net/def/crs/EPSG/0/28992", // RD
                    north: "288999",
                    east: "-7001",
                    south: "288999",
                    west: "-7001",
                },
                {
                    scheme: "http://www.opengis.net/def/crs/EPSG/0/28992", // RD
                    north: "629001",
                    east: "300001",
                    south: "629001",
                    west: "300001",
                },
            ])).to.eql([
                {
                    scheme: "No scheme given",
                },
                {
                    north: "north coordinate is out of range: [289000,629000]",
                    east: "east coordinate is out of range: [-7000,300000]",
                    south: "south coordinate is out of range: [289000,629000]",
                    west: "west coordinate is out of range: [-7000,300000]",
                },
                {
                    north: "north coordinate is out of range: [289000,629000]",
                    east: "east coordinate is out of range: [-7000,300000]",
                    south: "south coordinate is out of range: [289000,629000]",
                    west: "west coordinate is out of range: [-7000,300000]",
                },
            ])
        })
    })
})
