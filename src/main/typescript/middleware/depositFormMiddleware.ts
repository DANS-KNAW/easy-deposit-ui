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
import { DepositFormConstants, saveDraftResetTimeout } from "../constants/depositFormConstants"
import { push } from "react-router-redux"
import { depositOverviewRoute } from "../constants/clientRoutes"
import { DepositFormMetadata } from "../components/form/parts"
import { fetchMetadataFailed, fetchMetadataSucceeded, saveDraftReset } from "../actions/depositFormActions"
import {
    AccessRight, Box,
    CreatorOrContributor, Point, PrivacySensitiveDataValue,
    Relation,
    SchemedDate,
    SchemedValue,
    toAccessRight, toPrivacySensitiveData, Value,
} from "../model/FormData"

const wrappedValue: (v: any) => Value = v => ({
    value: v
})
const creatorOrContributorConverter: (c: any) => CreatorOrContributor = c => {
    return ({
        titles: c.titles,
        initials: c.initials,
        insertions: c.insertions,
        surname: c.surname,
        ids: c.ids && c.ids.map(schemedValueConverter),
        role: c.role,
        organization: c.organization,
    })
}
const schemedValueConverter: (sv: any) => SchemedValue = sv => ({
    scheme: sv.scheme,
    value: sv.value,
})
const schemedDateConverter: (sv: any) => SchemedDate = sv => ({
    scheme: sv.scheme,
    value: new Date(sv.value),
})
const relationConverter: (r: any) => Relation = r => ({
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
const pointConverter: (p: any) => Point = p => ({
    scheme: p.scheme,
    x: Number(p.x),
    y: Number(p.y),
})
const boxConverter: (b: any) => Box = b => ({
    scheme: b.scheme,
    north: Number(b.north),
    east: Number(b.east),
    south: Number(b.south),
    west: Number(b.west),
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

const metadataFetchConverter: Middleware = createMiddleware(({ dispatch }, next, action) => {
    next(action)

    if (action.type === DepositFormConstants.FETCH_METADATA_FULFILLED) {
        const input = action.payload

        try {
            const data: DepositFormMetadata = {
                // basic info
                doi: input.doi,
                languageOfDescription: input.languageOfDescription,
                titles: input.titles ? input.titles.map(wrappedValue) : [],
                alternativeTitles: input.alternativeTitles ? input.alternativeTitles.map(wrappedValue) : [],
                description: input.descriptions ? input.descriptions.join("\n\n") : [],
                creators: input.creators.map(creatorOrContributorConverter),
                contributor: input.contributor && input.contributor.map(creatorOrContributorConverter),
                dateCreated: new Date(input.dateCreated),
                audiences: input.audiences ? input.audiences.map(wrappedValue) : [],
                subjects: input.subjects ? input.subjects.map(wrappedValue) : [],
                identifiers: input.identifiers && input.identifiers.map(schemedValueConverter),
                relations: input.relations && input.relations.map(relationConverter),
                languagesOfFilesIso639: input.languagesOfFilesIso639 ? input.languagesOfFilesIso639.map(wrappedValue) : [],
                languagesOfFiles: input.languagesOfFiles ? input.languagesOfFiles.map(wrappedValue) : [],
                datesIso8601: input.datesIso8601 && input.datesIso8601.map(schemedDateConverter),
                dates: input.dates && input.dates.map(schemedValueConverter),
                source: input.sources ? input.sources.join("\n\n") : [],
                instructionsForReuse: input.instructionsForReuse ? input.instructionsForReuse.join("\n\n") : [],

                // license and access
                rightsHolders: input.rightsHolders,
                publishers: input.publishers,
                accessRights: accessRightConverter(input.accessRights),
                license: input.license,
                dateAvailable: input.dateAvailable && new Date(input.dateAvailable),

                // upload type
                typesDCMI: input.typesDCMI,
                types: input.types,
                formatsMediaType: input.formatsMediaType,
                formats: input.formats,

                // archaeology specific metadata
                archisNrs: input.archisNrs,
                subjectsAbrComplex: input.subjectsAbrComplex,
                temporalCoveragesAbr: input.temporalCoveragesAbr,

                // language and literature specific metadata
                extraClarinMetadataPresent: JSON.parse(input.extraClarinMetadataPresent),

                // temporal and spatial coverage
                temporalCoverages: input.temporalCoverages,
                spatialPoint: input.spatialPoint && input.spatialPoint.map(pointConverter),
                spatialBoxes: input.spatialBoxes && input.spatialBoxes.map(boxConverter),
                spatialCoverageIso3166: input.spatialCoverageIso3166 && input.spatialCoverageIso3166.map(schemedValueConverter),
                spatialCoverages: input.spatialCoverages,

                // message for data manager
                messageForDataManager: input.messageForDataManager,

                // privacy sensitive data
                privacySensitiveDataPresent: privacySensitiveDataConverter(input.privacySensitiveDataPresent),

                // deposit license
                acceptLicenseAgreement: input.acceptLicenseAgreement && JSON.parse(input.acceptLicenseAgreement),
            }
            dispatch(fetchMetadataSucceeded(data))
        }
        catch (errorMessage) {
            dispatch(fetchMetadataFailed(errorMessage))
        }
    }
})

const saveTimer: Middleware = createMiddleware(({ dispatch }, next, action) => {
    next(action)

    if (action.type === DepositFormConstants.SAVE_DRAFT_FULFILLED) {
        setTimeout(() => dispatch(saveDraftReset()), saveDraftResetTimeout * 1000)
    }
})

const submitReroute: Middleware = createMiddleware(({ dispatch }, next, action) => {
    if (action.type === DepositFormConstants.SUBMIT_DEPOSIT_FULFILLED) {
        dispatch(push(depositOverviewRoute))
    }

    next(action)
})

export const depositFormMiddleware = [
    metadataFetchConverter,
    saveTimer,
    submitReroute,
]
