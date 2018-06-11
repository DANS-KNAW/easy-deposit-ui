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
import * as dateFormat from "dateformat"

export type Doi = string

export interface Metadata {
    // basic information
    identifiers?: SchemedValue<DansIdentifierSchemeValues>[]
    languageOfDescription?: SchemedKeyValue<LanguageOfDescriptionSchemeValues>
    titles?: string[]
    alternativeTitles?: string[]
    descriptions?: string[]
    creators?: Contributor[]
    contributors?: Contributor[]
    audiences?: SchemedKeyValue<AudienceSchemeValues>[]
    subjects?: PossiblySchemedKeyValue<SubjectsSchemeValues>[]
    alternativeIdentifiers?: SchemedValue<ExternalIdentifierSchemeValues>[]
    relations?: (Relation | QualifiedSchemedValue<RelationQualifierValues, ExternalIdentifierSchemeValues>)[]
    languagesOfFiles?: PossiblySchemedKeyValue<LanguageOfFilesSchemeValues>[]
    dates?: QualifiedSchemedValue<DateQualifierValues, DateSchemeValues>[]
    sources?: string[]
    instructionsForReuse?: string[]

    // license and access
    publishers?: string[]
    accessRights?: AccessRight
    license?: string

    // Upload types
    types?: PossiblySchemedValue<TypesSchemeValues>[]
    formats?: PossiblySchemedValue<FormatsSchemeValues>[]

    // Time and Spatial coverage
    temporalCoverages?: PossiblySchemedKeyValue<TemporalCoverageSchemeValues>[]
    spatialPoints?: Point[]
    spatialBoxes?: Box[]
    spatialCoverages?: PossiblySchemedKeyValue<SpatialCoverageSchemeValues>[]

    // For the Data Manager
    messageForDataManager?: string

    // Privacy sensitive data
    privacySensitiveDataPresent?: PrivacySensitiveDataValue

    // Deposit License
    acceptLicenseAgreement?: boolean
}

interface SchemedValue<Scheme = string, Value = string> {
    scheme: Scheme
    value: Value
}

interface PossiblySchemedValue<Scheme = string, Value = string> {
    scheme?: Scheme
    value: Value
}

interface SchemedKeyValue<Scheme = string, Key = string, Value = string> {
    scheme: Scheme
    key: Key
    value: Value
}

interface PossiblySchemedKeyValue<Scheme = string, Key = string, Value = string> {
    scheme?: Scheme
    key?: Key
    value: Value
}

interface QualifiedSchemedValue<Qualifier = string, Scheme = string, Value = string> {
    scheme?: Scheme
    value: Value
    qualifier: Qualifier
}

export enum DansIdentifierSchemeValues {
    DOI = "id-type:DOI",
}

enum LanguageOfDescriptionSchemeValues {
    ISO639_2 = "dcterms:ISO639-2",
}

enum ContributorIdSchemeValues {
    DAI = "id-type:DAI",
    ORCID = "id-type:ORCID",
    ISNI = "id-type:ISNI",
}

enum ContributorRoleSchemeValues {
    contributorType = "datacite:contributorType",
}

enum ContributorRoleKeyValues {
    DataCollector = "DataCollector",
    DataCurator = "DataCurator",
    Editor = "Editor",
    HostingInstitution = "HostingInstitution",
    ProjectLeader = "ProjectLeader",
    ProjectMember = "ProjectMember",
    RelatedPerson = "RelatedPerson",
    ResearchGroup = "ResearchGroup",
    RightsHolder = "RightsHolder", // special element, not visible in UI dropdown list
    Researcher = "Researcher",
    Sponsor = "Sponsor",
}

interface Contributor {
    titles?: string
    initials?: string
    insertions?: string
    surname?: string
    ids?: SchemedValue<ContributorIdSchemeValues>[]
    role?: SchemedKeyValue<ContributorRoleSchemeValues, ContributorRoleKeyValues>
    organization?: string
}

enum AudienceSchemeValues {
    narcisDisciplineTypes = "narcis:DisciplineType",
}

