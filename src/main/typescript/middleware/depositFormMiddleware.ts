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
import {
    AccessRight,
    Box,
    CreatorOrContributor,
    emptySchemedValue,
    emptyStringValue,
    Point,
    PrivacySensitiveDataValue,
    Relation,
    SchemedDate,
    SchemedValue,
    toAccessRight,
    toPrivacySensitiveData,
    Value,
} from "../model/FormData"
import { change } from "redux-form"

const wrappedValue: (v: any) => Value = v => ({
    value: v,
})

const unwrapValue: (value: Value) => string = value => value.value

const creatorOrContributorConverter: (c: any) => CreatorOrContributor = c => ({
    titles: c.titles,
    initials: c.initials,
    insertions: c.insertions,
    surname: c.surname,
    ids: c.ids && c.ids.map(schemedValueConverter),
    role: c.role,
    organization: c.organization,
})

const creatorOrContributorDeconverter: (c: CreatorOrContributor) => any = c => ({
    titles: c.titles,
    initials: c.initials,
    insertions: c.insertions,
    surname: c.surname,
    ids: c.ids && c.ids.map(schemedValueDeconverter),
    role: c.role,
    organization: c.organization,
})

const dateConverter: (d: any) => Date = d => new Date(d)

const dateDeconverter: (d: Date) => any = d => d.toUTCString() // TODO is this one correct?

const schemedValueConverter: (sv: any) => SchemedValue = sv => ({
    scheme: sv.scheme,
    value: sv.value,
})

const schemedValueDeconverter: (sv: SchemedValue) => any = sv => ({
    scheme: sv.scheme,
    value: sv.value,
})

const schemedDateConverter: (sd: any) => SchemedDate = sd => ({
    scheme: sd.scheme,
    value: dateConverter(sd.value),
})

const schemedDateDeconverter: (sd: SchemedDate) => any = sd => ({
    scheme: sd.scheme,
    value: dateDeconverter(sd.value),
})

const relationConverter: (r: any) => Relation = r => ({
    qualifier: r.qualifier,
    url: r.url,
    title: r.title,
})

const relationDeconverter: (r: Relation) => any = r => ({
    qualifier: r.qualifier,
    url: r.url,
    title: r.title,
})

const accessRightConverter: (ar: any) => AccessRight = ar => {
    const category = toAccessRight(ar.category)
    if (category) {
        return ({
            category: category,
            group: ar.group,
        })
    }
    else {
        throw `Error in metadata: no such access right: '${ar.category}'`
    }
}

const accessRightDeconverter: (ar: AccessRight) => any = ar => ({
    category: ar.category.toString(),
    group: ar.group,
})

const pointConverter: (p: any) => Point = p => ({
    scheme: p.scheme,
    x: Number(p.x),
    y: Number(p.y),
})

const pointDeconverter: (p: Point) => any = p => ({
    scheme: p.scheme,
    x: p.x,
    y: p.y,
})

const boxConverter: (b: any) => Box = b => ({
    scheme: b.scheme,
    north: Number(b.north),
    east: Number(b.east),
    south: Number(b.south),
    west: Number(b.west),
})

const boxDeconverter: (b: Box) => any = b => ({
    scheme: b.scheme,
    north: b.north,
    east: b.east,
    south: b.south,
    west: b.west,
})

const privacySensitiveDataConverter: (psd: any) => PrivacySensitiveDataValue = psd => {
    const res = toPrivacySensitiveData(psd)
    if (res) {
        return res
    }
    else {
        throw `Error in metadata: no such privacy sensitive data value: '${psd}'`
    }
}

const privacySensitiveDataDeconverter: (psd: PrivacySensitiveDataValue) => any = psd => psd.toString()

