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
import { Middleware } from "redux"
import { createMiddleware } from "../lib/redux"
import { DepositFormConstants, depositFormName, saveDraftResetTimeout } from "../constants/depositFormConstants"
import { push } from "react-router-redux"
import { depositOverviewRoute } from "../constants/clientRoutes"
import { DepositFormMetadata } from "../components/form/parts"
import {
    fetchDoiSucceeded,
    fetchMetadataFailed,
    fetchMetadataSucceeded,
    sendSaveDraft,
    sendSaveDraftReset,
    sendSubmitDeposit,
} from "../actions/depositFormActions"
import { change } from "redux-form"
import * as lodash from "lodash"
import {
    alternativeIdentifersConverter,
    alternativeIdentifierDeconverter,
    doiConverter,
    doiDeconverter,
    identifiersConverter,
} from "../lib/metadata/Identifier"
import {
    languageOfDescriptionConverter,
    languageOfDescriptionDeconverter,
    languageOfFilesDeconverter,
    languageOfFilesIsoDeconverter,
    languagesOfFilesConverter,
} from "../lib/metadata/Language"
import {
    emptyQualifiedSchemedValue,
    emptySchemedValue,
    emptyStringValue,
    unwrapValue,
    wrapValue,
} from "../lib/metadata/Value"
import { contributorsConverter, creatorConverter, creatorDeconverter, emptyCreator } from "../lib/metadata/Creator"
import {
    DateQualifier,
    emptyDates,
    emptyQualifiedDate,
    emptyQualifiedStringDate,
    qualifiedDateDeconverter,
    qualifiedDatesConverter,
    qualifiedDateStringDeconverter,
} from "../lib/metadata/Date"
import { audienceConverter, audienceDeconverter } from "../lib/metadata/Audience"
import { subjectAbrDeconverter, subjectConverter, subjectDeconverter } from "../lib/metadata/Subject"
import {
    emptyRelation,
    relatedIdentifierDeconverter,
    relationDeconverter,
    relationsConverter,
} from "../lib/metadata/Relation"
import { accessRightConverter, accessRightDeconverter } from "../lib/metadata/AccessRight"
import { dcmiTypeDeconverter, typeDeconverter, typesConverter } from "../lib/metadata/Types"
import {
    cmdiFormatDeconverter,
    formatDeconverter,
    formatsConverter,
    imtFormatDeconverter,
} from "../lib/metadata/Formats"
import {
    abrTemporalCoverageDeconverter,
    temporalCoverageDeconverter,
    temporalCoveragesConverter,
} from "../lib/metadata/TemporalCoverage"
import { emptyPoint, pointConverter, pointDeconverter } from "../lib/metadata/SpatialPoint"
import { boxConverter, boxDeconverter, emptyBox } from "../lib/metadata/SpatialBox"
import {
    isoSpatialCoverageDeconverter,
    spatialCoverageDeconverter,
    spatialCoveragesConverter,
} from "../lib/metadata/SpatialCoverage"
import {
    privacySensitiveDataConverter,
    privacySensitiveDataDeconverter,
    PrivacySensitiveDataValue,
} from "../lib/metadata/PrivacySensitiveData"
import {isEmpty} from "lodash"

function normalizeEmpty<T>(arr: T[] | undefined, defaultValue: () => T): T[] {
    if (!arr || isEmpty(arr))
        return [defaultValue()]
    else
        return arr
}

