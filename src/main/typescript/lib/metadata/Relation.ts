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
import { QualifiedSchemedValue, qualifiedSchemedValueConverter, qualifiedSchemedValueDeconverter } from "./Value"
import { clean } from "./misc"
import { DropdownListEntry } from "../../model/DropdownLists"

export interface Relation {
    qualifier?: string
    url?: string
    title?: string
}

export const emptyRelation: (qualifiers: DropdownListEntry[]) => Relation = qs => ({
    qualifier: qs[0].key,
    url: "",
    title: "",
})

const relatedIdentifierConverter: (qualifiers: DropdownListEntry[], identifiers: DropdownListEntry[]) => (ri: any) => QualifiedSchemedValue = (qualifiers, identifiers) => ri => {
    const qualifier = ri.qualifier
    const scheme = ri.scheme

    if (qualifier && qualifiers.find(({ key }) => key === qualifier) || !qualifier) {
        if (scheme && identifiers.find(({key}) => key === scheme) || !scheme)
            return qualifiedSchemedValueConverter(ri.qualifier || qualifiers[0].key, ri.scheme, ri.value)
        else
            throw `Error in metadata: no such related identifier scheme found: '${scheme}'`
    }
    else
        throw `Error in metadata: no such related identifier qualifier found: '${qualifier}'`
}

const relationConverter: (qualifiers: DropdownListEntry[]) => (r: any) => Relation = qualifiers => r => {
    const qualifier = r.qualifier

    if (qualifier && qualifiers.find(({ key }) => key === qualifier) || !qualifier)
        return {
            qualifier: qualifier || qualifiers[0].key,
            url: r.url,
            title: r.title,
        }
    else
        throw `Error in metadata: no such relation qualifier found: '${qualifier}'`
}

export const relationsConverter: (relationQualifiers: DropdownListEntry[], identifiers: DropdownListEntry[]) => (rs: any[]) => [QualifiedSchemedValue[], Relation[]] = (relationQualifiers, identifiers) => rs => {
    return rs.reduce(([relatedIdentifiers, relations], r) => {
        const keys = Object.keys(r)

        // if the object only contains a 'qualifier' is is marked as a Relation rather than a RelatedIdentifier
        if (keys.includes("scheme") || keys.includes("value"))
            return [[...relatedIdentifiers, relatedIdentifierConverter(relationQualifiers, identifiers)(r)], relations]
        else if (keys.includes("qualifier") || keys.includes("title") || keys.includes("url"))
            return [relatedIdentifiers, [...relations, relationConverter(relationQualifiers)(r)]]
        else
            throw `Error in metadata: unrecognized relation: ${JSON.stringify(r)}`
    }, [[], []])
}

export const relationDeconverter: (r: Relation) => any = r => clean({
    qualifier: r.qualifier,
    url: r.url,
    title: r.title,
})

export const relatedIdentifierDeconverter: (ri: QualifiedSchemedValue) => any = qualifiedSchemedValueDeconverter
