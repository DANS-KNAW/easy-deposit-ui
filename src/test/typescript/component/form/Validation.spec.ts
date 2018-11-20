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
    checkboxMustBeChecked,
    dateAvailableMustBeAfterDateCreated,
    mandatoryFieldArrayValidator,
    mandatoryFieldValidator,
    mandatoryPrivacySensitiveDataValidator,
    mandatoryRadioButtonValidator,
} from "../../../../main/typescript/components/form/Validation"
import { PrivacySensitiveDataValue } from "../../../../main/typescript/lib/metadata/PrivacySensitiveData"

describe("Validation", () => {

    const allValues = {}
    const props = {}
    const fieldName = "my-field-name"

    describe("mandatoryFieldValidator", () => {

        it("should return undefined when value is present", () => {
            expect(mandatoryFieldValidator("hello", allValues, props, fieldName)).to.be.undefined
        })

        it("should return undefined when value is anything else than a string", () => {
            expect(mandatoryFieldValidator(["hello", "array"], allValues, props, fieldName)).to.be.undefined
        })

        it("should return an error when the value is empty", () => {
            expect(mandatoryFieldValidator("", allValues, props, fieldName)).to.eql(`no ${fieldName} was provided`)
        })

        it("should return an error when the value is undefined", () => {
            expect(mandatoryFieldValidator(undefined, allValues, props, fieldName)).to.eql(`no ${fieldName} was provided`)
        })
    })

    describe("mandatoryFieldArrayValidator", () => {

        it("should return undefined when values are present", () => {
            expect(mandatoryFieldArrayValidator(["hello", "array"], allValues, props, fieldName)).to.be.undefined
        })

        it("should return undefined when the array contains a mix of empty and non-empty values", () => {
            expect(mandatoryFieldArrayValidator(["hello", "", "array"], allValues, props, fieldName)).to.be.undefined
        })

        it("should return an error when the array is empty", () => {
            expect(mandatoryFieldArrayValidator([], allValues, props, fieldName)).to.eql(`no ${fieldName} were provided`)
        })

        it("should return an error when the array only contains empty values", () => {
            expect(mandatoryFieldArrayValidator(["", "", ""], allValues, props, fieldName)).to.eql(`no ${fieldName} were provided`)
        })

        it("should return an error when the array is undefined", () => {
            expect(mandatoryFieldArrayValidator(undefined, allValues, props, fieldName)).to.eql(`no ${fieldName} were provided`)
        })
    })

    describe("mandatoryRadioButtonValidator", () => {

        it("should return undefined when the value is present", () => {
            expect(mandatoryRadioButtonValidator({ "hello": "world" }, allValues, props, fieldName)).to.be.undefined
        })

        it("should return undefined when the object contains a mix of empty and non-empty values", () => {
            expect(mandatoryRadioButtonValidator({
                "hello1": "world",
                "hello2": "",
            }, allValues, props, fieldName)).to.be.undefined
        })

        it("should return an error when the object contains only empty values", () => {
            expect(mandatoryRadioButtonValidator({ "hello": "" }, allValues, props, fieldName)).to.eql(`no ${fieldName} was provided`)
        })

        it("should return an error when the value is undefined", () => {
            expect(mandatoryRadioButtonValidator(undefined, allValues, props, fieldName)).to.eql(`no ${fieldName} was provided`)
        })
    })

    describe("mandatoryPrivacySensitiveDataValidator", () => {

        it("should return undefined when the value is a non-empty string", () => {
            expect(mandatoryPrivacySensitiveDataValidator(PrivacySensitiveDataValue.YES, allValues, props, fieldName)).to.be.undefined
        })

        it("should return undefined when the value is an object with a mix of empty and non-empty values", () => {
            expect(mandatoryPrivacySensitiveDataValidator({
                "hello1": "world",
                "hello2": "",
            }, allValues, props, fieldName)).to.be.undefined
        })

        it("should return an error when the value is a string that is empty", () => {
            expect(mandatoryPrivacySensitiveDataValidator("", allValues, props, fieldName)).to.eql(`no ${fieldName} was provided`)
        })

        it("should return an error when the value is a string that represents PrivacySensitiveDataValue.UNSPECIFIED", () => {
            expect(mandatoryPrivacySensitiveDataValidator(PrivacySensitiveDataValue.UNSPECIFIED, allValues, props, fieldName)).to.eql(`no ${fieldName} was provided`)
        })

        it("should return an error when the value is an object with only empty values", () => {
            expect(mandatoryPrivacySensitiveDataValidator({ "hello": "" }, allValues, props, fieldName)).to.eql(`no ${fieldName} was provided`)
        })

        it("should return an error when the value is undefined", () => {
            expect(mandatoryPrivacySensitiveDataValidator(undefined, allValues, props, fieldName)).to.eql(`no ${fieldName} was provided`)
        })
    })

    describe("checkboxMustBeChecked", () => {

        it("should return undefined when the value is true", () => {
            expect(checkboxMustBeChecked(true)).to.be.undefined
        })

        it("should return an error when the value is false", () => {
            expect(checkboxMustBeChecked(false)).to.eql("Accept the license agreement before submitting this dataset")
        })

        it("should return an error when the value is something else than true", () => {
            expect(checkboxMustBeChecked("hello")).to.eql("Accept the license agreement before submitting this dataset")
        })

        it("should return an error when the value is undefined", () => {
            expect(checkboxMustBeChecked(undefined)).to.eql("Accept the license agreement before submitting this dataset")
        })
    })

    describe("dateAvailableMustBeAfterDateCreated", () => {

        it("should return undefined when dateCreated and dateAvailable are given and the latter is later than the former", () => {
            expect(dateAvailableMustBeAfterDateCreated({}, {
                dateCreated: new Date(2018, 11, 15),
                dateAvailable: new Date(2018, 11, 16),
            })).to.be.undefined
        })

        it("should return undefined when dateCreated is undefined", () => {
            expect(dateAvailableMustBeAfterDateCreated({}, {
                dateCreated: undefined,
                dateAvailable: new Date(2018, 11, 16),
            })).to.be.undefined
        })

        it("should return undefined when dateAvailable is undefined", () => {
            expect(dateAvailableMustBeAfterDateCreated({}, {
                dateCreated: new Date(2018, 11, 15),
                dateAvailable: undefined,
            })).to.be.undefined
        })

        it("should return undefined when both dateCreated and dateAvailable are undefined", () => {
            expect(dateAvailableMustBeAfterDateCreated({}, {
                dateCreated: undefined,
                dateAvailable: undefined,
            })).to.be.undefined
        })

        it("should return an error when dateCreated is later than dateAvailable", () => {
            expect(dateAvailableMustBeAfterDateCreated({}, {
                dateCreated: new Date(2018, 11, 16),
                dateAvailable: new Date(2018, 11, 15),
            })).to.eql("'Date available' cannot be a date earlier than 'Date created'")
        })
    })
})