const metadataFetchConverter: Middleware = createMiddleware(({ dispatch }, next, action) => {
    next(action)

    if (action.type === DepositFormConstants.FETCH_METADATA_FULFILLED) {
        const input = action.payload

        try {
            const identifiers = input.identifiers && identifiersConverter(input.identifiers)
            const languageOfDescription = input.languageOfDescription
                ? languageOfDescriptionConverter(input.languageOfDescription)
                : ""
            const titles = input.titles && input.titles.map(wrapValue)
            const alternativeTitles = input.alternativeTitles && input.alternativeTitles.map(wrapValue)
            const creators = input.creators && input.creators.map(creatorConverter)
            const [rightsHolders, normalContributors] = input.contributors
                ? contributorsConverter(input.contributors)
                : [[], []]
            const {dateCreated, dateAvailable, dateSubmitted, dates, textDates} = input.dates
                ? qualifiedDatesConverter(input.dates)
                : emptyDates
            const audiences = input.audiences && input.audiences.map(audienceConverter)
            const [subjects, abrSubjects] = input.subjects
                ? subjectConverter(input.subjects)
                : [[], []]
            const [archisIdentifiers, alternativeIdentifiers] = input.alternativeIdentifiers
                ? alternativeIdentifersConverter(input.alternativeIdentifiers)
                : [[], []]
            const [relatedIdentifiers, relations] = input.relations
                ? relationsConverter(input.relations)
                : [[], []]
            const [isoLanguageOfFiles, languageOfFiles] = input.languagesOfFiles
                ? languagesOfFilesConverter(input.languagesOfFiles)
                : [[], []]
            const sources = input.sources && input.sources.join("\n\n")
            const instructionsForReuse = input.instructionsForReuse && input.instructionsForReuse.join("\n\n")
            const publishers = input.publishers && input.publishers.map(wrapValue)
            const accessRights = input.accessRights
                ? accessRightConverter(input.accessRights)
                : { category: undefined, group: undefined }
            const [dcmiTypes, normalTypes] = input.types
                ? typesConverter(input.types)
                : [[], []]
            const [imtFormats, normalFormats, hasCmdiFormat] = input.formats
                ? formatsConverter(input.formats)
                : [[], [], false]
            const [abrTemporalCoverages, normalTemporalCoverages] = input.temporalCoverages
                ? temporalCoveragesConverter(input.temporalCoverages)
                : [[], []]
            const spatialPoints = input.spatialPoints && input.spatialPoints.map(pointConverter)
            const spatialBoxes = input.spatialBoxes && input.spatialBoxes.map(boxConverter)
            const [isoSpatialCoverages, normalSpatialCoverages] = input.spatialCoverages
                ? spatialCoveragesConverter(input.spatialCoverages)
                : [[], []]
            const privacySensitiveDataPresent = input.privacySensitiveDataPresent
                ? privacySensitiveDataConverter(input.privacySensitiveDataPresent)
                : PrivacySensitiveDataValue.UNSPECIFIED

            const data: DepositFormMetadata = {
                // basic info
                doi: identifiers && doiConverter(identifiers),
                languageOfDescription: languageOfDescription,
                titles: normalizeEmpty(titles, () => emptyStringValue),
                alternativeTitles: normalizeEmpty(alternativeTitles, () => emptyStringValue),
                description: input.descriptions && input.descriptions.join("\n\n"),
                creators: normalizeEmpty(creators, () => emptyCreator),
                contributors: normalizeEmpty(normalContributors, () => emptyCreator),
                dateCreated: dateCreated && dateCreated.value,
                audiences: normalizeEmpty(audiences, () => emptyStringValue),
                subjects: normalizeEmpty(subjects, () => emptyStringValue),
                alternativeIdentifiers: normalizeEmpty(alternativeIdentifiers, () => emptySchemedValue),
                relatedIdentifiers: normalizeEmpty(relatedIdentifiers, () => emptyQualifiedSchemedValue),
                relations: normalizeEmpty(relations, () => emptyRelation),
                languagesOfFilesIso639: normalizeEmpty(isoLanguageOfFiles, () => emptyStringValue),
                languagesOfFiles: normalizeEmpty(languageOfFiles, () => emptyStringValue),
                datesIso8601: normalizeEmpty(dates, () => emptyQualifiedDate),
                dates: normalizeEmpty(textDates, () => emptyQualifiedStringDate),
                source: sources,
                instructionsForReuse: instructionsForReuse,

                // license and access
                rightsHolders: normalizeEmpty(rightsHolders, () => emptyCreator),
                publishers: normalizeEmpty(publishers, () => emptyStringValue),
                accessRights: accessRights,
                license: input.license || "",
                dateAvailable: dateAvailable && dateAvailable.value,

                // upload type
                typesDCMI: normalizeEmpty(dcmiTypes, () => emptyStringValue),
                types: normalizeEmpty(normalTypes, () => emptyStringValue),
                formatsMediaType: normalizeEmpty(imtFormats, () => emptyStringValue),
                formats: normalizeEmpty(normalFormats, () => emptyStringValue),
                extraClarinMetadataPresent: hasCmdiFormat,

                // archaeology specific metadata
                archisNrs: normalizeEmpty(archisIdentifiers, () => emptyStringValue),
                subjectsAbrComplex: normalizeEmpty(abrSubjects, () => emptyStringValue),
                temporalCoveragesAbr: normalizeEmpty(abrTemporalCoverages, () => emptyStringValue),

                // temporal and spatial coverage
                temporalCoverages: normalizeEmpty(normalTemporalCoverages, () => emptyStringValue),
                spatialPoints: normalizeEmpty(spatialPoints, () => emptyPoint),
                spatialBoxes: normalizeEmpty(spatialBoxes, () => emptyBox),
                spatialCoverageIso3166: normalizeEmpty(isoSpatialCoverages, () => emptyStringValue),
                spatialCoverages: normalizeEmpty(normalSpatialCoverages, () => emptyStringValue),

                // message for data manager
                messageForDataManager: input.messageForDataManager || "",

                // privacy sensitive data
                privacySensitiveDataPresent: privacySensitiveDataPresent,

                // deposit license
                acceptLicenseAgreement: input.acceptLicenseAgreement || false,
            }

            console.log(data)

            dispatch(fetchMetadataSucceeded(data))
        }
        catch (errorMessage) {
            console.log(errorMessage)
            dispatch(fetchMetadataFailed(errorMessage))
        }
    }
})

