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
import { DepositFormMetadata } from "../../components/form/parts"
import { DropdownLists } from "../../model/DropdownLists"
import {
    languageOfDescriptionConverter,
    languageOfDescriptionDeconverter,
    languageOfFilesDeconverter,
    languageOfFilesIsoDeconverter,
    languagesOfFilesConverter,
} from "./Language"
import { accessRightConverter, accessRightDeconverter, AccessRightValue } from "./AccessRight"
import {
    availableQualifier,
    createdQualifier,
    emptyDates,
    emptyQualifiedDate,
    emptyQualifiedStringDate,
    qualifiedDateDeconverter,
    qualifiedDatesConverter,
    qualifiedDateStringDeconverter,
} from "./Date"
import { emptyPoint, pointConverter, pointDeconverter } from "./SpatialPoint"
import {
    alternativeIdentifersConverter,
    alternativeIdentifierDeconverter,
    archisIdentifierDeconverter,
    doiConverter,
    doiDeconverter,
    identifiersConverter,
} from "./Identifier"
import { dcmiTypeDeconverter, typeDeconverter, typesConverter } from "./Type"
import {
    privacySensitiveDataConverter,
    privacySensitiveDataDeconverter,
    PrivacySensitiveDataValue,
} from "./PrivacySensitiveData"
import { emptyQualifiedSchemedValue, emptySchemedValue } from "./Value"
import { emptyLicense, licenseConverter, licenseDeconverter } from "./License"
import { emptyRelation, relatedIdentifierDeconverter, relationDeconverter, relationsConverter } from "./Relation"
import { clean, emptyString, isEmptyString, nonEmptyObject, normalizeEmpty } from "./misc"
import { cmdiFormatDeconverter, formatDeconverter, formatsConverter, imtFormatDeconverter } from "./Format"
import {
    abrTemporalCoverageDeconverter,
    temporalCoverageDeconverter,
    temporalCoveragesConverter,
} from "./TemporalCoverage"
import {
    Contributor,
    contributorDeconverter,
    contributorsConverter,
    creatorConverter,
    creatorDeconverter,
    emptyCreator,
    emptyRightsholder,
    rightsHolderDeconverter,
    splitCreatorsAndContributors,
} from "./Contributor"
import { subjectAbrDeconverter, subjectConverter, subjectDeconverter } from "./Subject"
import { audienceConverter, audienceDeconverter } from "./Audience"
import { boxConverter, boxDeconverter, emptyBox } from "./SpatialBox"
import { isoSpatialCoverageDeconverter, spatialCoverageDeconverter, spatialCoveragesConverter } from "./SpatialCoverage"

