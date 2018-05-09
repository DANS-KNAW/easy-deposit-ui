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
    identifiers?: SchemedValue<IdentifierSchemeValues>[]
    languageOfDescription?: SchemedValue<LanguageOfDescriptionSchemeValues>
    titles?: string[]
    alternativeTitles?: string[]
    descriptions?: string[]
    creators?: CreatorOrContributor[]
    contributor?: CreatorOrContributor[]
    audiences?: SchemedKeyValue<AudienceSchemeValues>[]
    subjects?: PossiblySchemedKeyValue<SubjectsSchemeValues>[]
    alternativeIdentifiers?: SchemedValue<AlternativeIdentifierSchemeValues>[]
    relations?: Relation[]
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
    spatialCoverages?: PossiblySchemedValue<SpatialCoverageSchemeValues>[]

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

export enum IdentifierSchemeValues {
    DOI = "id-type:DOI",
}

enum LanguageOfDescriptionSchemeValues {
    ISO639_2 = "dcterms:ISO639-2",
}

enum CreatorIdSchemeValues {
    DAI = "id-type:DAI",
    ORCID = "id-type:ORCID",
    ISNI = "id-type:ISNI",
}

enum CreatorRoleSchemeValues {
    contributorType = "datacite:contributorType",
}

enum CreatorRoleKeyValues {
    ContactPerson = "ContactPerson",
    DataCollector = "DataCollector",
    DataCurator = "DataCurator",
    DataManager = "DataManager",
    Distributor = "Distributor",
    Editor = "Editor",
    HostingInstitution = "HostingInstitution",
    Other = "Other",
    Producer = "Producer",
    ProjectLeader = "ProjectLeader",
    ProjectManager = "ProjectManager",
    ProjectMember = "ProjectMember",
    RegistrationAgency = "RegistrationAgency",
    RegistrationAuthority = "RegistrationAuthority",
    RelatedPerson = "RelatedPerson",
    ResearchGroup = "ResearchGroup",
    RightsHolder = "RightsHolder",
    Researcher = "Researcher",
    Sponsor = "Sponsor",
    Supervisor = "Supervisor",
    WorkPackageLeader = "WorkPackageLeader",
}

interface CreatorOrContributor {
    titles?: string
    initials?: string
    insertions?: string
    surname?: string
    ids?: SchemedValue<CreatorIdSchemeValues>[]
    role?: SchemedKeyValue<CreatorRoleSchemeValues, CreatorRoleKeyValues>
    organization?: string
}

enum AudienceSchemeValues {
    narcisDisciplineTypes = "narcis:DisciplineType",
}

enum SubjectsSchemeValues {
    abrComplex = "abr:ABRcomplex",
}

enum AlternativeIdentifierSchemeValues {
    DOI = "id-type:DOI",
    URN = "id-type:URN",
    MENDELEY_DATA = "id-type:MENDELEY-DATA",
    ISBN = "id-type:ISBN",
    ISSN = "id-type:ISSN",
    NWO_PROJECTNR = "id-type:NWO-PROJECTNR",
    ARCHIS_ZAAK_IDENTIFICATIE = "id-type:ARCHIS-ZAAK-IDENTIFICATIE",
    eDNA_project = "id-type:eDNA-project",
}

interface Relation {
    qualifier?: RelationSchemeValues
    url?: string
    title?: string
}

enum RelationSchemeValues {
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
    created = "created",
    available = "available",
    date = "date",
    dateAccepted = "dateAccepted",
    dateCopyrighted = "dateCopyrighted",
    dateSubmitted = "dateSubmitted",
    issued = "issued",
    modified = "modified",
    valid = "valid",
}

enum DateSchemeValues {
    W3CDTF = "dcterms:W3CDTF"
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

enum TypesSchemeValues {
    dcmi = "dcterms:DCMIType",
}

enum FormatsSchemeValues {
    imt = "dcterms:IMT",
}

enum TemporalCoverageSchemeValues {
    abrPeriode = "abr:ABRperiode",
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
            scheme: IdentifierSchemeValues.DOI,
            value: "doi:10.17632/DANS.6wg5xccnjd.1",
        },
    ],
    languageOfDescription: {
        scheme: LanguageOfDescriptionSchemeValues.ISO639_2,
        value: "nld",
    },
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
                    scheme: CreatorIdSchemeValues.DAI,
                    value: "123456",
                },
                {
                    scheme: CreatorIdSchemeValues.ORCID,
                    value: "abcdef",
                },
            ],
            role: {
                scheme: CreatorRoleSchemeValues.contributorType,
                key: CreatorRoleKeyValues.ContactPerson,
                value: "Contact Person",
            },
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
        {
            organization: "my organization",
        },
        {
            organization: "rightsHolder1",
            role: {
                scheme: CreatorRoleSchemeValues.contributorType,
                key: CreatorRoleKeyValues.RightsHolder,
                value: "rightsholder",
            },
        },
        {
            organization: "rightsHolder1",
            role: {
                scheme: CreatorRoleSchemeValues.contributorType,
                key: CreatorRoleKeyValues.RightsHolder,
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
            scheme: AlternativeIdentifierSchemeValues.ISBN,
            value: "test identifier 1",
        },
        {
            scheme: AlternativeIdentifierSchemeValues.NWO_PROJECTNR,
            value: "test identifier 2",
        },
        {
            scheme: AlternativeIdentifierSchemeValues.ARCHIS_ZAAK_IDENTIFICATIE,
            value: "archis nr. 1",
        },
        {
            scheme: AlternativeIdentifierSchemeValues.ARCHIS_ZAAK_IDENTIFICATIE,
            value: "archis nr. 2",
        },
    ],
    relations: [
        {
            qualifier: RelationSchemeValues.conformsTo,
            url: "http://x",
            title: "title1",
        },
        {
            qualifier: RelationSchemeValues.requires,
            title: "title2",
        },
        {
            qualifier: RelationSchemeValues.isReplacedBy,
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
            value: "english",
        },
        {
            scheme: LanguageOfFilesSchemeValues.ISO639_2,
            key: "nld",
            value: "dutch",
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
            value: "2018-03-14",
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
        "remark",
    ],
    publishers: [
        "pub1",
        "pub2",
    ],
    accessRights: {
        category: AccessRightValue.OPEN_FOR_REGISTERED_USERS,
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
            scheme: "http://www.opengis.net/def/crs/EPSG/0/28992",
            x: 12,
            y: 34,
        },
        {
            scheme: "http://www.opengis.net/def/crs/EPSG/0/4326",
            x: 56,
            y: 78,
        },
    ],
    spatialBoxes: [
        {
            scheme: "http://www.opengis.net/def/crs/EPSG/0/28992",
            north: 1,
            east: 2,
            south: 3,
            west: 4,
        },
        {
            scheme: "http://www.opengis.net/def/crs/EPSG/0/4326",
            north: 5,
            east: 6,
            south: 7,
            west: 8,
        },
    ],
    spatialCoverages: [
        {
            scheme: SpatialCoverageSchemeValues.iso3166,
            value: "Nederland",
        },
        {
            value: "spatial-coverage1",
        },
        {
            value: "spatial-coverage2",
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
            scheme: IdentifierSchemeValues.DOI,
            value: "doi:10.17632/DANS.6wg5xccnjd.2",
        },
    ],
    languageOfDescription: {
        scheme: LanguageOfDescriptionSchemeValues.ISO639_2,
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
