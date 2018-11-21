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
import { FormErrors, Validator } from "redux-form"
import { PrivacySensitiveDataValue } from "../../lib/metadata/PrivacySensitiveData"
import { DepositFormMetadata } from "./parts"
import { Contributor, creatorRole } from "../../lib/metadata/Contributor"

export const mandatoryFieldValidator = (value: any, name: string) => {
    return !value || typeof value == "string" && value.trim() === ""
        ? `no ${name} was provided`
        : undefined
}

export const mandatoryFieldArrayValidator = (values: any[] | undefined, name: string) => {
    return !values || (values && (values.length == 0 || values.filter(value => value && value.trim() !== "").length === 0))
        ? `no ${name} were provided`
        : undefined
}

export const mandatoryRadioButtonValidator: Validator = (value, allValues, props, name) => {
    return !value || typeof value === "object" && Object.keys(value).filter(key => value[key] && value[key].trim() !== "").length === 0
        ? `no ${name} was provided`
        : undefined
}

export const mandatoryPrivacySensitiveDataValidator: Validator = (value, allValues, props, name) => {
    if (!value)
        return `no ${name} was provided`
    else if (typeof value === "string" && (value.trim() === "" || value.trim() === PrivacySensitiveDataValue.UNSPECIFIED))
        return `no ${name} was provided`
    else if (typeof value === "object" && Object.keys(value).filter(key => value[key] && value[key].trim() !== "").length === 0)
        return `no ${name} was provided`
    else
        return undefined
}

export const checkboxMustBeChecked: Validator = (value?: any) => {
    return !value || value !== true
        ? "Accept the license agreement before submitting this dataset"
        : undefined
}

export const dateAvailableMustBeAfterDateCreated: Validator = (value, { dateCreated, dateAvailable }: DepositFormMetadata) => {
    return dateCreated && dateAvailable && dateAvailable < dateCreated
        ? "'Date available' cannot be a date earlier than 'Date created'"
        : undefined
}

const checkNonEmpty: (s: string | undefined) => boolean = s => s ? s.trim() !== "" : false

export const atLeastOneContributor: Validator = (contributors: Contributor[]) => {
    const nonEmptyContributors = () => contributors.map(contributor => {
        const nonEmptyOrganization = checkNonEmpty(contributor.organization)
        const nonEmptyTitles = checkNonEmpty(contributor.titles)
        const nonEmptyInitials = checkNonEmpty(contributor.initials)
        const nonEmptyInsertions = checkNonEmpty(contributor.insertions)
        const nonEmptySurname = checkNonEmpty(contributor.surname)
        const nonEmptyIdentifiers = contributor.ids
            ? contributor.ids.map(id => {
                const nonEmptyIdScheme = checkNonEmpty(id.scheme)
                const nonEmptyIdValue = checkNonEmpty(id.value)

                return nonEmptyIdScheme || nonEmptyIdValue
            }).reduce((prev, curr) => prev || curr, false)
            : false
        // note that 'role' is not part of this validation, as it defaults to 'Creator'

        return nonEmptyOrganization || nonEmptyTitles || nonEmptyInitials || nonEmptyInsertions || nonEmptySurname || nonEmptyIdentifiers
    }).reduce((prev, curr) => prev || curr, false)

    if (!contributors)
        return "no contributors were provided"
    else if (!nonEmptyContributors())
        return "no contributors were provided"
    else
        return undefined
}

// TODO test
const atLeastOneCreator: Validator = (contributors: Contributor[]) => {
    const containsCreator = contributors.map(contributor => contributor.role === creatorRole)
        .reduce((prev, curr) => prev || curr, false)

    if (!containsCreator)
        return "at least one creator is required"
    else
        return undefined
}

// TODO test
const validateContributors: (contributors: Contributor[]) => Contributor[] = contributors => {
    // validate that mandatory fields are filled in for each contributor
    return contributors.map((contributor: Contributor) => {
        const nonEmptyOrganization = checkNonEmpty(contributor.organization)
        const nonEmptyInitials = checkNonEmpty(contributor.initials)
        const nonEmptySurname = checkNonEmpty(contributor.surname)
        const nonEmptyContributor = nonEmptyOrganization || nonEmptyInitials && nonEmptySurname

        const contribError: Contributor = {}

        if (!nonEmptyContributor) {
            if (!nonEmptyOrganization && !(nonEmptyInitials || nonEmptySurname))
                contribError.organization = "no organization given"
            if (!nonEmptyInitials)
                contribError.initials = "no initials given"
            if (!nonEmptySurname)
                contribError.surname = "no surname given"
        }
        return contribError
    })
}

// TODO test
export const formValidate: (values: DepositFormMetadata) => FormErrors<DepositFormMetadata> = values => {
    const errors: any = {}

    errors.doi = { _error: mandatoryFieldValidator(values.doi, "doi") }

    errors.languageOfDescription = { _error: mandatoryFieldValidator(values.languageOfDescription, "language of description") }

    errors.titles = { _error: mandatoryFieldArrayValidator(values.titles, "titles") }

    errors.description = { _error: mandatoryFieldValidator(values.description, "description") }

    if (values.contributors) {
        const oneContributor = atLeastOneContributor(values.contributors)
        const oneCreator = atLeastOneCreator(values.contributors)

        if (oneContributor)
            errors.contributors = { _error: oneContributor }
        else if (oneCreator)
            errors.contributors = { _error: oneCreator }
        else
            errors.contributors = validateContributors(values.contributors)
    }

    errors.dateCreated = { _error: mandatoryFieldValidator(values.dateCreated, "date created") }

    errors.audiences = { _error: mandatoryFieldArrayValidator(values.audiences, "audiences") }

    console.log("errors", errors)

    return errors
}
