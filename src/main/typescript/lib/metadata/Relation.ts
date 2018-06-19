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
import { isEmpty, isEqual } from "lodash"
import { clean } from "./misc"
import { DropdownListEntry } from "../../model/DropdownLists"

export interface Relation {
    qualifier?: string
    url?: string
    title?: string
}

export const emptyRelation = ({
    qualifier: "",
    url: "",
    title: "",
})

const relationConverter: (qualifiers: DropdownListEntry[]) => (r: any) => Relation = qualifiers => r => {
    const qualifier = r.qualifier

    if (qualifier && qualifiers.find(({ key }) => key === qualifier))
        return {
            qualifier: qualifier,
            url: r.url,
            title: r.title,
        }
    else
        throw `Error in metadata: no such relation qualifier found: '${qualifier}'`
}

export const relationsConverter: (relationQualifiers: DropdownListEntry[]) => (rs: any[]) => [QualifiedSchemedValue[], Relation[]] = relationQualifiers => rs => {
    return rs.reduce(([relatedIdentifiers, relations], r) => {
        const keys = Object.keys(r)

        if (isEqual(keys, ["qualifier", "scheme", "value"]))
            return [[...relatedIdentifiers, qualifiedSchemedValueConverter(r.qualifier, r.scheme, r.value)], relations]
        else if (!isEmpty(keys))
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
