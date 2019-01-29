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
import { QualifiedDate } from "../../lib/metadata/Date"
import { Relation } from "../../lib/metadata/Relation"
import { QualifiedSchemedValue, SchemedValue } from "../../lib/metadata/Value"
import { Point } from "../../lib/metadata/SpatialPoint"
import { Box } from "../../lib/metadata/SpatialBox"

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
        const nonEmptyTitles = checkNonEmpty(contributor.titles)
        const nonEmptyInitials = checkNonEmpty(contributor.initials)
        const nonEmptyInsertions = checkNonEmpty(contributor.insertions)
        const nonEmptySurname = checkNonEmpty(contributor.surname)
        const nonEmptyIdentifiers = (contributor.ids || []).reduce(((p, id) => p || checkNonEmpty(id.scheme) || checkNonEmpty(id.value)), false)
        const nonEmptyContributor = nonEmptyOrganization
            || nonEmptyTitles
            || nonEmptyInitials
            || nonEmptyInsertions
            || nonEmptySurname
            || nonEmptyIdentifiers

        const contribError: Contributor = {}

        if (nonEmptyContributor) {
            if (!nonEmptyOrganization && (!nonEmptyInitials || !nonEmptySurname)) {
                if (!nonEmptyOrganization && !(nonEmptyInitials || nonEmptySurname))
                    contribError.organization = "no organization given"
                if (!nonEmptyInitials)
                    contribError.initials = "no initials given"
                if (!nonEmptySurname)
                    contribError.surname = "no surname given"
            }

            if (contributor.ids)
                contribError.ids = validateSchemedValue(contributor.ids)
        }

        return contribError
    })
}

export const validateSchemedValue: (schemedValues: SchemedValue[]) => SchemedValue[] = schemedValues => {
    return schemedValues.map(id => {
        const nonEmptyScheme = checkNonEmpty(id.scheme)
        const nonEmptyValue = checkNonEmpty(id.value)

        const idError: SchemedValue = {}

        if (!nonEmptyScheme && nonEmptyValue)
            idError.scheme = "no scheme defined"

        if (nonEmptyScheme && !nonEmptyValue)
            idError.value = "no identifier defined"

        return idError
    })
}

export const validateQualifiedSchemedValues: (qsvs: QualifiedSchemedValue[]) => QualifiedSchemedValue[] = qsvs => {
    function validateQualifiedSchemedValue(qsv: QualifiedSchemedValue): QualifiedSchemedValue {
        const nonEmptyScheme = checkNonEmpty(qsv.scheme)
        const nonEmptyValue = checkNonEmpty(qsv.value)

        const relatedIdentifierError: QualifiedSchemedValue = {}

        if (!nonEmptyScheme)
            relatedIdentifierError.scheme = "no scheme given"
        if (!nonEmptyValue)
            relatedIdentifierError.value = "no value given"

        return relatedIdentifierError
    }

    switch (qsvs.length) {
        case 0:
            return []
        case 1:
            const qsv = qsvs[0]

            if (checkNonEmpty(qsv.scheme) || checkNonEmpty(qsv.value))
                return [validateQualifiedSchemedValue(qsv)]
            else
                return [{}]
        default:
            return qsvs.map(validateQualifiedSchemedValue)
    }
}

export const validateRelations: (relations: Relation[]) => Relation[] = relations => {
    function validateRelation(relation: Relation): Relation {
        const nonEmptyQualifier = checkNonEmpty(relation.qualifier)
        const nonEmptyTitle = checkNonEmpty(relation.title)
        const nonEmptyUrl = checkNonEmpty(relation.url)

        const relationError: Relation = {}

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
    }

    switch (relations.length) {
        case 0:
            return []
        case 1:
            const relation = relations[0]

            if (checkNonEmpty(relation.title) || checkNonEmpty(relation.url))
                return [validateRelation(relation)]
            else
                return [{}]
        default:
            return relations.map(validateRelation)
    }
}

export function validateDates<T>(dates: QualifiedDate<T>[]): QualifiedDate<string>[] {
    switch (dates.length) {
        case 0:
            return []
        case 1:
            return [{}]
        default:
            return dates.map(date => {
                const nonEmptyValue = checkNonEmpty(date.value && date.value.toString())

                const dateError: QualifiedDate<string> = {}

                if (!nonEmptyValue)
                    dateError.value = "no date given"

                return dateError
            })
    }
}

export const validateSpatialPoints: (spatialPoints: Point[]) => Point[] = spatialPoints => {
    return spatialPoints.map(point => {
        const nonEmptyScheme = checkNonEmpty(point.scheme)
        const nonEmptyX = checkNonEmpty(point.x)
        const nonEmptyY = checkNonEmpty(point.y)

        const pointError: Point = {}

        if (nonEmptyScheme || nonEmptyX || nonEmptyY) {
            if (!nonEmptyScheme)
                pointError.scheme = "no scheme given"
            if (!nonEmptyX)
                pointError.x = "no x coordinate given"
            if (!nonEmptyY)
                pointError.y = "no y coordinate given"
        }

        // TODO validate coordinate w.r.t. the scheme

        return pointError
    })
}

export const validateSpatialBoxes: (spatialBoxes: Box[]) => Box[] = spatialBoxes => {
    return spatialBoxes.map(box => {
        const nonEmptyScheme = checkNonEmpty(box.scheme)
        const nonEmptyNorth = checkNonEmpty(box.north)
        const nonEmptyEast = checkNonEmpty(box.east)
        const nonEmptySouth = checkNonEmpty(box.south)
        const nonEmptyWest = checkNonEmpty(box.west)

        const boxError: Box = {}

        if (nonEmptyScheme || nonEmptyNorth || nonEmptyEast || nonEmptySouth || nonEmptyWest) {
            if (!nonEmptyScheme)
                boxError.scheme = "no scheme given"
            if (!nonEmptyNorth)
                boxError.north = "no north coordinate given"
            if (!nonEmptyEast)
                boxError.east = "no east coordinate given"
            if (!nonEmptySouth)
                boxError.south = "no south coordinate given"
            if (!nonEmptyWest)
                boxError.west = "no west coordinate given"
        }

        // TODO validate coordinates w.r.t. the scheme

        return boxError
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
    errors.alternativeIdentifiers = validateSchemedValue(values.alternativeIdentifiers || [])
    errors.relatedIdentifiers = validateQualifiedSchemedValues(values.relatedIdentifiers || [])
    errors.relations = validateRelations(values.relations || [])
    errors.datesIso8601 = validateDates(values.datesIso8601 || [])
    errors.dates = validateDates(values.dates || [])

    // license and access form
    errors.rightsHolders = validateContributors(values.rightsHolders || [])
    errors.accessRights = mandatoryRadioButtonValidator(values.accessRights, "access right")
    errors.license = mandatoryRadioButtonValidator(values.license, "license")
    errors.dateAvailable = dateAvailableMustBeAfterDateCreated(values.dateCreated, values.dateAvailable)

    // temporal and spatial coverage form
    errors.spatialPoints = validateSpatialPoints(values.spatialPoints || [])
    errors.spatialBoxes = validateSpatialBoxes(values.spatialBoxes || [])

    // privacy sensitive data form
    errors.privacySensitiveDataPresent = mandatoryPrivacySensitiveDataValidator(values.privacySensitiveDataPresent)

    // accept deposit agreement
    errors.acceptDepositAgreement = checkboxMustBeChecked(values.acceptDepositAgreement, "Accept the deposit agreement before submitting this dataset")

    console.log("validation errors", errors)

    return errors
}