enum SubjectsSchemeValues {
    abrComplex = "abr:ABRcomplex",
}

enum ExternalIdentifierSchemeValues {
    DOI = "id-type:DOI",
    URN = "id-type:URN",
    MENDELEY_DATA = "id-type:MENDELEY-DATA", // kan mogelijk weg
    ISBN = "id-type:ISBN",
    ISSN = "id-type:ISSN",
    NWO_PROJECTNR = "id-type:NWO-PROJECTNR",
    ARCHIS_ZAAK_IDENTIFICATIE = "id-type:ARCHIS-ZAAK-IDENTIFICATIE",
}

interface Relation {
    qualifier?: RelationQualifierValues
    url?: string
    title?: string
}

enum RelationQualifierValues {
    conformsTo = "dcterms:conformsTo",
    hasFormat = "dcterms:hasFormat",
    hasPart = "dcterms:hasPart",
    references = "dcterms:references",
    replaces = "dcterms:replaces",
    requires = "dcterms:requires",
    hasVersion = "dcterms:hasVersion",
    isFormatOf = "dcterms:isFormatOf",
    isPartOf = "dcterms:isPartOf",
    isReferencedBy = "dcterms:isReferencedBy",
    isReplacedBy = "dcterms:isReplacedBy",
    isRequiredBy = "dcterms:isRequiredBy",
    isVersionOf = "dcterms:isVersionOf",
}

enum LanguageOfFilesSchemeValues {
    ISO639_2 = "dcterms:ISO639-2",
}

enum DateQualifierValues {
    created = "dcterms:created",
    available = "dcterms:available",
    date = "dcterms:date",
    dateAccepted = "dcterms:dateAccepted",
    dateCopyrighted = "dcterms:dateCopyrighted",
    issued = "dcterms:issued",
    modified = "dcterms:modified",
    valid = "dcterms:valid",
}

enum DateSchemeValues {
    W3CDTF = "dcterms:W3CDTF"
}

interface AccessRight {
    category: AccessRightValue
    group?: string
}

enum AccessRightValue {
    OPEN_ACCESS = "OPEN_ACCESS",
    OPEN_ACCESS_FOR_REGISTERED_USERS = "OPEN_ACCESS_FOR_REGISTERED_USERS",
    GROUP_ACCESS = "GROUP_ACCESS",
    REQUEST_PERMISSION = "REQUEST_PERMISSION",
    NO_ACCESS = "NO_ACCESS",
}

enum TypesSchemeValues {
    dcmi = "dcterms:DCMIType",
}

enum FormatsSchemeValues {
    imt = "dcterms:IMT",
}

enum TemporalCoverageSchemeValues {
    abrPeriode = "abr:ABRperiode",
}

enum SpatialScheme {
    degrees = "http://www.opengis.net/def/crs/EPSG/0/4326",
    RD = "http://www.opengis.net/def/crs/EPSG/0/28992",
}

interface Point {
    scheme: SpatialScheme
    x: number
    y: number
}

interface Box {
    scheme: SpatialScheme
    north: number
    east: number
    south: number
    west: number
}

enum SpatialCoverageSchemeValues {
    iso3166 = "dcterms:ISO3166",
}

enum PrivacySensitiveDataValue {
    YES = "yes",
    NO = "no",
    UNSPECIFIED = "unspecified"
}

