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
import * as validUrl from "valid-url"
import { FormErrors } from "redux-form"
import { PrivacySensitiveDataValue } from "../../lib/metadata/PrivacySensitiveData"
import { DepositFormMetadata } from "./parts"
import { Contributor, creatorRole } from "../../lib/metadata/Contributor"
import { Relation } from "../../lib/metadata/Relation"
import { QualifiedSchemedValue } from "../../lib/metadata/Value"

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

export const mandatoryRadioButtonValidator = (value: any, name: string) => {
    return !value || typeof value === "object" && Object.keys(value).filter(key => value[key] && value[key].trim() !== "").length === 0
        ? `no ${name} was chosen`
        : undefined
}

export const mandatoryPrivacySensitiveDataValidator = (value: any) => {
    const errMsg = "please determine whether privacy sensitive data is present in this deposit"
    if (!value)
        return errMsg
    else if (typeof value === "string" && (value.trim() === "" || value.trim() === PrivacySensitiveDataValue.UNSPECIFIED))
        return errMsg
    else if (typeof value === "object" && Object.keys(value).filter(key => value[key] && value[key].trim() !== "").length === 0)
        return errMsg
    else
        return undefined
}

export const checkboxMustBeChecked = (value: boolean | undefined, msg: string) => {
    return !value ? msg : undefined
}

export const dateAvailableMustBeAfterDateCreated = (dateCreated?: Date, dateAvailable?: Date) => {
    return dateCreated && dateAvailable && dateAvailable < dateCreated
        ? "'Date available' cannot be a date earlier than 'Date created'"
        : undefined
}

const checkNonEmpty: (s: string | undefined) => boolean = s => s ? s.trim() !== "" : false

export const atLeastOneContributor = (contributors?: Contributor[]) => {
    if (!contributors)
        return "no contributors were provided"
    else {
        const nonEmptyContributors = contributors.map(contributor => {
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

        if (!nonEmptyContributors)
            return "no contributors were provided"
        else
            return undefined
    }
}

export const atLeastOneCreator = (contributors?: Contributor[]) => {
    if (!contributors)
        return "at least one creator is required"
    else {
        const containsCreator = contributors.map(contributor => contributor.role === creatorRole)
            .reduce((prev, curr) => prev || curr, false)

        if (!containsCreator)
            return "at least one creator is required"
        else
            return undefined
    }
}

export const validateContributors: (contributors: Contributor[]) => Contributor[] = contributors => {
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

export const validateQualifiedSchemedValue: (relatedIdentifiers: QualifiedSchemedValue[]) => QualifiedSchemedValue[] = relatedIdentifiers => {
    return relatedIdentifiers.map(relatedIdentifier => {
        const nonEmptyScheme = checkNonEmpty(relatedIdentifier.scheme)
        const nonEmptyValue = checkNonEmpty(relatedIdentifier.value)

        const relatedIdentifierError: QualifiedSchemedValue = {}

        if (!nonEmptyScheme)
            relatedIdentifierError.scheme = "no scheme given"
        if (!nonEmptyValue)
            relatedIdentifierError.value = "no value given"

        return relatedIdentifierError
    })
}

export const validateRelations: (relations: Relation[]) => Relation[] = relations => {
    return relations.map(relation => {
        const nonEmptyQualifier = checkNonEmpty(relation.qualifier)
        const nonEmptyTitle = checkNonEmpty(relation.title)
        const nonEmptyUrl = checkNonEmpty(relation.url)

        const relationError: Relation = {}

        // validation rules copied from easy-split-multi-deposit
        if (nonEmptyQualifier && !nonEmptyTitle && !nonEmptyUrl) {
            relationError.title = "no title given"
            relationError.url = "no url given"
        }
        else if (!nonEmptyTitle && nonEmptyUrl) {
            relationError.title = "no title given"
        }

        if (nonEmptyUrl && !validUrl.isUri(relation.url)) {
            relationError.url = "no valid url given"
        }

        return relationError
    })
}

export const formValidate: (values: DepositFormMetadata) => FormErrors<DepositFormMetadata> = values => {
    const errors: any = {}

    // basic information form
    errors.doi = mandatoryFieldValidator(values.doi, "doi")
    errors.languageOfDescription = mandatoryFieldValidator(values.languageOfDescription, "language of description")
    errors.titles = { _error: mandatoryFieldArrayValidator(values.titles, "titles") }
    errors.description = mandatoryFieldValidator(values.description, "description")
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
    errors.dateCreated = mandatoryFieldValidator(values.dateCreated, "date created")
    errors.audiences = { _error: mandatoryFieldArrayValidator(values.audiences, "audiences") }
    errors.relatedIdentifiers = validateQualifiedSchemedValue(values.relatedIdentifiers || [])
    errors.relations = validateRelations(values.relations || [])

    // license and access form
    errors.accessRights = mandatoryRadioButtonValidator(values.accessRights, "access right")
    errors.license = mandatoryRadioButtonValidator(values.license, "license")
    errors.dateAvailable = dateAvailableMustBeAfterDateCreated(values.dateCreated, values.dateAvailable)

    // privacy sensitive data form
    errors.privacySensitiveDataPresent = mandatoryPrivacySensitiveDataValidator(values.privacySensitiveDataPresent)

    // accept deposit agreement
    errors.acceptDepositAgreement = checkboxMustBeChecked(values.acceptDepositAgreement, "Accept the deposit agreement before submitting this dataset")

    console.log("validation errors", errors)

    return errors
}
