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
import { Contributor, creatorRole, DAI, ISNI, ORCID } from "../../lib/metadata/Contributor"
import { QualifiedDate } from "../../lib/metadata/Date"
import { Relation } from "../../lib/metadata/Relation"
import { QualifiedSchemedValue, SchemedValue } from "../../lib/metadata/Value"
import { Point } from "../../lib/metadata/SpatialPoint"
import { Box } from "../../lib/metadata/SpatialBox"
import { SpatialCoordinatesDropdownListEntry } from "../../model/DropdownLists"

export const mandatoryFieldValidator = (value: any, name: string) => {
    return !value || typeof value == "string" && value.trim() === ""
        ? `No ${name} was provided`
        : undefined
}

export const mandatoryFieldArrayValidator = (values: any[] | undefined, name: string) => {
    return !values || (values && (values.length == 0 || values.filter(value => value && value.trim() !== "").length === 0))
        ? `No ${name} were provided`
        : undefined
}

export const mandatoryRadioButtonValidator = (value: any, name: string) => {
    return !value || typeof value === "object" && Object.keys(value).filter(key => value[key] && value[key].trim() !== "").length === 0
        ? `No ${name} was chosen`
        : undefined
}

export const mandatoryPrivacySensitiveDataValidator = (value: any) => {
    const errMsg = "Please determine whether privacy sensitive data is present in this deposit"
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

export const atLeastOnePersonOrOrganization = (contributors?: Contributor[]) => {
    if (!contributors)
        return "No person or organization details were provided"
    else {
        const nonEmptyContributors = contributors.map(contributor => {
            const nonEmptyOrganization = checkNonEmpty(contributor.organization)
            const nonEmptyTitles = checkNonEmpty(contributor.titles)
            const nonEmptyInitials = checkNonEmpty(contributor.initials)
            const nonEmptyInsertions = checkNonEmpty(contributor.insertions)
            const nonEmptySurname = checkNonEmpty(contributor.surname)
            const nonEmptyDai = checkNonEmpty(contributor.dai)
            const nonEmptyIsni = checkNonEmpty(contributor.isni)
            const nonEmptyOrcid = checkNonEmpty(contributor.orcid)
            // note that 'role' is not part of this validation, as it defaults to 'Creator'

            return nonEmptyOrganization || nonEmptyTitles || nonEmptyInitials || nonEmptyInsertions || nonEmptySurname || nonEmptyDai || nonEmptyIsni || nonEmptyOrcid
        }).reduce((prev, curr) => prev || curr, false)

        if (!nonEmptyContributors)
            return "No person or organization details were provided"
        else
            return undefined
    }
}

export const atLeastOneCreator = (contributors?: Contributor[]) => {
    if (!contributors)
        return "At least one creator is required"
    else {
        const containsCreator = contributors.map(contributor => contributor.role === creatorRole)
            .reduce((prev, curr) => prev || curr, false)

        if (!containsCreator)
            return "At least one creator is required"
        else
            return undefined
    }
}

export const validateContributors: (contributors: Contributor[]) => Contributor[] = (contributors) => {
    // validate that mandatory fields are filled in for each contributor
    return contributors.map((contributor: Contributor) => {
        const nonEmptyOrganization = checkNonEmpty(contributor.organization)
        const nonEmptyTitles = checkNonEmpty(contributor.titles)
        const nonEmptyInitials = checkNonEmpty(contributor.initials)
        const nonEmptyInsertions = checkNonEmpty(contributor.insertions)
        const nonEmptySurname = checkNonEmpty(contributor.surname)
        const nonEmptyDai = checkNonEmpty(contributor.dai)
        const nonEmptyIsni = checkNonEmpty(contributor.isni)
        const nonEmptyOrcid = checkNonEmpty(contributor.orcid)
        const nonEmptyRole = checkNonEmpty(contributor.role)
        const nonEmptyContributor = nonEmptyOrganization
            || nonEmptyTitles
            || nonEmptyInitials
            || nonEmptyInsertions
            || nonEmptySurname
            || nonEmptyDai
            || nonEmptyIsni
            || nonEmptyOrcid
            || nonEmptyRole

        const contribError: Contributor = {}

        if (nonEmptyContributor) {
            if (!nonEmptyOrganization && (!nonEmptyInitials || !nonEmptySurname)) {
                if (!nonEmptyOrganization && !(nonEmptyInitials || nonEmptySurname))
                    contribError.organization = "No organisation given"
                if (!nonEmptyInitials)
                    contribError.initials = "No initials given"
                if (!nonEmptySurname)
                    contribError.surname = "No surname given"
            }

            if (contributor.dai && (!contributor.dai.match(DAI.format) || !isDaiValid(contributor.dai)))
                contribError.dai = `Invalid ${DAI.displayValue} identifier ${DAI.placeholder}`

            if (contributor.isni && !contributor.isni.match(ISNI.format))
                contribError.isni = `Invalid ${ISNI.displayValue} identifier ${ISNI.placeholder}`

            if (contributor.orcid && !contributor.orcid.match(ORCID.format))
                contribError.orcid = `Invalid ${ORCID.displayValue} identifier ${ORCID.placeholder}`
        }

        return contribError
    })
}

export function isDaiValid(daiInput: string): boolean {
    const dai = daiInput.replace(/^(info:eu-repo\/dai\/nl\/)/, "")

    function digest(msg: string, modeMax: number): string {
        const FACTOR_START = 2

        let f = FACTOR_START
        let w = 0

        msg.split("")
            .reverse()
            .forEach(cx => {
                w += f * (cx.charCodeAt(0) - 48)
                f++
                if (f > modeMax)
                    f = FACTOR_START
            })

        const mod = w % 11
        if (mod === 0)
            return "0"

        const c = 11 - mod

        if (c === 10)
            return "X"
        else
            return String.fromCharCode(c + 48)
    }

    const daiLength = dai.length
    if (daiLength > 10 || daiLength < 9)
        return false

    const daiComponent1 = dai.slice(0, -1)
    const daiComponent2 = dai.slice(daiLength - 1)

    if (/^\d+$/.test(daiComponent1)) {
        const checksum = digest(daiComponent1, 9)
        return daiComponent2.toLowerCase() === checksum.toLowerCase()
    }
    return false
}

export const validateSchemedValue: (schemedValues: SchemedValue[]) => SchemedValue[] = schemedValues => {
    return schemedValues.map(id => {
        const nonEmptyScheme = checkNonEmpty(id.scheme)
        const nonEmptyValue = checkNonEmpty(id.value)

        const idError: SchemedValue = {}

        if (!nonEmptyScheme && nonEmptyValue)
            idError.scheme = "No scheme given"

        if (nonEmptyScheme && !nonEmptyValue)
            idError.value = "No identifier given"

        return idError
    })
}

export const validateQualifiedSchemedValues: (qsvs: QualifiedSchemedValue[]) => QualifiedSchemedValue[] = qsvs => {
    function validateQualifiedSchemedValue(qsv: QualifiedSchemedValue): QualifiedSchemedValue {
        const nonEmptyScheme = checkNonEmpty(qsv.scheme)
        const nonEmptyValue = checkNonEmpty(qsv.value)

        const relatedIdentifierError: QualifiedSchemedValue = {}

        if (!nonEmptyScheme)
            relatedIdentifierError.scheme = "No scheme given"
        if (!nonEmptyValue)
            relatedIdentifierError.value = "No identifier given"

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
            relationError.title = "No title given"
            relationError.url = "No url given"
        }
        else if (!nonEmptyTitle && nonEmptyUrl)
            relationError.title = "No title given"

        if (nonEmptyUrl && !validUrl.isWebUri(relation.url))
            relationError.url = "No valid url given"

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

export function validateDates<T extends {toString: () => string}>(dates: QualifiedDate<T>[]): QualifiedDate<string>[] {
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
                    dateError.value = "No date given"

                return dateError
            })
    }
}