export const allfields: Metadata = {
    identifiers: [
        {
            scheme: DansIdentifierSchemeValues.DOI,
            value: "doi:10.17632/DANS.6wg5xccnjd.1",
        },
    ],
    languageOfDescription: {
        scheme: LanguageOfDescriptionSchemeValues.ISO639_2,
        key: "nld",
        value: "Dutch",
    },
    titles: ["title 1", "title2"],
    alternativeTitles: ["alternative title 1", "alternative title2"],
    descriptions: [
        "description1",
        "description2",
    ],
    creators: [
        {
            titles: "Drs.",
            initials: "D.A.",
            insertions: "",
            surname: "NS",
            ids: [
                {
                    scheme: ContributorIdSchemeValues.DAI,
                    value: "123456",
                },
                {
                    scheme: ContributorIdSchemeValues.ORCID,
                    value: "abcdef",
                },
            ],
            role: {
                scheme: ContributorRoleSchemeValues.contributorType,
                key: ContributorRoleKeyValues.DataCollector,
                value: "Data collector",
            },
            organization: "KNAW",
        },
        {
            initials: "Foo",
            insertions: "van",
            surname: "Bar",
        },
    ],
    contributors: [
        {
            titles: "Dr.",
            initials: "O.",
            insertions: "van",
            surname: "Belix",
        },
        {
            organization: "my organization",
        },
        {
            organization: "rightsHolder1",
            role: {
                scheme: ContributorRoleSchemeValues.contributorType,
                key: ContributorRoleKeyValues.RightsHolder,
                value: "rightsholder",
            },
        },
        {
            titles: "Dr.",
            initials: "A.S.",
            insertions: "van",
            surname: "Terix",
            role: {
                scheme: ContributorRoleSchemeValues.contributorType,
                key: ContributorRoleKeyValues.RightsHolder,
                value: "rightsholder",
            },
        },
    ],
    audiences: [
        {
            scheme: AudienceSchemeValues.narcisDisciplineTypes,
            key: "D35200",
            value: "Musicology",
        },
        {
            scheme: AudienceSchemeValues.narcisDisciplineTypes,
            key: "D33000",
            value: "Theology and religious studies",
        },
    ],
    subjects: [
        {
            value: "subject1",
        },
        {
            value: "subject2",
        },
        {
            scheme: SubjectsSchemeValues.abrComplex,
            key: "RKER",
            value: "Religie - Kerk",
        },
        {
            scheme: SubjectsSchemeValues.abrComplex,
            key: "VK",
            value: "Versterking - Kasteel",
        },
    ],
    alternativeIdentifiers: [
        {
            scheme: ExternalIdentifierSchemeValues.ISBN,
            value: "test identifier 1",
        },
        {
            scheme: ExternalIdentifierSchemeValues.NWO_PROJECTNR,
            value: "test identifier 2",
        },
        {
            scheme: ExternalIdentifierSchemeValues.ARCHIS_ZAAK_IDENTIFICATIE,
            value: "archis nr. 1",
        },
        {
            scheme: ExternalIdentifierSchemeValues.ARCHIS_ZAAK_IDENTIFICATIE,
            value: "archis nr. 2",
        },
    ],
    relations: [
        {
            qualifier: RelationQualifierValues.isReferencedBy,
            scheme: ExternalIdentifierSchemeValues.ISSN,
            value: "2123-34X",
        },
        {
            qualifier: RelationQualifierValues.conformsTo,
            url: "http://x",
            title: "title1",
        },
        {
            qualifier: RelationQualifierValues.requires,
            title: "title2",
        },
        {
            qualifier: RelationQualifierValues.isReplacedBy,
            url: "http://y",
        },
        {
            url: "http://z",
        },
        {
            title: "title3",
        },
    ],
    languagesOfFiles: [
        {
            scheme: LanguageOfFilesSchemeValues.ISO639_2,
            key: "eng",
            value: "English",
        },
        {
            scheme: LanguageOfFilesSchemeValues.ISO639_2,
            key: "nld",
            value: "Dutch",
        },
        {
            value: "Flakkees",
        },
        {
            value: "Goerees",
        },
    ],
    dates: [
        {
            scheme: DateSchemeValues.W3CDTF,
            value: "2018-03-18",
            qualifier: DateQualifierValues.dateCopyrighted,
        },
        {
            scheme: DateSchemeValues.W3CDTF,
            value: "2018-03-17",
            qualifier: DateQualifierValues.valid,
        },
        {
            scheme: DateSchemeValues.W3CDTF,
            value: "2018-03-19",
            qualifier: DateQualifierValues.created,
        },
        {
            value: "2018-02-02",
            qualifier: DateQualifierValues.modified,
        },
        {
            scheme: DateSchemeValues.W3CDTF,
            value: dateFormat(Date.now(), "yyyy-mm-dd"),
            qualifier: DateQualifierValues.available,
        },
        {
            value: "Groundhog day",
            qualifier: DateQualifierValues.issued,
        },
    ],
    sources: [
        "source1",
        "source2",
    ],
    instructionsForReuse: [
        "remark1",
        "remark2",
    ],
    publishers: [
        "pub1",
        "pub2",
    ],
    accessRights: {
        category: AccessRightValue.OPEN_ACCESS,
    },
    license: "http://creativecommons.org/publicdomain/zero/1.0",
    types: [
        {
            scheme: TypesSchemeValues.dcmi,
            value: "Dataset",
        },
        {
            scheme: TypesSchemeValues.dcmi,
            value: "Software",
        },
        {
            value: "drawings",
        },
        {
            value: "paintings",
        },
    ],
    formats: [
        {
            scheme: FormatsSchemeValues.imt,
            value: "text/plain",
        },
        {
            scheme: FormatsSchemeValues.imt,
            value: "image/tiff",
        },
        {
            value: "paperback",
        },
        {
            value: "audiobook",
        },
        {
            scheme: FormatsSchemeValues.imt,
            value: "application/x-cmdi+xml",
        },
    ],
    temporalCoverages: [
        {
            scheme: TemporalCoverageSchemeValues.abrPeriode,
            key: "ROMLA",
            value: "Romeinse tijd laat A: 270 - 350 nC",
        },
        {
            scheme: TemporalCoverageSchemeValues.abrPeriode,
            key: "ROMLB",
            value: "Romeinse tijd laat B: 350 - 450 nC",
        },
        {
            value: "temp1",
        },
        {
            value: "temp2",
        },
    ],
    spatialPoints: [
        {
            scheme: SpatialScheme.RD,
            x: 12,
            y: 34,
        },
        {
            scheme: SpatialScheme.degrees,
            x: 56,
            y: 78,
        },
    ],
    spatialBoxes: [
        {
            scheme: SpatialScheme.RD,
            north: 1,
            east: 2,
            south: 3,
            west: 4,
        },
        {
            scheme: SpatialScheme.degrees,
            north: 5,
            east: 6,
            south: 7,
            west: 8,
        },
    ],
    spatialCoverages: [
        {
            scheme: SpatialCoverageSchemeValues.iso3166,
            key: "NLD",
            value: "Nederland",
        },
        {
            value: "Haringvliet",
        },
        {
            value: "Grevelingenmeer",
        },
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
    identifiers: [
        {
            scheme: DansIdentifierSchemeValues.DOI,
            value: "doi:10.17632/DANS.6wg5xccnjd.2",
        },
    ],
    languageOfDescription: {
        scheme: LanguageOfDescriptionSchemeValues.ISO639_2,
        key: "eng",
        value: "English",
    },
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
    audiences: [
        {
            scheme: AudienceSchemeValues.narcisDisciplineTypes,
            key: "D11400",
            value: "Fourier analysis, functional analysis",
        },
        {
            scheme: AudienceSchemeValues.narcisDisciplineTypes,
            key: "D16300",
            value: "Theoretical computer science",
        },
    ],
    dates: [
        {
            scheme: DateSchemeValues.W3CDTF,
            value: "2018-03-19",
            qualifier: DateQualifierValues.created,
        },
        {
            scheme: DateSchemeValues.W3CDTF,
            value: "2018-05-14",
            qualifier: DateQualifierValues.available,
        }
    ],
    accessRights: {
        category: AccessRightValue.GROUP_ACCESS,
        group: "archaeology",
    },
    license: "DANS-CONDITIONS-OF-USE", // TODO Linda komt met een correcte value
    privacySensitiveDataPresent: PrivacySensitiveDataValue.YES,
    acceptLicenseAgreement: false,
}

export const newMetadata: () => Metadata = () => ({})
