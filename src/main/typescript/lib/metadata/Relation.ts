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
import {
    emptyQualifiedSchemedValue,
    QualifiedSchemedValue,
    qualifiedSchemedValueConverter,
    qualifiedSchemedValueDeconverter,
} from "./Value"
import {isEmpty, isEqual} from "lodash"

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

const relationConverter: (r: any) => Relation = r => ({
    qualifier: r.qualifier,
    url: r.url,
    title: r.title,
})

export const relationsConverter: (rs: any[]) => [QualifiedSchemedValue[], Relation[]] = rs => {
    return rs.reduce(([relatedIdentifiers, relations], r) => {
        const keys = Object.keys(r)

        if (isEqual(keys, ["qualifier", "scheme", "value"]))
            return [[...relatedIdentifiers, qualifiedSchemedValueConverter(r.qualifier, r.scheme, r.value)], relations]
        else if (!isEmpty(keys))
            return [relatedIdentifiers, [...relations, relationConverter(r)]]
        else
            throw `Error in metadata: unrecognized relation: ${JSON.stringify(r)}`
    }, [[emptyQualifiedSchemedValue], [emptyRelation]])
}

export const relationDeconverter: (r: Relation) => any = r => ({
    qualifier: r.qualifier,
    url: r.url,
    title: r.title,
})

export const relatedIdentifierDeconverter: (ri: QualifiedSchemedValue) => any = qualifiedSchemedValueDeconverter