function between(x: number, min: number, max: number): boolean {
    return x >= min && x <= max
}

export function validateSpatialPoints(spatialCoordinateSettings: SpatialCoordinatesDropdownListEntry[],
                                      spatialPoints: Point[]): Point[] {
    return spatialPoints.map(point => {
        const nonEmptyScheme = checkNonEmpty(point.scheme)
        const nonEmptyX = checkNonEmpty(point.x)
        const nonEmptyY = checkNonEmpty(point.y)

        const pointError: Point = {}

        if (nonEmptyScheme || nonEmptyX || nonEmptyY) {
            if (!nonEmptyScheme)
                pointError.scheme = "No scheme given"
            if (!nonEmptyX)
                pointError.x = "Coordinate incomplete"
            if (!nonEmptyY)
                pointError.y = "Coordinate incomplete"
        }

        if (nonEmptyScheme) {
            const entry = spatialCoordinateSettings.find(settings => settings.key === point.scheme)

            if (nonEmptyX && entry && !between(Number(point.x), entry.xMin, entry.xMax))
                pointError.x = `${entry.xLabel} is out of range: [${entry.xMin},${entry.xMax}]`

            if (nonEmptyY && entry && !between(Number(point.y), entry.yMin, entry.yMax))
                pointError.y = `${entry.yLabel} is out of range: [${entry.yMin},${entry.yMax}]`
        }

        return pointError
    })
}

