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
import { SchemedValue, schemedValueConverter, schemedValueDeconverter } from "./Value"
import * as lodash from "lodash"

enum IdentifierScheme {
    DOI = "id-type:DOI",
}

function toIdentifierScheme(value: string): IdentifierScheme | undefined {
    return Object.values(IdentifierScheme).find(v => v === value)
}

enum AlternativeIdentifierScheme {
    DOI = "id-type:DOI",
    URN = "id-type:URN",
    MENDELEY_DATA = "id-type:MENDELEY-DATA", // kan mogelijk weg
    ISBN = "id-type:ISBN",
    ISSN = "id-type:ISSN",
    NWO_PROJECTNR = "id-type:NWO-PROJECTNR",
    ARCHIS_ZAAK_IDENTIFICATIE = "id-type:ARCHIS-ZAAK-IDENTIFICATIE",
}

function toAlternativeIdentifierScheme(value: string): AlternativeIdentifierScheme | undefined {
    return Object.values(AlternativeIdentifierScheme).find(v => v === value)
}

export const identifiersConverter: (list: any[]) => { [scheme: string]: string } = list => {
    return list.reduce((map, obj) => {
        const scheme = toIdentifierScheme(obj.scheme)
        if (scheme)
            return { ...map, [scheme]: obj.value }
        else
            throw `Error in metadata: no such identifier: '${obj.scheme}'`
    }, {})
}

export type Doi = string

export const doiConverter: (obj: { [scheme: string]: string }) => Doi = obj => obj[IdentifierScheme.DOI]

export const doiDeconverter: (d: Doi) => any = d => ({
    scheme: IdentifierScheme.DOI,
    value: d,
})

const alternativeIdentifierConverter: (ai: any) => SchemedValue = ai => {
    const scheme = ai.scheme && toAlternativeIdentifierScheme(ai.scheme)

    if (scheme)
        return schemedValueConverter(ai.scheme, ai.value)
    else
        throw `Error in metadata: no such identifier: '${ai.scheme}'`
}

export const alternativeIdentifersConverter: (ais: any[]) => [SchemedValue[], SchemedValue[]] = ais => {
    const ids = ais.map(alternativeIdentifierConverter)

    return lodash.partition(ids, { scheme: AlternativeIdentifierScheme.ARCHIS_ZAAK_IDENTIFICATIE })
}

export const alternativeIdentifierDeconverter: (ai: SchemedValue) => any = schemedValueDeconverter
