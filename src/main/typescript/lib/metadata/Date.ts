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
import { DropdownListEntry } from "../../model/DropdownLists"

enum DateScheme {
    W3CDTF = "dcterms:W3CDTF"
}

function toDateScheme(value: string): DateScheme | undefined {
    return Object.values(DateScheme).find(v => v === value)
}

export const createdQualifier = "dcterms:created"
export const availableQualifier = "dcterms:available"

export interface QualifiedDate<Value> {
    qualifier?: string
    value?: Value
}

export const emptyQualifiedDate: (qualifiers: DropdownListEntry[]) => QualifiedDate<Date> = qs => ({
    qualifier: qs[0].key,
})

export const emptyQualifiedStringDate: (qualifiers: DropdownListEntry[]) => QualifiedDate<string> = qs => ({
    qualifier: qs[0].key,
})

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

const dateConverter: (d: any) => Date | undefined = d => {
    if (d) {
        const date: Date = new Date(d)

        if (isNaN(date.getTime()))
            throw `Error in metadata: invalid date found: '${d}'`
        else
            return date
    }
    return undefined
}

const pad = (input: number, length?: number) => {
    let val = String(input)
    const len = length || 2
    while (val.length < len)
        val = "0" + val

    return val
}

const isoDateTimeFormat = (date: Date) => {
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

export const dateFormat = (date: Date) => {
    const y = date.getFullYear()
    const m = pad(date.getMonth() + 1)
    const d = pad(date.getDate())

    return `${y}-${m}-${d}`
}

const qualifiedDateConverter: (dates: DropdownListEntry[]) => (sd: any) => InternalDate = dates => sd => {
    const scheme = sd.scheme && toDateScheme(sd.scheme)
    const qualifierObj = dates.find(({ key }) => key === sd.qualifier)
    const value = sd.value

    if (qualifierObj)
        if (scheme && scheme === DateScheme.W3CDTF)
            return {
                scheme: scheme,
                qualifier: qualifierObj.key,
                value: value,
            }
        else
            return {
                qualifier: qualifierObj.key,
                value: value,
            }
    else if (sd.qualifier === createdQualifier || sd.qualifier === availableQualifier)
        return {
            scheme: scheme,
            qualifier: sd.qualifier,
            value: value,
        }
    else if (!sd.qualifier) {
        // no qualifier
        if (scheme && scheme === DateScheme.W3CDTF)
            return {
                scheme: scheme,
                qualifier: dates[0].key,
                value: value,
            }
        else
            return {
                qualifier: dates[0].key,
                value: value,
            }
    }
    else
        throw `Error in metadata: no such date qualifier: '${sd.qualifier}'`
}

export const emptyDates: Dates = ({
    dateCreated: { qualifier: createdQualifier, value: undefined },
    dateAvailable: { qualifier: availableQualifier, value: undefined },
    dates: [],
    textDates: [],
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
            default:
                if (scheme)
                    return { ...res, dates: [...res.dates, { qualifier: qualifier, value: dateConverter(value) }] }
                else
                    return { ...res, textDates: [...res.textDates, { qualifier: qualifier, value: value }] }
        }
    }, empty)
}

export const qualifiedDateDeconverter: (d: QualifiedDate<Date>) => any = d => {
    if (d.qualifier || d.value)
        return clean({
            qualifier: d.qualifier,
            scheme: DateScheme.W3CDTF,
            value: d.value ? isoDateTimeFormat(d.value) : "",
        })
    else
        return {}
}

export const qualifiedDateStringDeconverter: (d: QualifiedDate<string>) => any = d => {
    if (d.qualifier || d.value)
        return clean({
            qualifier: d.qualifier,
            value: d.value,
        })
    else
        return {}
}