const metadataSendConverter: Middleware = createMiddleware(({ dispatch }, next, action) => {
    next(action)

    if (action.type === DepositFormConstants.SAVE_DRAFT || action.type === DepositFormConstants.SUBMIT_DEPOSIT) {
        const data: DepositFormMetadata = action.payload.data

        const output = {
            // basic info
            indentifiers: [data.doi && doiDeconverter(data.doi)].filter(obj => obj !== undefined),
            languageOfDescription: data.languageOfDescription && languageOfDescriptionDeconverter(data.languageOfDescription),
            titles: data.titles && data.titles.map(unwrapValue),
            alternativeTitles: data.alternativeTitles && data.alternativeTitles.map(unwrapValue),
            descriptions: data.description && data.description.split("\n\n"),
            creators: data.creators && data.creators.map(creatorDeconverter),
            contributors: [...(data.contributors || []), ...(data.rightsHolders || [])].map(creatorDeconverter),
            audiences: data.audiences && data.audiences.map(audienceDeconverter),
            subjects: [
                ...(data.subjects ? data.subjects.map(subjectDeconverter) : []),
                ...(data.subjectsAbrComplex ? data.subjectsAbrComplex.map(subjectAbrDeconverter) : [])
            ],
            alternativeIdentifiers: [
                ...(data.alternativeIdentifiers ? data.alternativeIdentifiers.map(alternativeIdentifierDeconverter) : []),
                ...(data.archisNrs ? data.archisNrs.map(alternativeIdentifierDeconverter) : [])
            ],
            relations: [
                ...(data.relatedIdentifiers ? data.relatedIdentifiers.map(relatedIdentifierDeconverter) : []),
                ...(data.relations ? data.relations.map(relationDeconverter) : []),
            ],
            languagesOfFiles: [
                ...(data.languagesOfFilesIso639 ? data.languagesOfFilesIso639.map(languageOfFilesIsoDeconverter) : []),
                ...(data.languagesOfFiles ? data.languagesOfFiles.map(languageOfFilesDeconverter) : [])
            ],
            dates: [
                (data.dateCreated && qualifiedDateDeconverter({qualifier: DateQualifier.created, value: data.dateCreated})),
                (data.dateAvailable && qualifiedDateDeconverter({qualifier: DateQualifier.available, value: data.dateAvailable})),
                // TODO dateSubmitted if submit; not if only save
                ...(data.datesIso8601 ? data.datesIso8601.map(qualifiedDateDeconverter) : []),
                ...(data.dates ? data.dates.map(qualifiedDateStringDeconverter) : []),
            ],
            source: data.source && data.source.split("\n\n"),
            instructionsForReuse: data.instructionsForReuse && data.instructionsForReuse.split("\n\n"),

            // license and access
            publishers: data.publishers && data.publishers.map(unwrapValue),
            accessRights: data.accessRights && accessRightDeconverter(data.accessRights), // TODO not sure if this is correct
            license: data.license,

            // upload type
            types: [
                ...(data.typesDCMI ? data.typesDCMI.map(dcmiTypeDeconverter) : []),
                ...(data.types ? data.types.map(typeDeconverter) : []),
            ],
            formats: [
                ...(data.formatsMediaType ? data.formatsMediaType.map(imtFormatDeconverter) : []),
                ...(data.formats ? data.formats.map(formatDeconverter) : []),
                ...(data.extraClarinMetadataPresent ? [cmdiFormatDeconverter] : []),
            ],
            temporalCoverages: [
                ...(data.temporalCoveragesAbr ? data.temporalCoveragesAbr.map(abrTemporalCoverageDeconverter) : []),
                ...(data.temporalCoverages ? data.temporalCoverages.map(temporalCoverageDeconverter) : []),
            ],

            // temporal and spatial coverage
            spatialPoints: data.spatialPoints && data.spatialPoints.map(pointDeconverter),
            spatialBoxes: data.spatialBoxes && data.spatialBoxes.map(boxDeconverter),
            spatialCoverages: [
                ...(data.spatialCoverageIso3166 ? data.spatialCoverageIso3166.map(isoSpatialCoverageDeconverter) : []),
                ...(data.spatialCoverages ? data.spatialCoverages.map(spatialCoverageDeconverter) : []),
            ],

            // message for data manager
            messageForDataManager: data.messageForDataManager,

            // privacy sensitive data
            privacySensitiveDataPresent: data.privacySensitiveDataPresent && privacySensitiveDataDeconverter(data.privacySensitiveDataPresent),

            // deposit license
            acceptLicenseAgreement: data.acceptLicenseAgreement,
        }

        // TODO remove this alert once the form is fully implemented. Replace with console.log if necessary.
        console.log(output)
        alert(`saving draft for ${action.payload.depositId}:\n\n${JSON.stringify(output, null, 2)}`)

        // switch (action.type) {
        //     case DepositFormConstants.SAVE_DRAFT:
        //         dispatch(sendSaveDraft(action.payload.depositId, output))
        //         break
        //     case DepositFormConstants.SUBMIT_DEPOSIT:
        //         dispatch(sendSubmitDeposit(action.payload.depositId, output))
        //         break
        // }
    }
})

const fetchDoiProcessor: Middleware = createMiddleware(({ dispatch }, next, action) => {
    next(action)

    if (action.type === DepositFormConstants.FETCH_DOI_FULFILLED) {
        dispatch(change(depositFormName, "doi", action.payload.doi))
        dispatch(fetchDoiSucceeded())
    }
})

const saveTimer: Middleware = createMiddleware(({ dispatch }, next, action) => {
    next(action)

    if (action.type === DepositFormConstants.SEND_SAVE_DRAFT_FULFILLED) {
        setTimeout(() => dispatch(sendSaveDraftReset()), saveDraftResetTimeout * 1000)
    }
})

const submitReroute: Middleware = createMiddleware(({ dispatch }, next, action) => {
    if (action.type === DepositFormConstants.SEND_SUBMIT_DEPOSIT_FULFILLED) {
        dispatch(push(depositOverviewRoute))
    }

    next(action)
})

export const depositFormMiddleware = [
    metadataFetchConverter,
    metadataSendConverter,
    fetchDoiProcessor,
    saveTimer,
    submitReroute,
]
