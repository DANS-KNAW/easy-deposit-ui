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
import {
    alternativeIdentifersConverter,
    alternativeIdentifierDeconverter,
    archisIdentifierDeconverter,
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
import { emptyQualifiedSchemedValue, emptySchemedValue } from "../lib/metadata/Value"
import {
    contributorConverter,
    contributorDeconverter,
    contributorsConverter,
    emptyContributor,
} from "../lib/metadata/Contributor"
import {
    availableQualifier,
    createdQualifier,
    dateSubmittedQualifier,
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
import { clean, emptyString, isEmptyString, nonEmptyObject, normalizeEmpty } from "../lib/metadata/misc"
import { AppState } from "../model/AppState"
import { licenseConverter, licenseDeconverter } from "../lib/metadata/License"

const metadataFetchConverter: Middleware = createMiddleware<AppState>(({ dispatch, getState }, next, action) => {
    next(action)

    if (action.type === DepositFormConstants.FETCH_METADATA_FULFILLED) {
        const input = action.payload
        const dropDowns = getState().dropDowns

        try {
            const identifiers = input.identifiers && identifiersConverter(input.identifiers)
            const languageOfDescription = input.languageOfDescription
                ? languageOfDescriptionConverter(input.languageOfDescription)
                : emptyString
            const creators = input.creators && input.creators.map(contributorConverter)
            const [rightsHolders, normalContributors] = input.contributors
                ? contributorsConverter(input.contributors)
                : [[], []]
            const { dateCreated, dateAvailable, dates, textDates } = input.dates
                ? qualifiedDatesConverter(dropDowns.dates.list)(input.dates)
                : emptyDates
            const audiences = input.audiences && input.audiences.map(audienceConverter(dropDowns.audiences.list))
            const [subjects, abrSubjects] = input.subjects
                ? subjectConverter(input.subjects)
                : [[], []]
            const [archisIdentifiers, alternativeIdentifiers] = input.alternativeIdentifiers
                ? alternativeIdentifersConverter(dropDowns.identifiers.list)(input.alternativeIdentifiers)
                : [[], []]
            const [relatedIdentifiers, relations] = input.relations
                ? relationsConverter(input.relations)
                : [[], []]
            const [isoLanguageOfFiles, languageOfFiles] = input.languagesOfFiles
                ? languagesOfFilesConverter(input.languagesOfFiles)
                : [[], []]
            const sources = input.sources && input.sources.join("\n\n")
            const instructionsForReuse = input.instructionsForReuse && input.instructionsForReuse.join("\n\n")
            const accessRights = input.accessRights
                ? accessRightConverter(input.accessRights)
                : { category: undefined, group: undefined }
            const license = input.license
                ? licenseConverter(dropDowns.licenses.list)(input.license)
                : emptyString
            const [dcmiTypes, normalTypes] = input.types
                ? typesConverter(dropDowns.dcmiTypes.list)(input.types)
                : [[], []]
            const [imtFormats, normalFormats, hasCmdiFormat] = input.formats
                ? formatsConverter(dropDowns.imtFormats.list)(input.formats)
                : [[], [], false]
            const [abrTemporalCoverages, normalTemporalCoverages] = input.temporalCoverages
                ? temporalCoveragesConverter(input.temporalCoverages)
                : [[], []]
            const spatialPoints = input.spatialPoints && input.spatialPoints.map(pointConverter(dropDowns.spatialCoordinates.list))
            const spatialBoxes = input.spatialBoxes && input.spatialBoxes.map(boxConverter(dropDowns.spatialCoordinates.list))
            const [isoSpatialCoverages, normalSpatialCoverages] = input.spatialCoverages
                ? spatialCoveragesConverter(dropDowns.spatialCoveragesIso.list)(input.spatialCoverages)
                : [[], []]
            const privacySensitiveDataPresent = input.privacySensitiveDataPresent
                ? privacySensitiveDataConverter(input.privacySensitiveDataPresent)
                : PrivacySensitiveDataValue.UNSPECIFIED

            const data: DepositFormMetadata = {
                // basic info
                doi: identifiers && doiConverter(identifiers),
                languageOfDescription: languageOfDescription,
                titles: normalizeEmpty(input.titles, () => emptyString),
                alternativeTitles: normalizeEmpty(input.alternativeTitles, () => emptyString),
                description: input.descriptions && input.descriptions.join("\n\n"),
                creators: normalizeEmpty(creators, () => emptyContributor),
                contributors: normalizeEmpty(normalContributors, () => emptyContributor),
                dateCreated: dateCreated && dateCreated.value,
                audiences: normalizeEmpty(audiences, () => emptyString),
                subjects: normalizeEmpty(subjects, () => emptyString),
                alternativeIdentifiers: normalizeEmpty(alternativeIdentifiers, () => emptySchemedValue),
                relatedIdentifiers: normalizeEmpty(relatedIdentifiers, () => emptyQualifiedSchemedValue),
                relations: normalizeEmpty(relations, () => emptyRelation),
                languagesOfFilesIso639: normalizeEmpty(isoLanguageOfFiles, () => emptyString),
                languagesOfFiles: normalizeEmpty(languageOfFiles, () => emptyString),
                datesIso8601: normalizeEmpty(dates, () => emptyQualifiedDate),
                dates: normalizeEmpty(textDates, () => emptyQualifiedStringDate),
                source: sources,
                instructionsForReuse: instructionsForReuse,

                // license and access
                rightsHolders: normalizeEmpty(rightsHolders, () => emptyContributor),
                publishers: normalizeEmpty(input.publishers, () => emptyString),
                accessRights: accessRights,
                license: license,
                dateAvailable: dateAvailable && dateAvailable.value,

                // upload type
                typesDCMI: normalizeEmpty(dcmiTypes, () => emptyString),
                types: normalizeEmpty(normalTypes, () => emptyString),
                formatsMediaType: normalizeEmpty(imtFormats, () => emptyString),
                formats: normalizeEmpty(normalFormats, () => emptyString),
                extraClarinMetadataPresent: hasCmdiFormat,

                // archaeology specific metadata
                archisNrs: normalizeEmpty(archisIdentifiers.map(sv => sv.value), () => emptyString),
                subjectsAbrComplex: normalizeEmpty(abrSubjects, () => emptyString),
                temporalCoveragesAbr: normalizeEmpty(abrTemporalCoverages, () => emptyString),

                // temporal and spatial coverage
                temporalCoverages: normalizeEmpty(normalTemporalCoverages, () => emptyString),
                spatialPoints: normalizeEmpty(spatialPoints, () => emptyPoint),
                spatialBoxes: normalizeEmpty(spatialBoxes, () => emptyBox),
                spatialCoverageIso3166: normalizeEmpty(isoSpatialCoverages, () => emptyString),
                spatialCoverages: normalizeEmpty(normalSpatialCoverages, () => emptyString),

                // message for data manager
                messageForDataManager: input.messageForDataManager || emptyString,

                // privacy sensitive data
                privacySensitiveDataPresent: privacySensitiveDataPresent,

                // deposit license
                acceptLicenseAgreement: input.acceptLicenseAgreement || false,
            }

            // TODO remove this log once the form is fully implemented.
            console.log(data)

            dispatch(fetchMetadataSucceeded(data))
        }
        catch (errorMessage) {
            dispatch(fetchMetadataFailed(errorMessage))
        }
    }
})

const metadataSendConverter: Middleware = createMiddleware<AppState>(({ dispatch, getState }, next, action) => {
    next(action)

    if (action.type === DepositFormConstants.SAVE_DRAFT || action.type === DepositFormConstants.SUBMIT_DEPOSIT) {
        const data: DepositFormMetadata = action.payload.data
        const dropDowns = getState().dropDowns

        const output = clean({
            // basic info
            identifiers: [data.doi && doiDeconverter(data.doi)].filter(obj => obj !== undefined),
            languageOfDescription: data.languageOfDescription && languageOfDescriptionDeconverter(data.languageOfDescription),
            titles: data.titles && data.titles.filter(t => !isEmptyString(t)),
            alternativeTitles: data.alternativeTitles && data.alternativeTitles.filter(at => !isEmptyString(at)),
            descriptions: data.description && data.description.split("\n\n"),
            creators: data.creators && data.creators.map(contributorDeconverter).filter(nonEmptyObject),
            contributors: [
                ...(data.contributors || []),
                ...(data.rightsHolders || []),
            ].map(contributorDeconverter).filter(nonEmptyObject),
            audiences: data.audiences && data.audiences
                .filter(a => !isEmptyString(a))
                .map(audienceDeconverter(dropDowns.audiences.list)),
            subjects: [
                ...(data.subjects ? data.subjects.map(subjectDeconverter) : []),
                ...(data.subjectsAbrComplex ? data.subjectsAbrComplex.map(subjectAbrDeconverter) : []),
            ].filter(nonEmptyObject),
            alternativeIdentifiers: [
                ...(data.alternativeIdentifiers ? data.alternativeIdentifiers.map(alternativeIdentifierDeconverter) : []),
                ...(data.archisNrs ? data.archisNrs.map(archisIdentifierDeconverter) : []),
            ].filter(nonEmptyObject),
            relations: [
                ...(data.relatedIdentifiers ? data.relatedIdentifiers.map(relatedIdentifierDeconverter) : []),
                ...(data.relations ? data.relations.map(relationDeconverter) : []),
            ].filter(nonEmptyObject),
            languagesOfFiles: [
                ...(data.languagesOfFilesIso639 ? data.languagesOfFilesIso639.map(languageOfFilesIsoDeconverter) : []),
                ...(data.languagesOfFiles ? data.languagesOfFiles.map(languageOfFilesDeconverter) : []),
            ].filter(nonEmptyObject),
            dates: [
                (data.dateCreated && qualifiedDateDeconverter({
                    qualifier: createdQualifier,
                    value: data.dateCreated,
                })),
                (data.dateAvailable && qualifiedDateDeconverter({
                    qualifier: availableQualifier,
                    value: data.dateAvailable,
                })),
                (action.type === DepositFormConstants.SUBMIT_DEPOSIT && qualifiedDateDeconverter({
                    qualifier: dateSubmittedQualifier,
                    value: new Date(),
                })),
                ...(data.datesIso8601 ? data.datesIso8601.map(qualifiedDateDeconverter) : []),
                ...(data.dates ? data.dates.map(qualifiedDateStringDeconverter) : []),
            ].filter(nonEmptyObject),
            source: data.source && data.source.split("\n\n"),
            instructionsForReuse: data.instructionsForReuse && data.instructionsForReuse.split("\n\n"),

            // license and access
            publishers: data.publishers && data.publishers.filter(p => !isEmptyString(p)),
            accessRights: data.accessRights && accessRightDeconverter(data.accessRights), // TODO not sure if this is correct
            license: data.license && licenseDeconverter(data.license),

            // upload type
            types: [
                ...(data.typesDCMI ? data.typesDCMI.map(dcmiTypeDeconverter) : []),
                ...(data.types ? data.types.map(typeDeconverter) : []),
            ].filter(nonEmptyObject),
            formats: [
                ...(data.formatsMediaType ? data.formatsMediaType.map(imtFormatDeconverter) : []),
                ...(data.formats ? data.formats.map(formatDeconverter) : []),
                ...(data.extraClarinMetadataPresent ? [cmdiFormatDeconverter()] : []),
            ].filter(nonEmptyObject),
            temporalCoverages: [
                ...(data.temporalCoveragesAbr ? data.temporalCoveragesAbr.map(abrTemporalCoverageDeconverter) : []),
                ...(data.temporalCoverages ? data.temporalCoverages.map(temporalCoverageDeconverter) : []),
            ].filter(nonEmptyObject),

            // temporal and spatial coverage
            spatialPoints: data.spatialPoints && data.spatialPoints.map(pointDeconverter).filter(nonEmptyObject),
            spatialBoxes: data.spatialBoxes && data.spatialBoxes.map(boxDeconverter).filter(nonEmptyObject),
            spatialCoverages: [
                ...(data.spatialCoverageIso3166 ? data.spatialCoverageIso3166.map(isoSpatialCoverageDeconverter(dropDowns.spatialCoveragesIso.list)) : []),
                ...(data.spatialCoverages ? data.spatialCoverages.map(spatialCoverageDeconverter) : []),
            ].filter(nonEmptyObject),

            // message for data manager
            messageForDataManager: data.messageForDataManager,

            // privacy sensitive data
            privacySensitiveDataPresent: data.privacySensitiveDataPresent && privacySensitiveDataDeconverter(data.privacySensitiveDataPresent),

            // deposit license
            acceptLicenseAgreement: data.acceptLicenseAgreement || undefined,
        })

        // TODO remove this log once the form is fully implemented.
        console.log(`saving draft for ${action.payload.depositId}`, output)

        switch (action.type) {
            case DepositFormConstants.SAVE_DRAFT:
                dispatch(sendSaveDraft(action.payload.depositId, output))
                break
            case DepositFormConstants.SUBMIT_DEPOSIT:
                dispatch(sendSubmitDeposit(action.payload.depositId, output))
                break
        }
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
