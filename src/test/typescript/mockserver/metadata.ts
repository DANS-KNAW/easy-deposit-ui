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
    doi: string
    urn: string
    titles: string[]
    alternativeTitles?: string[]
    creators: Creator[]
    contributor?: Contributor[]
    created: string
    descriptions: string[]
    audiences: string[]
    archisNrs?: string[]
    subjectsAbrComplex?: string[]
    subjects?: string[]
    temporalCoveragesAbr?: string[]
    temporalCoverages?: string[]
    spatialPoint?: Point[]
    spatialBoxes?: Box[]
    spatialCoverages?: string[]
    identifiers?: Identifier[]
    relations?: Relation[]
    typesDCMI?: string[]
    types?: string[]
    formatsMediaType?: string[]
    formats?: string[]
    languagesIso639?: string[]
    languages?: string[]
    sources?: string[]
    datesIso8601?: IsoDate[]
    dates?: IsoDate[] // TODO is this actually the same type of object?
    remarks?: string
    rightsHolders?: string[]
    publishers?: string[]
    dateAvailable?: string
}

interface Creator {
    titles?: string
    initials: string
    insertions?: string
    surname: string
}

interface Contributor {
    titles?: string
    initials: string
    insertions?: string
    surname: string
}

interface Point {
    scheme: string
    x: string
    y: string
}

interface Box {
    scheme: string
    north: string
    east: string
    south: string
    west: string
}

interface Identifier {
    scheme: string
    identifier: string
}

interface Relation {
    qualifier: string
    url: string
    title: string
}

interface IsoDate {
    scheme: string
    date: string
}

const allfields: Metadata = {
    doi: "doi:10.17632/DANS.6wg5xccnjd.1",
    urn: "random urn",
    titles: ["title 1", "title2"],
    alternativeTitles: ["alternative title 1", "alternative title2"],
    creators: [
        {
            titles: "Drs.",
            initials: "D.A.",
            insertions: "",
            surname: "NS",
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
    created: "2018-03-19",
    descriptions: [
        "description1",
        "description2",
    ],
    audiences: [
        "audience1",
        "audience2",
    ],
    archisNrs: [
        "archis nr. 1",
        "archis nr. 2",
    ],
    subjectsAbrComplex: [
        "Nederzetting onbepaald",
        "moated site",
    ],
    subjects: [
        "subject1",
        "subject2",
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
            x: "12",
            y: "34",
        },
        {
            scheme: "point-bar",
            x: "56",
            y: "78",
        },
    ],
    spatialBoxes: [
        {
            scheme: "box-foo",
            north: "1",
            east: "2",
            south: "3",
            west: "4",
        },
        {
            scheme: "box-bar",
            north: "5",
            east: "6",
            south: "7",
            west: "8",
        },
    ],
    spatialCoverages: [
        "spatial-coverage1",
        "spatial-coverage2",
    ],
    identifiers: [
        {
            scheme: "id1",
            identifier: "test1",
        },
        {
            scheme: "id2",
            identifier: "test2",
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
    languagesIso639: [
        "langISO1",
        "langISO2",
    ],
    languages: [
        "lang1",
        "lang2",
    ],
    sources: [
        "source1",
        "source2",
    ],
    datesIso8601: [
        {
            scheme: "iso-scheme1",
            date: "2018-03-18",
        },
        {
            scheme: "iso-scheme2",
            date: "2018-03-17",
        },
    ],
    dates: [ // TODO is this actually the same type of object?
        {
            scheme: "scheme1",
            date: "2018-03-16",
        },
        {
            scheme: "scheme2",
            date: "2018-03-15",
        },
    ],
    remarks: "remark",
    rightsHolders: [
        "rH1",
        "rH2",
    ],
    publishers: [
        "pub1",
        "pub2",
    ],
    dateAvailable: "2018-03-14",
}

const mandatoryOnly: Metadata = {
    doi: "doi:10.17632/DANS.6wg5xccnjd.2",
    urn: "random urn",
    titles: [
        "title1",
    ],
    creators: [
        {
            initials: "A.S.",
            surname: "Terix",
        },
    ],
    created: "2018-03-19",
    descriptions: [
        "description1",
        "description2",
    ],
    audiences: [
        "audience1",
        "audience2",
    ],
}

export const newMetadata: () => Metadata = () => ({
    doi: "",
    urn: "",
    titles: ["New Deposit"],
    creators: [],
    created: dateformat(new Date(), "yyy-mm-dd"),
    descriptions: [],
    audiences: [],
})

export const metadataData: { [id: string]: Metadata | undefined } = {
    "93674123-1699-49c5-af91-ed31db19adc9": allfields,
    "1d946f5b-e53b-4f71-b1f3-7481475d07db": mandatoryOnly,
    "a145a1be-5463-4b10-a621-a9e511ff7f20": undefined,
    "5befec97-1e57-4210-b7b6-57a604aaef47": undefined,
}
