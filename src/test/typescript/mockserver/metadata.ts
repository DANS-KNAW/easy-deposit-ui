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

// copied from lib/metadata/Date.ts, since dependencies don't work over main/test here
const isoDateTimeFormat = (date: Date) => {
    const pad = (input: number, length?: number) => {
        let val = String(input)
        const len = length || 2
        while (val.length < len)
            val = "0" + val

        return val
    }
    const split2 = (val: string) => `${val.slice(0, 2)}:${val.slice(2, 4)}`
    const timezone = (val: number) => {
        const converted = Math.floor(Math.abs(val) / 60) * 100 + Math.abs(val) % 60
        return (val > 0 ? "-" : "+") + split2(pad(converted, 4))
    }

    const y = date.getFullYear()
    const m = pad(date.getMonth() + 1)
    const d = pad(date.getDate())
    const H = pad(date.getHours())
    const M = pad(date.getMinutes())
    const s = pad(date.getSeconds())
    const o = timezone(date.getTimezoneOffset())

    return `${y}-${m}-${d}T${H}:${M}:${s}${o}`
}

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
    accessRights?: AccessRightValues
    license?: SchemedValue

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
    privacySensitiveDataPresent?: PrivacySensitiveDataValues

    // Deposit License
    acceptDepositAgreement?: boolean
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
    qualifier: RelationQualifierValues
    url?: string
    title?: string
}

enum RelationQualifierValues {
    relation = "dcterms:relation",
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

enum AccessRightValues {
    OPEN_ACCESS = "OPEN_ACCESS",
    REQUEST_PERMISSION = "REQUEST_PERMISSION",
}

enum LicenseSchemeValues {
    uri = "dcterms:URI"
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

enum SpatialSchemeValues {
    degrees = "http://www.opengis.net/def/crs/EPSG/0/4326",
    RD = "http://www.opengis.net/def/crs/EPSG/0/28992",
}

interface Point {
    scheme: SpatialSchemeValues
    x: string
    y: string
}

interface Box {
    scheme: SpatialSchemeValues
    north: string
    east: string
    south: string
    west: string
}

enum SpatialCoverageSchemeValues {
    iso3166 = "dcterms:ISO3166",
}

enum PrivacySensitiveDataValues {
    YES = "yes",
    NO = "no",
    UNSPECIFIED = "unspecified"
}

export const allfields: Metadata = {
    identifiers: [
        {
            scheme: DansIdentifierSchemeValues.DOI,
            value: "10.17632/DANS.6wg5xccnjd.1",
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
            insertions: "de",
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
                value: "Rightsholder",
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
                value: "Rightsholder",
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
            url: "http://bit.ly/react-deposit-ui",
            title: "title1",
        },
        {
            qualifier: RelationQualifierValues.requires,
            title: "title2",
        },
        {
            qualifier: RelationQualifierValues.isReplacedBy,
            url: "http://www.google.com",
            title: "Google",
        },
        {
            qualifier: RelationQualifierValues.relation,
            url: "https://easy.dans.knaw.nl/",
            title: "EASY",
        },
        {
            qualifier: RelationQualifierValues.relation,
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
            value: isoDateTimeFormat(new Date(new Date().setDate(new Date().getDate() - 2))),
            qualifier: DateQualifierValues.created,
        },
        {
            scheme: DateSchemeValues.W3CDTF,
            value: isoDateTimeFormat(new Date(Date.now())),
            qualifier: DateQualifierValues.available,
        },
        {
            scheme: DateSchemeValues.W3CDTF,
            value: isoDateTimeFormat(new Date("2018-03-18T01:00:00+01:00")),
            qualifier: DateQualifierValues.dateCopyrighted,
        },
        {
            scheme: DateSchemeValues.W3CDTF,
            value: isoDateTimeFormat(new Date("2018-03-17T01:00:00+01:00")),
            qualifier: DateQualifierValues.valid,
        },
        {
            value: "2018-02-02",
            qualifier: DateQualifierValues.modified,
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
    accessRights: AccessRightValues.OPEN_ACCESS,
    license: {
        scheme: LicenseSchemeValues.uri,
        value: "http://creativecommons.org/publicdomain/zero/1.0",
    },
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
            scheme: SpatialSchemeValues.RD,
            x: "100000",
            y: "300000",
        },
        {
            scheme: SpatialSchemeValues.degrees,
            x: "56",
            y: "78",
        },
    ],
    spatialBoxes: [
        {
            scheme: SpatialSchemeValues.RD,
            north: "300000",
            east: "100000",
            south: "400000",
            west: "200000",
        },
        {
            scheme: SpatialSchemeValues.degrees,
            north: "5",
            east: "6",
            south: "7",
            west: "8",
        },
    ],
    spatialCoverages: [
        {
            scheme: SpatialCoverageSchemeValues.iso3166,
            key: "NLD",
            value: "Netherlands",
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
    privacySensitiveDataPresent: PrivacySensitiveDataValues.NO,
    acceptDepositAgreement: true,
}

export const mandatoryOnly: Metadata = {
    identifiers: [
        {
            scheme: DansIdentifierSchemeValues.DOI,
            value: "10.17632/DANS.6wg5xccnjd.2",
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
            value: isoDateTimeFormat(new Date("2018-03-19T01:00:00+01:00")),
            qualifier: DateQualifierValues.created,
        },
        {
            scheme: DateSchemeValues.W3CDTF,
            value: isoDateTimeFormat(new Date("2018-05-14T02:00:00+02:00")),
            qualifier: DateQualifierValues.available,
        },
    ],
    accessRights: AccessRightValues.REQUEST_PERMISSION,
    license: {
        scheme: LicenseSchemeValues.uri,
        value: "http://dans.knaw.nl/en/about/organisation-and-policy/legal-information/DANSGeneralconditionsofuseUKDEF.pdf",
    },
    privacySensitiveDataPresent: PrivacySensitiveDataValues.YES,
    // acceptDepositAgreement: false, // if not set, this value is false by default
}

export const newMetadata: () => Metadata = () => ({})
