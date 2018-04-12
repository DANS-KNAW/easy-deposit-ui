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
import * as dateformat from "dateformat"

export interface Metadata {
    // basic information
    doi: string
    languageOfDescription: string
    titles: string[]
    alternativeTitles?: string[]
    descriptions: string[]
    creators: CreatorOrContributor[]
    contributor?: CreatorOrContributor[]
    dateCreated: string
    audiences: string[]
    subjects?: string[]
    identifiers?: SchemedValue[]
    relations?: Relation[]
    languagesOfFilesIso639?: string[]
    languagesOfFiles?: string[]
    datesIso8601?: SchemedValue[]
    dates?: SchemedValue[]
    sources?: string[]
    instructionsForReuse?: string[]

    // license and access
    rightsHolders?: string[]
    publishers?: string[]
    accessRights: AccessRight
    license: string
    dateAvailable?: string

    // Upload types
    typesDCMI?: string[]
    types?: string[]
    formatsMediaType?: string[]
    formats?: string[]

    // Archaeology specific metadata
    archisNrs?: string[]
    subjectsAbrComplex?: string[]
    temporalCoveragesAbr?: string[]

    // Language & literature specific metadata
    extraClarinMetadataPresent: boolean

    // Time and Spatial coverage
    temporalCoverages?: string[]
    spatialPoint?: Point[]
    spatialBoxes?: Box[]
    spatialCoverageIso3166?: SchemedValue[]
    spatialCoverages?: string[]

    // For the Data Manager
    messageForDataManager?: string

    // Privacy sensitive data
    privacySensitiveDataPresent: PrivacySensitiveDataValue

    // Deposit License
    acceptLicenseAgreement: boolean
}

interface SchemedValue {
    scheme: string
    value: string
}

interface CreatorOrContributor {
    titles?: string
    initials: string
    insertions?: string
    surname: string
    ids?: SchemedValue[]
    role?: string
    organization?: string
}

interface Point {
    scheme: string
    x: number
    y: number
}

interface Box {
    scheme: string
    north: number
    east: number
    south: number
    west: number
}

interface Relation {
    qualifier: string
    url: string
    title: string
}

enum PrivacySensitiveDataValue {
    YES = "yes",
    NO = "no",
    UNSPECIFIED = "unspecified"
}

interface AccessRight {
    category: AccessRightValue
    group?: string
}

enum AccessRightValue {
    OPEN = "open",
    OPEN_FOR_REGISTERED_USERS = "open_for_registered_users",
    RESTRICTED_GROUP = "restricted_group",
    RESTRICTED_REQUEST = "restricted_request",
    OTHER_ACCESS = "other_access",
}

