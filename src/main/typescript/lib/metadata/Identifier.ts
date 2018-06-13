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
import { DropdownListEntry } from "../../model/DropdownLists"

enum IdentifierScheme {
    DOI = "id-type:DOI",
}

function toIdentifierScheme(value: string): IdentifierScheme | undefined {
    return Object.values(IdentifierScheme).find(v => v === value)
}

const archisZaakIdentificatie = "id-type:ARCHIS-ZAAK-IDENTIFICATIE"

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

const alternativeIdentifierConverter: (identifiers: DropdownListEntry[]) => (ai: any) => SchemedValue = identifiers => ai => {
    const scheme = ai.scheme && (identifiers.find(({ key }) => key === ai.scheme) || archisZaakIdentificatie === ai.scheme)

    if (scheme)
        return schemedValueConverter(ai.scheme, ai.value)
    else
        throw `Error in metadata: no such identifier: '${ai.scheme}'`
}

export const alternativeIdentifersConverter: (identifiers: DropdownListEntry[]) => (ais: any[]) => [SchemedValue[], SchemedValue[]] = identifiers => ais => {
    const ids = ais.map(alternativeIdentifierConverter(identifiers))

    return lodash.partition(ids, { scheme: archisZaakIdentificatie })
}

export const alternativeIdentifierDeconverter: (ai: SchemedValue) => any = schemedValueDeconverter

export const archisIdentifierDeconverter: (ai: string) => any = ai => {
    if (ai)
        return {
            scheme: archisZaakIdentificatie,
            value: ai,
        }
    else
        return {}
}