export const metadataConverter: (input: any, dropDowns: DropdownLists) => DepositFormMetadata = (input, dropDowns) => {
    const identifiers = input.identifiers && identifiersConverter(input.identifiers)
    const languageOfDescription = input.languageOfDescription
        ? languageOfDescriptionConverter(dropDowns.languages.list)(input.languageOfDescription)
        : emptyString
    const creators = input.creators && input.creators.map(creatorConverter(dropDowns.contributorIds.list))
    const [rightsHolders, normalContributors] = input.contributors
        ? contributorsConverter(dropDowns.contributorIds.list, dropDowns.contributorRoles.list)(input.contributors)
        : [[], []]
    const { dateCreated, dateAvailable, dates, textDates } = input.dates
        ? qualifiedDatesConverter(dropDowns.dates.list)(input.dates)
        : emptyDates
    const audiences = input.audiences && input.audiences.map(audienceConverter(dropDowns.audiences.list))
    const [subjects, abrSubjects] = input.subjects
        ? subjectConverter(dropDowns.abrComplexSubjects.list)(input.subjects)
        : [[], []]
    const [archisIdentifiers, alternativeIdentifiers] = input.alternativeIdentifiers
        ? alternativeIdentifersConverter(dropDowns.identifiers.list)(input.alternativeIdentifiers)
        : [[], []]
    const [relatedIdentifiers, relations] = input.relations
        ? relationsConverter(dropDowns.relations.list, dropDowns.identifiers.list)(input.relations)
        : [[], []]
    const [isoLanguageOfFiles, languageOfFiles] = input.languagesOfFiles
        ? languagesOfFilesConverter(dropDowns.languages.list)(input.languagesOfFiles)
        : [[], []]
    const sources = input.sources && input.sources.join("\n\n")
    const instructionsForReuse = input.instructionsForReuse && input.instructionsForReuse.join("\n\n")
    const accessRights = input.accessRights
        ? accessRightConverter(input.accessRights)
        : { category: AccessRightValue.OPEN_ACCESS }
    const license = input.license
        ? licenseConverter(dropDowns.licenses.list)(input.license)
        : emptyLicense
    const [dcmiTypes, normalTypes] = input.types
        ? typesConverter(dropDowns.dcmiTypes.list)(input.types)
        : [[], []]
    const [imtFormats, normalFormats, hasCmdiFormat] = input.formats
        ? formatsConverter(dropDowns.imtFormats.list)(input.formats)
        : [[], [], false]
    const [abrTemporalCoverages, normalTemporalCoverages] = input.temporalCoverages
        ? temporalCoveragesConverter(dropDowns.abrPeriodeTemporals.list)(input.temporalCoverages)
        : [[], []]
    const spatialPoints = input.spatialPoints && input.spatialPoints.map(pointConverter(dropDowns.spatialCoordinates.list))
    const spatialBoxes = input.spatialBoxes && input.spatialBoxes.map(boxConverter(dropDowns.spatialCoordinates.list))
    const [isoSpatialCoverages, normalSpatialCoverages] = input.spatialCoverages
        ? spatialCoveragesConverter(dropDowns.spatialCoveragesIso.list)(input.spatialCoverages)
        : [[], []]
    const privacySensitiveDataPresent = input.privacySensitiveDataPresent
        ? privacySensitiveDataConverter(input.privacySensitiveDataPresent)
        : PrivacySensitiveDataValue.UNSPECIFIED

    return {
        // basic info
        doi: identifiers && doiConverter(identifiers),
        languageOfDescription: languageOfDescription,
        titles: normalizeEmpty(input.titles, () => emptyString),
        alternativeTitles: normalizeEmpty(input.alternativeTitles, () => emptyString),
        description: input.descriptions && input.descriptions.join("\n\n"),
        contributors: normalizeEmpty([...(creators || []), ...(normalContributors || [])], () => emptyCreator),
        dateCreated: dateCreated && dateCreated.value,
        audiences: normalizeEmpty(audiences, () => emptyString),
        subjects: normalizeEmpty(subjects, () => emptyString),
        alternativeIdentifiers: normalizeEmpty(alternativeIdentifiers, () => emptySchemedValue),
        relatedIdentifiers: normalizeEmpty(relatedIdentifiers, () => emptyQualifiedSchemedValue(dropDowns.relations.list)),
        relations: normalizeEmpty(relations, () => emptyRelation(dropDowns.relations.list)),
        languagesOfFilesIso639: normalizeEmpty(isoLanguageOfFiles, () => emptyString),
        languagesOfFiles: normalizeEmpty(languageOfFiles, () => emptyString),
        datesIso8601: normalizeEmpty(dates, () => emptyQualifiedDate(dropDowns.dates.list)),
        dates: normalizeEmpty(textDates, () => emptyQualifiedStringDate(dropDowns.dates.list)),
        source: sources,
        instructionsForReuse: instructionsForReuse,

        // license and access
        rightsHolders: normalizeEmpty(rightsHolders, () => emptyRightsholder),
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
        archisNrs: normalizeEmpty(archisIdentifiers.map(sv => sv.value || emptyString).filter(v => v !== emptyString), () => emptyString),
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

        // deposit agreement
        acceptDepositAgreement: input.acceptDepositAgreement || false,
    }
}