export const allfields: Metadata = {
    doi: "doi:10.17632/DANS.6wg5xccnjd.1",
    languageOfDescription: "Nederlands",
    titles: ["title 1", "title2"],
    alternativeTitles: ["alternative title 1", "alternative title2"],
    descriptions: [
        "description",
    ],
    creators: [
        {
            titles: "Drs.",
            initials: "D.A.",
            insertions: "",
            surname: "NS",
            ids: [
                {
                    scheme: "S1",
                    value: "123456",
                },
                {
                    scheme: "S2",
                    value: "abcdef",
                },
            ],
            role: "worker",
            organization: "KNAW",
        },
        {
            titles: "",
            initials: "Foo",
            insertions: "van",
            surname: "Bar",
        },
    ],
    contributor: [
        {
            titles: "Dr.",
            initials: "O.",
            insertions: "van",
            surname: "Belix",
        },
    ],
    dateCreated: "2018-03-19",
    audiences: [
        "audience1",
        "audience2",
    ],
    subjects: [
        "subject1",
        "subject2",
    ],
    identifiers: [
        {
            scheme: "id1",
            value: "test1",
        },
        {
            scheme: "id2",
            value: "test2",
        },
    ],
    relations: [
        {
            qualifier: "Q1",
            url: "http://x",
            title: "title1",
        },
        {
            qualifier: "Q2",
            url: "http://y",
            title: "title2",
        },
    ],
    languagesOfFilesIso639: [
        "langISO1",
        "langISO2",
    ],
    languagesOfFiles: [
        "lang1",
        "lang2",
    ],
    datesIso8601: [
        {
            scheme: "iso-scheme1",
            value: "2018-03-18",
        },
        {
            scheme: "iso-scheme2",
            value: "2018-03-17",
        },
    ],
    dates: [ // TODO is this actually the same type of object?
        {
            scheme: "scheme1",
            value: "2018-03-16",
        },
        {
            scheme: "scheme2",
            value: "2018-03-15",
        },
    ],
    sources: [
        "source1",
        "source2",
    ],
    instructionsForReuse: [
        "remark",
    ],
    rightsHolders: [
        "rH1",
        "rH2",
    ],
    publishers: [
        "pub1",
        "pub2",
    ],
    accessRights: {
        category: AccessRightValue.OPEN_FOR_REGISTERED_USERS,
    },
    license: "CC-0",
    dateAvailable: "2018-03-14",
    typesDCMI: [
        "typeDCMI1",
        "typeDCMI2",
    ],
    types: [
        "type1",
        "type2",
    ],
    formatsMediaType: [
        "mt1",
        "mt2",
    ],
    formats: [
        "f1",
        "f2",
    ],
    archisNrs: [
        "archis nr. 1",
        "archis nr. 2",
    ],
    subjectsAbrComplex: [
        "Nederzetting onbepaald",
        "moated site",
    ],
    temporalCoveragesAbr: [
        "ROMLA",
        "ROMLB",
    ],
    extraClarinMetadataPresent: false,
    temporalCoverages: [
        "temp1",
        "temp2",
    ],
    spatialPoint: [
        {
            scheme: "point-foo",
            x: 12,
            y: 34,
        },
        {
            scheme: "point-bar",
            x: 56,
            y: 78,
        },
    ],
    spatialBoxes: [
        {
            scheme: "box-foo",
            north: 1,
            east: 2,
            south: 3,
            west: 4,
        },
        {
            scheme: "box-bar",
            north: 5,
            east: 6,
            south: 7,
            west: 8,
        },
    ],
    spatialCoverageIso3166: [
        {
            scheme: "sC1",
            value: "foo",
        },
        {
            scheme: "sC2",
            value: "bar",
        },
    ],
    spatialCoverages: [
        "spatial-coverage1",
        "spatial-coverage2",
    ],
    messageForDataManager: "Hello, how are you doing?",
    privacySensitiveDataPresent: PrivacySensitiveDataValue.NO,
    acceptLicenseAgreement: true,
}

export const mandatoryOnly: Metadata = {
    doi: "doi:10.17632/DANS.6wg5xccnjd.2",
    languageOfDescription: "English",
    titles: [
        "title1",
    ],
    descriptions: [
        "description1",
        "description2",
    ],
    creators: [
        {
            initials: "A.S.",
            surname: "Terix",
        },
    ],
    dateCreated: "2018-03-19",
    audiences: [
        "audience1",
        "audience2",
    ],
    accessRights: {
        category: AccessRightValue.RESTRICTED_GROUP,
        group: "archaeology",
    },
    license: "CC-BY-NC-SA",
    extraClarinMetadataPresent: true,
    privacySensitiveDataPresent: PrivacySensitiveDataValue.YES,
    acceptLicenseAgreement: true,
}

export const newMetadata: () => Metadata = () => ({
    doi: "",
    languageOfDescription: "",
    titles: ["New Deposit"],
    descriptions: [],
    creators: [],
    dateCreated: dateformat(new Date(), "yyy-mm-dd"),
    audiences: [],
    accessRights: {
        category: AccessRightValue.OPEN,
    },
    license: "",
    extraClarinMetadataPresent: false,
    privacySensitiveDataPresent: PrivacySensitiveDataValue.UNSPECIFIED,
    acceptLicenseAgreement: false,
})