const metadataFetchConverter: Middleware = createMiddleware(({ dispatch }, next, action) => {
    next(action)

    if (action.type === DepositFormConstants.FETCH_METADATA_FULFILLED) {
        const input = action.payload

        try {
            const data: DepositFormMetadata = {
                // basic info
                doi: input.doi,
                languageOfDescription: input.languageOfDescription,
                titles: input.titles ? input.titles.map(wrappedValue) : [emptyStringValue],
                alternativeTitles: input.alternativeTitles ? input.alternativeTitles.map(wrappedValue) : [emptyStringValue],
                description: input.descriptions && input.descriptions.join("\n\n"),
                creators: input.creators ? input.creators.map(creatorOrContributorConverter) : [],
                contributors: input.contributors && input.contributors.map(creatorOrContributorConverter),
                dateCreated: input.dateCreated ? dateConverter(input.dateCreated) : new Date(), // TODO not sure if this is correct
                audiences: input.audiences ? input.audiences.map(wrappedValue) : [emptyStringValue],
                subjects: input.subjects ? input.subjects.map(wrappedValue) : [emptyStringValue],
                identifiers: input.identifiers ? input.identifiers.map(schemedValueConverter) : [emptySchemedValue],
                relations: input.relations && input.relations.map(relationConverter),
                languagesOfFilesIso639: input.languagesOfFilesIso639 ? input.languagesOfFilesIso639.map(wrappedValue) : [emptyStringValue],
                languagesOfFiles: input.languagesOfFiles ? input.languagesOfFiles.map(wrappedValue) : [emptyStringValue],
                datesIso8601: input.datesIso8601 && input.datesIso8601.map(schemedDateConverter),
                dates: input.dates ? input.dates.map(schemedValueConverter) : [emptySchemedValue],
                source: input.sources && input.sources.join("\n\n"),
                instructionsForReuse: input.instructionsForReuse && input.instructionsForReuse.join("\n\n"),

                // license and access
                rightsHolders: input.rightsHolders ? input.rightsHolders.map(wrappedValue) : [emptyStringValue],
                publishers: input.publishers ? input.publishers.map(wrappedValue) : [emptyStringValue],
                accessRights: input.accessRights && accessRightConverter(input.accessRights),
                license: input.license,
                dateAvailable: input.dateAvailable && dateConverter(input.dateAvailable),

                // upload type
                typesDCMI: input.typesDCMI ? input.typesDCMI.map(wrappedValue) : [emptyStringValue], // TODO with or without capitals
                types: input.types ? input.types.map(wrappedValue) : [emptyStringValue],
                formatsMediaType: input.formatsMediaType,
                formats: input.formats ? input.formats.map(wrappedValue) : [emptyStringValue],

                // archaeology specific metadata
                archisNrs: input.archisNrs ? input.archisNrs.map(wrappedValue) : [emptyStringValue],
                subjectsAbrComplex: input.subjectsAbrComplex,
                temporalCoveragesAbr: input.temporalCoveragesAbr,

                // temporal and spatial coverage
                temporalCoverages: input.temporalCoverages ? input.temporalCoverages.map(wrappedValue) : [emptyStringValue],
                spatialPoint: input.spatialPoint && input.spatialPoint.map(pointConverter),
                spatialBoxes: input.spatialBoxes && input.spatialBoxes.map(boxConverter),
                spatialCoverageIso3166: input.spatialCoverageIso3166 ? input.spatialCoverageIso3166.map(schemedValueConverter) : [{ scheme: "", value: "", }],
                spatialCoverages: input.spatialCoverages ? input.spatialCoverages.map(wrappedValue) : [emptyStringValue],

                // message for data manager
                messageForDataManager: input.messageForDataManager,

                // privacy sensitive data
                privacySensitiveDataPresent: input.privacySensitiveDataPresent ? privacySensitiveDataConverter(input.privacySensitiveDataPresent) : PrivacySensitiveDataValue.UNSPECIFIED,

                // deposit license
                acceptLicenseAgreement: input.acceptLicenseAgreement || false,
            }
            dispatch(fetchMetadataSucceeded(data))
        }
        catch (errorMessage) {
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
            doi: data.doi,
            languageOfDescription: data.languageOfDescription,
            titles: data.titles ? data.titles.map(unwrapValue) : [],
            alternativeTitles: data.alternativeTitles ? data.alternativeTitles.map(unwrapValue) : [],
            descriptions: data.description && data.description.split("\n\n"),
            creators: data.creators ? data.creators.map(creatorOrContributorDeconverter) : [],
            contributors: data.contributors && data.contributors.map(creatorOrContributorDeconverter),
            dateCreated: data.dateCreated && dateDeconverter(data.dateCreated), // TODO not sure if this is correct
            audiences: data.audiences ? data.audiences.map(unwrapValue) : [],
            subjects: data.subjects ? data.subjects.map(unwrapValue) : [],
            identifiers: data.identifiers && data.identifiers.map(schemedValueDeconverter),
            relations: data.relations && data.relations.map(relationDeconverter),
            languagesOfFilesIso639: data.languagesOfFilesIso639 ? data.languagesOfFilesIso639.map(unwrapValue) : [],
            languagesOfFiles: data.languagesOfFiles ? data.languagesOfFiles.map(unwrapValue) : [],
            datesIso8601: data.datesIso8601 && data.datesIso8601.map(schemedDateDeconverter),
            dates: data.dates && data.dates.map(schemedValueDeconverter),
            source: data.source && data.source.split("\n\n"),
            instructionsForReuse: data.instructionsForReuse && data.instructionsForReuse.split("\n\n"),

            // license and access
            rightsHolders: data.rightsHolders && data.rightsHolders.map(unwrapValue),
            publishers: data.publishers && data.publishers.map(unwrapValue),
            accessRights: data.accessRights && accessRightDeconverter(data.accessRights), // TODO not sure if this is correct
            license: data.license,
            dateAvailable: data.dateAvailable && dateDeconverter(data.dateAvailable),

            // upload type
            typesDCMI: data.typesDCMI,
            types: data.types && data.types.map(unwrapValue),
            formatsMediaType: data.formatsMediaType,
            formats: data.formats && data.formats.map(unwrapValue),

            // archaeology specific metadata
            archisNrs: data.archisNrs && data.archisNrs.map(unwrapValue),
            subjectsAbrComplex: data.subjectsAbrComplex,
            temporalCoveragesAbr: data.temporalCoveragesAbr,

            // temporal and spatial coverage
            temporalCoverages: data.temporalCoverages && data.temporalCoverages.map(unwrapValue),
            spatialPoint: data.spatialPoint && data.spatialPoint.map(pointDeconverter),
            spatialBoxes: data.spatialBoxes && data.spatialBoxes.map(boxDeconverter),
            spatialCoverageIso3166: data.spatialCoverageIso3166 && data.spatialCoverageIso3166.map(schemedValueDeconverter),
            spatialCoverages: data.spatialCoverages && data.spatialCoverages.map(unwrapValue),

            // message for data manager
            messageForDataManager: data.messageForDataManager,

            // privacy sensitive data
            privacySensitiveDataPresent: data.privacySensitiveDataPresent && privacySensitiveDataDeconverter(data.privacySensitiveDataPresent), // TODO not sure if this is correct

            // deposit license
            acceptLicenseAgreement: data.acceptLicenseAgreement,
        }

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