export const metadataDeconverter: (data: DepositFormMetadata, dropDowns: DropdownLists, isSubmitting: boolean) => any = (data, dropDowns, isSubmitting) => {
    const [creators, contributors]: [Contributor[], Contributor[]] = data.contributors
        ? splitCreatorsAndContributors(data.contributors)
        : [[], []]

    return clean({
        // basic info
        identifiers: [data.doi && doiDeconverter(data.doi)].filter(obj => obj !== undefined),
        languageOfDescription: data.languageOfDescription && languageOfDescriptionDeconverter(dropDowns.languages.list)(data.languageOfDescription),
        titles: data.titles && data.titles.filter(t => !isEmptyString(t)),
        alternativeTitles: data.alternativeTitles && data.alternativeTitles.filter(at => !isEmptyString(at)),
        descriptions: data.description && [data.description],
        creators: creators.map(creatorDeconverter).filter(nonEmptyObject),
        contributors: [
            ...(contributors ? contributors.map(contributorDeconverter(dropDowns.contributorRoles.list)) : []),
            ...(data.rightsHolders ? data.rightsHolders.map(rightsHolderDeconverter) : []),
        ].filter(nonEmptyObject),
        audiences: data.audiences && data.audiences
            .filter(a => !isEmptyString(a))
            .map(audienceDeconverter(dropDowns.audiences.list)),
        subjects: [
            ...(data.subjects ? data.subjects.map(subjectDeconverter) : []),
            ...(data.subjectsAbrComplex ? data.subjectsAbrComplex.map(subjectAbrDeconverter(dropDowns.abrComplexSubjects.list)) : []),
        ].filter(nonEmptyObject),
        alternativeIdentifiers: [
            ...(data.alternativeIdentifiers ? data.alternativeIdentifiers.map(alternativeIdentifierDeconverter) : []),
            ...(data.archisNrs ? data.archisNrs.map(archisIdentifierDeconverter) : []),
        ].filter(nonEmptyObject),
        relations: [
            ...(data.relatedIdentifiers ? data.relatedIdentifiers.map(relatedIdentifierDeconverter) : []),
            ...(data.relations ? data.relations.map(relationDeconverter(dropDowns.relations.list)) : []),
        ].filter(nonEmptyObject),
        languagesOfFiles: [
            ...(data.languagesOfFilesIso639 ? data.languagesOfFilesIso639.map(languageOfFilesIsoDeconverter(dropDowns.languages.list)) : []),
            ...(data.languagesOfFiles ? data.languagesOfFiles.map(languageOfFilesDeconverter) : []),
        ].filter(nonEmptyObject),
        dates: [
            (data.dateCreated && qualifiedDateDeconverter(dropDowns.dates.list)({
                qualifier: createdQualifier,
                value: data.dateCreated,
            })),
            (data.dateAvailable
                ? qualifiedDateDeconverter(dropDowns.dates.list)({
                    qualifier: availableQualifier,
                    value: data.dateAvailable,
                })
                : isSubmitting
                    ? qualifiedDateDeconverter(dropDowns.dates.list)({
                        qualifier: availableQualifier,
                        value: new Date(),
                    })
                    : {}),
            ...(data.datesIso8601 ? data.datesIso8601.map(qualifiedDateDeconverter(dropDowns.dates.list)) : []),
            ...(data.dates ? data.dates.map(qualifiedDateStringDeconverter(dropDowns.dates.list)) : []),
        ].filter(nonEmptyObject),
        sources: data.source && [data.source],
        instructionsForReuse: data.instructionsForReuse && [data.instructionsForReuse],

        // license and access
        publishers: data.publishers && data.publishers.filter(p => !isEmptyString(p)),
        accessRights: data.accessRights && accessRightDeconverter(data.accessRights),
        license: data.license && licenseDeconverter(dropDowns.licenses.list)(data.license),

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
            ...(data.temporalCoveragesAbr ? data.temporalCoveragesAbr.map(abrTemporalCoverageDeconverter(dropDowns.abrPeriodeTemporals.list)) : []),
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
        acceptDepositAgreement: data.acceptDepositAgreement || undefined,
    })
}
