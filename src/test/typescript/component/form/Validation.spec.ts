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
    atLeastOneContributor,
    atLeastOneCreator,
    checkboxMustBeChecked,
    dateAvailableMustBeAfterDateCreated,
    mandatoryFieldArrayValidator,
    mandatoryFieldValidator,
    mandatoryPrivacySensitiveDataValidator,
    mandatoryRadioButtonValidator,
    validateContributors, validateDates,
    validateQualifiedSchemedValues,
    validateRelations,
    validateSchemedValue, validateSpatialBoxes, validateSpatialPoints,
} from "../../../../main/typescript/components/form/Validation"
import { PrivacySensitiveDataValue } from "../../../../main/typescript/lib/metadata/PrivacySensitiveData"
import { Contributor, creatorRole, emptyContributor } from "../../../../main/typescript/lib/metadata/Contributor"

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
            ids: [
                {
                    scheme: "test",
                    value: "foobar",
                },
                {
                    scheme: "",
                    value: "",
                },
                {},
            ],
        }
        const contributor2: Contributor = {
            organization: "K.N.A.W.",
        }
        const contributor3: Contributor = emptyContributor
        const contributor4: Contributor = {}

        it("should return undefined when at least one Contributor is not empty", () => {
            expect(atLeastOneContributor([contributor1, contributor2, contributor3, contributor4])).to.be.undefined
        })

        it("should return an error when undefined is given", () => {
            expect(atLeastOneContributor(undefined)).to.eql("No contributors were provided")
        })

        it("should return an error when an empty list is given", () => {
            expect(atLeastOneContributor([])).to.eql("No contributors were provided")
        })

        it("should return an error when only empty Contributors are given", () => {
            expect(atLeastOneContributor([contributor3, contributor4])).to.eql("No contributors were provided")
        })
    })

    describe("atLeastOneCreator", () => {
        const contributor1: Contributor = {
            initials: "D.A.",
            surname: "N.S.",
            ids: [
                {
                    scheme: "test",
                    value: "foobar",
                },
                {
                    scheme: "",
                    value: "",
                },
                {},
            ],
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

    describe("validateContributors", () => {
        const contributor1: Contributor = {
            initials: "D.A.",
            surname: "N.S.",
        }
        const contributor2: Contributor = {
            organization: "K.N.A.W.",
        }
        const contributor3: Contributor = emptyContributor
        const contributor4: Contributor = {}
        const contributor5: Contributor = {
            ...contributor1,
            ids: [
                {
                    scheme: "test",
                    // no value
                },
                {
                    scheme: "foo",
                    value: "bar",
                },
                {
                    // no scheme
                    value: "def",
                },
            ],
        }

        it("should return an empty array when an empty list is provided", () => {
            expect(validateContributors([])).to.eql([])
        })

        it("should return empty objects when for each Contributor at least 'initials' and 'surname' are provided", () => {
            expect(validateContributors([contributor1, contributor1])).to.eql([{}, {}])
        })

        it("should return empty objects when for each Contributor at least the 'organization' is provided", () => {
            expect(validateContributors([contributor2, contributor2])).to.eql([{}, {}])
        })

        it("should return empty objects when for each Contributor at least either 'initials' and 'surname' or 'organization' are/is provided", () => {
            expect(validateContributors([contributor1, contributor2])).to.eql([{}, {}])
        })

        it("should return an empty object when the contributor is completely empty", () => {
            expect(validateContributors([contributor3])).to.eql([{}])
        })

        it("should return an empty object when an empty object is given", () => {
            expect(validateContributors([contributor4])).to.eql([{}])
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
                organization: "No organization given",
                initials: "No initials given",
                surname: "No surname given",
            }])
        })

        it("should return an error object when for any id, only the scheme or value is given", () => {
            expect(validateContributors([contributor5])).to.eql([{
                ids: [
                    {
                        value: "No identifier given",
                    },
                    {},
                    {
                        scheme: "No scheme given",
                    },
                ],
            }])
        })
    })

    describe("validateSchemedValue", () => {
        it("should return empty objects when all SchemedValues are valid", () => {
            expect(validateSchemedValue([
                {
                    scheme: "foo",
                    value: "bar",
                },
                {
                    scheme: "abc",
                    value: "def",
                }])).to.eql([{}, {}])
        })

        it("should return empty objects when the SchemedValues are empty", () => {
            expect(validateSchemedValue([{ scheme: "", value: "" }, {}])).to.eql([{}, {}])
        })

        it("should return an empty list when no SchemedValues are given", () => {
            expect(validateSchemedValue([])).to.eql([])
        })

        it("should return an error object when only the scheme is given", () => {
            expect(validateSchemedValue([{ scheme: "foo" }])).to.eql([{
                value: "No identifier given",
            }])
        })

        it("should return an error object when only the value is given", () => {
            expect(validateSchemedValue([{ value: "bar" }])).to.eql([{
                scheme: "No scheme given",
            }])
        })
    })

    describe("validateQualifiedSchemedValue", () => {
        it("should return an empty list when no QualifiedSchemedValues are given", () => {
            expect(validateQualifiedSchemedValues([])).to.eql([])
        })

        it("should return an empty object when one empty QualifiedSchemedValue is given", () => {
            expect(validateQualifiedSchemedValues([{}])).to.eql([{}])
        })

        it("should return an empty object when one QualifiedSchemedValue is given with only a qualifier", () => {
            expect(validateQualifiedSchemedValues([{ qualifier: "q" }])).to.eql([{}])
        })

        it("should return an empty object when one QualifiedSchemedValue is given with all fields filled in", () => {
            expect(validateQualifiedSchemedValues([{ qualifier: "q", scheme: "s", value: "v" }])).to.eql([{}])
        })

        it("should return an error object when one QualifiedSchemedValue is given with 'scheme' missing", () => {
            expect(validateQualifiedSchemedValues([{
                qualifier: "q",
                // no scheme
                value: "v",
            }])).to.eql([{ scheme: "No scheme given" }])
        })

        it("should return an error object when one QualifiedSchemedValue is given with 'value' missing", () => {
            expect(validateQualifiedSchemedValues([{
                qualifier: "q",
                scheme: "s",
                // no value
            }])).to.eql([{ value: "No value given" }])
        })

        it("should return error objects when multiple (some incomplete) QualifiedSchemedValues are given", () => {
            expect(validateQualifiedSchemedValues([
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
            ])).to.eql([
                {},
                {
                    scheme: "No scheme given",
                },
                {
                    value: "No value given",
                },
                {
                    scheme: "No scheme given",
                    value: "No value given",
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

    describe("validateSpatialPoints", () => {
        it("should return an empty list when no SpatialPoints are given", () => {
            expect(validateSpatialPoints([])).to.eql([])
        })

        it("should return empty objects when valid SpatialPoints are given", () => {
            expect(validateSpatialPoints([
                {},
                {
                    scheme: "RD",
                    x: "12",
                    y: "15",
                },
            ])).to.eql([{}, {}])
        })

        it("should return error objects when invalid SpatialPoints are given", () => {
            expect(validateSpatialPoints([
                {
                    scheme: "",
                    x: "12",
                    y: "15",
                },
                {
                    scheme: "RD",
                    x: "",
                    y: "",
                },
            ])).to.eql([{ scheme: "No scheme given" }, { x: "No x coordinate given", y: "No y coordinate given" }])
        })
    })

    describe("validateSpatialBoxes", () => {
        it("should return an empty list when no SpatialBoxes are given", () => {
            expect(validateSpatialBoxes([])).to.eql([])
        })

        it("should return empty objects when valid SpatialBoxes are given", () => {
            expect(validateSpatialBoxes([
                {},
                {
                    scheme: "RD",
                    north: "12",
                    east: "15",
                    south: "26",
                    west: "52",
                },
            ])).to.eql([{}, {}])
        })

        it("should return error objects when invalid SpatialBoxes are given", () => {
            expect(validateSpatialBoxes([
                {
                    scheme: "",
                    north: "12",
                    east: "15",
                    south: "26",
                    west: "52",
                },
                {
                    scheme: "RD",
                    north: "",
                    east: "",
                    south: "",
                    west: "",
                },
            ])).to.eql([{ scheme: "No scheme given" }, {
                north: "No north coordinate given",
                east: "No east coordinate given",
                south: "No south coordinate given",
                west: "No west coordinate given",
            }])
        })
    })
})
