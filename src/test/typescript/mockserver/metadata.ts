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
export type Doi = string

export interface Metadata {
    // basic information
    doi?: Doi
    languageOfDescription?: string
    titles?: string[]
    alternativeTitles?: string[]
    descriptions?: string[]
    creators?: CreatorOrContributor[]
    contributor?: CreatorOrContributor[]
    dateCreated?: string
    audiences?: string[]
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
    accessRights?: AccessRight
    license?: string
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

    // Time and Spatial coverage
    temporalCoverages?: string[]
    spatialPoint?: Point[]
    spatialBoxes?: Box[]
    spatialCoverageIso3166?: SchemedValue[]
    spatialCoverages?: string[]

    // For the Data Manager
    messageForDataManager?: string

    // Privacy sensitive data
    privacySensitiveDataPresent?: PrivacySensitiveDataValue

    // Deposit License
    acceptLicenseAgreement?: boolean
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
        "easy-discipline:7",
        "easy-discipline:22",
    ],
    subjects: [
        "subject1",
        "subject2",
    ],
    identifiers: [
        {
            scheme: "ISBN",
            value: "test identifier 1",
        },
        {
            scheme: "ARCHIS-ZAAK-IDENTIFICATIE",
            value: "test identifier 2",
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
            scheme: "Date accepted",
            value: "2018-02-02",
        },
        {
            scheme: "Issued",
            value: "Groundhog day",
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
    license: "http://creativecommons.org/publicdomain/zero/1.0",
    dateAvailable: "2018-03-14",
    typesDCMI: [
        "Dataset",
        "Software",
    ],
    types: [
        "type1",
        "type2",
    ],
    formatsMediaType: [
        "text/plain",
        "image/tiff",
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
            scheme: "NL",
            value: "foo",
        },
        {
            scheme: "BE",
            value: "bar",
        },
    ],
    spatialCoverages: [
        "spatial-coverage1",
        "spatial-coverage2",
    ],
    messageForDataManager:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a neque ac sapien tincidunt consequat. " +
        "Praesent accumsan arcu vel risus viverra, at hendrerit augue tincidunt. Phasellus vestibulum quis lacus " +
        "quis consectetur. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. " +
        "Duis eu lorem pulvinar, porttitor lorem at, commodo nibh. Aliquam fringilla enim et lobortis vulputate. " +
        "Integer id sagittis ligula, eget venenatis erat. Praesent urna lorem, commodo eget vestibulum quis, tincidunt " +
        "non massa. Aliquam eget elit felis. Donec libero sem, tempor quis egestas nec, tempor ut nibh. Cras porttitor " +
        "ex sed dolor pulvinar, nec vehicula dolor mollis. Fusce ex urna, semper at auctor vel, varius vitae ligula. " +
        "Mauris dolor urna, luctus eget facilisis non, interdum quis tellus.\n\nCras at molestie velit. Aliquam nec " +
        "lectus sed magna iaculis consectetur. Integer faucibus mauris non gravida feugiat. Suspendisse mollis euismod " +
        "felis et maximus. Donec lacus lectus, euismod vulputate consequat ut, consequat sed lacus. Sed hendrerit dui " +
        "orci, vitae pulvinar libero ullamcorper a. Fusce aliquet feugiat lacinia. Nam erat diam, malesuada id porta " +
        "ut, lacinia id ligula. Ut faucibus in nisi eu malesuada. Curabitur quis condimentum nulla, finibus facilisis " +
        "est. Nulla convallis, est ac scelerisque ultrices, orci est aliquet eros, vel feugiat lectus orci non leo. " +
        "Mauris dolor nulla, convallis fermentum consectetur non, volutpat convallis purus. Fusce a semper neque. " +
        "Suspendisse ornare quis nunc sit amet tristique. Nam sed libero mauris. Duis scelerisque tortor non purus " +
        "porttitor interdum.",
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
    privacySensitiveDataPresent: PrivacySensitiveDataValue.YES,
    acceptLicenseAgreement: true,
}

export const newMetadata: () => Metadata = () => ({})
