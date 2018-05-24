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
import { clean } from "./misc"
import * as dateFormat from "dateformat"

enum DateScheme {
    W3CDTF = "dcterms:W3CDTF"
}

function toDateScheme(value: string): DateScheme | undefined {
    return Object.values(DateScheme).find(v => v === value)
}

export enum DateQualifier {
    created = "dcterms:created",
    available = "dcterms:available",
    date = "dcterms:date",
    dateAccepted = "dcterms:dateAccepted",
    dateCopyrighted = "dcterms:dateCopyrighted",
    dateSubmitted = "dcterms:dateSubmitted",
    issued = "dcterms:issued",
    modified = "dcterms:modified",
    valid = "dcterms:valid",
}

function toDateQualifier(value: string): DateQualifier | undefined {
    return Object.values(DateQualifier).find(v => v === value)
}

export interface QualifiedDate<Value> {
    qualifier?: DateQualifier
    value?: Value
}

export const emptyQualifiedDate: QualifiedDate<Date> = {}
export const emptyQualifiedStringDate: QualifiedDate<string> = {}

interface InternalDate {
    scheme?: DateScheme,
    qualifier: DateQualifier,
    value: string
}

export interface Dates {
    dateCreated?: QualifiedDate<Date>
    dateAvailable?: QualifiedDate<Date>
    dateSubmitted?: QualifiedDate<Date>
    dates: QualifiedDate<Date>[]
    textDates: QualifiedDate<string>[]
}

const dateConverter: (d: any) => Date = d => new Date(d)

const dateDeconverter: (d: Date) => any = d => dateFormat(d, "isoDateTime")

const qualifiedDateConverter: (sd: any) => InternalDate = sd => {
    const scheme = sd.scheme && toDateScheme(sd.scheme)
    const qualifier = toDateQualifier(sd.qualifier)
    const value = sd.value

    if (qualifier) {
        if (scheme && scheme === DateScheme.W3CDTF)
            return ({
                scheme: scheme,
                qualifier: qualifier,
                value: value,
            })
        else
            switch (qualifier) {
                case DateQualifier.created:
                case DateQualifier.available:
                case DateQualifier.dateSubmitted:
                    throw `Error in metadata: schemaless dates with qualifiers 'created', 'available' or 'submitted' are not allowed`
                default:
                    return ({
                        qualifier: qualifier,
                        value: value,
                    })
            }
    }
    else
        throw `Error in metadata: no such date qualifier: '${sd.qualifier}'`
}

export const emptyDates: Dates = ({
    dateCreated: { qualifier: DateQualifier.created, value: undefined },
    dateAvailable: { qualifier: DateQualifier.available, value: undefined },
    dateSubmitted: { qualifier: DateQualifier.dateSubmitted, value: undefined },
    dates: [{ qualifier: undefined, value: undefined }],
    textDates: [{ qualifier: undefined, value: "" }],
})

export const qualifiedDatesConverter: (sds: any) => Dates = sds => {
    const stringDates: InternalDate[] = sds.map(qualifiedDateConverter)

    const empty: Dates = ({
        dates: [],
        textDates: [],
    })

    return stringDates.reduce((res, { scheme, qualifier, value }) => {
        switch (qualifier) {
            case DateQualifier.created:
                if (res.dateCreated)
                    throw `Error in metadata: multiple dates with qualifier 'created' found`
                else
                    return { ...res, dateCreated: { qualifier: qualifier, value: dateConverter(value) } }
            case DateQualifier.available:
                if (res.dateAvailable)
                    throw `Error in metadata: multiple dates with qualifier 'available' found`
                else
                    return { ...res, dateAvailable: { qualifier: qualifier, value: dateConverter(value) } }
            case DateQualifier.dateSubmitted:
                if (res.dateSubmitted)
                    throw `Error in metadata: multiple dates with qualifier 'submitted' found`
                else
                    return { ...res, dateSubmitted: { qualifier: qualifier, value: dateConverter(value) } }
            default:
                if (scheme)
                    return { ...res, dates: [...res.dates, { qualifier: qualifier, value: dateConverter(value) }] }
                else
                    return { ...res, textDates: [...res.textDates, { qualifier: qualifier, value: value }] }
        }
    }, empty)
}

export const qualifiedDateDeconverter: (d: QualifiedDate<Date>) => any = d => {
    if (d.value)
        return {
            scheme: DateScheme.W3CDTF,
            value: dateDeconverter(d.value),
            qualifier: d.qualifier,
        }
    else
        return {}
}

export const qualifiedDateStringDeconverter: (d: QualifiedDate<string>) => any = d => clean({
    value: d.value,
    qualifier: d.qualifier,
})