export function validateSpatialBoxes(spatialCoordinateSettings: SpatialCoordinatesDropdownListEntry[],
                                     spatialBoxes: Box[]): Box[] {
    return spatialBoxes.map(box => {
        const nonEmptyScheme = checkNonEmpty(box.scheme)
        const nonEmptyNorth = checkNonEmpty(box.north)
        const nonEmptyEast = checkNonEmpty(box.east)
        const nonEmptySouth = checkNonEmpty(box.south)
        const nonEmptyWest = checkNonEmpty(box.west)

        const boxError: Box = {}

        if (nonEmptyScheme || nonEmptyNorth || nonEmptyEast || nonEmptySouth || nonEmptyWest) {
            if (!nonEmptyScheme)
                boxError.scheme = "No scheme given"
            if (!nonEmptyNorth)
                boxError.north = "No north coordinate given"
            if (!nonEmptyEast)
                boxError.east = "No east coordinate given"
            if (!nonEmptySouth)
                boxError.south = "No south coordinate given"
            if (!nonEmptyWest)
                boxError.west = "No west coordinate given"
        }

        if (nonEmptyScheme) {
            const entry = spatialCoordinateSettings.find(settings => settings.key === box.scheme)

            if (nonEmptyNorth && entry && !between(Number(box.north), entry.yMin, entry.yMax))
                boxError.north = `north coordinate is out of range: [${entry.yMin},${entry.yMax}]`

            if (nonEmptyEast && entry && !between(Number(box.east), entry.xMin, entry.xMax))
                boxError.east = `east coordinate is out of range: [${entry.xMin},${entry.xMax}]`

            if (nonEmptySouth && entry && !between(Number(box.south), entry.yMin, entry.yMax))
                boxError.south = `south coordinate is out of range: [${entry.yMin},${entry.yMax}]`

            if (nonEmptyWest && entry && !between(Number(box.west), entry.xMin, entry.xMax))
                boxError.west = `west coordinate is out of range: [${entry.xMin},${entry.xMax}]`
        }

        if (!boxError.north && nonEmptyNorth && nonEmptySouth && Number(box.north) <= Number(box.south))
            boxError.north = "north coordinate must be larger than south coordinate"

        if (!boxError.east && nonEmptyEast && nonEmptyWest && Number(box.east) <= Number(box.west))
            boxError.east = "east coordinate must be larger than west coordinate"

        return boxError
    })
}

export const formValidate: (values: DepositFormMetadata, props: any) => FormErrors<DepositFormMetadata> = (values, props) => {
    const spatialCoordinateSettings = props.dropDowns.spatialCoordinates.state.fetchedList
        ? props.dropDowns.spatialCoordinates.list
        : []

    const errors: any = {}

    // basic information form
    errors.doi = mandatoryFieldValidator(values.doi, "doi")
    errors.languageOfDescription = mandatoryFieldValidator(values.languageOfDescription, "language of description")
    errors.titles = { _error: mandatoryFieldArrayValidator(values.titles, "titles") }
    errors.description = mandatoryFieldValidator(values.description, "description")
    if (values.contributors) {
        const oneContributor = atLeastOnePersonOrOrganization(values.contributors)
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
    errors.spatialPoints = validateSpatialPoints(spatialCoordinateSettings, values.spatialPoints || [])
    errors.spatialBoxes = validateSpatialBoxes(spatialCoordinateSettings, values.spatialBoxes || [])

    // privacy sensitive data form
    errors.privacySensitiveDataPresent = mandatoryPrivacySensitiveDataValidator(values.privacySensitiveDataPresent)

    // accept deposit agreement
    errors.acceptDepositAgreement = checkboxMustBeChecked(values.acceptDepositAgreement, "Accept the deposit agreement before submitting this dataset")

    return errors
}
