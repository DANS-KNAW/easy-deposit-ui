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
import { DropdownListEntry } from "../../model/DropdownLists"

enum DateScheme {
    W3CDTF = "dcterms:W3CDTF"
}

function toDateScheme(value: string): DateScheme | undefined {
    return Object.values(DateScheme).find(v => v === value)
}

export const createdQualifier = "dcterms:created"
export const availableQualifier = "dcterms:available"
export const dateSubmittedQualifier = "dcterms:dateSubmitted"

export interface QualifiedDate<Value> {
    qualifier?: string
    value?: Value
}

export const emptyQualifiedDate: QualifiedDate<Date> = {}
export const emptyQualifiedStringDate: QualifiedDate<string> = {}

interface InternalDate {
    scheme?: DateScheme,
    qualifier: string,
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

const qualifiedDateConverter: (dates: DropdownListEntry[]) => (sd: any) => InternalDate = dates => sd => {
    const scheme = sd.scheme && toDateScheme(sd.scheme)
    const qualifierObj = dates.find(({key}) => key === sd.qualifier)
    const value = sd.value

    if (qualifierObj)
        if (scheme && scheme === DateScheme.W3CDTF)
            return ({
                scheme: scheme,
                qualifier: qualifierObj.key,
                value: value,
            })
        else
            return ({
                qualifier: qualifierObj.key,
                value: value,
            })
    else if (sd.qualifier === createdQualifier || sd.qualifier === availableQualifier || sd.qualifier === dateSubmittedQualifier)
        return ({
            scheme: scheme,
            qualifier: sd.qualifier,
            value: value,
        })
    else
        throw `Error in metadata: no such date qualifier: '${sd.qualifier}'`
}

export const emptyDates: Dates = ({
    dateCreated: { qualifier: createdQualifier, value: undefined },
    dateAvailable: { qualifier: availableQualifier, value: undefined },
    dateSubmitted: { qualifier: dateSubmittedQualifier, value: undefined },
    dates: [{ qualifier: undefined, value: undefined }],
    textDates: [{ qualifier: undefined, value: "" }],
})

export const qualifiedDatesConverter: (dates: DropdownListEntry[]) => (sds: any) => Dates = dates => sds => {
    const stringDates: InternalDate[] = sds.map(qualifiedDateConverter(dates))

    const empty: Dates = ({
        dates: [],
        textDates: [],
    })

    return stringDates.reduce((res, { scheme, qualifier, value }) => {
        switch (qualifier) {
            case createdQualifier:
                if (res.dateCreated)
                    throw `Error in metadata: multiple dates with qualifier 'created' found`
                else
                    return { ...res, dateCreated: { qualifier: qualifier, value: dateConverter(value) } }
            case availableQualifier:
                if (res.dateAvailable)
                    throw `Error in metadata: multiple dates with qualifier 'available' found`
                else
                    return { ...res, dateAvailable: { qualifier: qualifier, value: dateConverter(value) } }
            case dateSubmittedQualifier:
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
