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
import { emptySchemedValue, SchemedValue, schemedValueConverter, schemedValueDeconverter } from "./Value"
import * as lodash from "lodash"
import { clean, nonEmptyObject } from "./misc"

enum CreatorIdScheme {
    DAI = "id-type:DAI",
    ORCID = "id-type:ORCID",
    ISNI = "id-type:ISNI",
}

function toCreatorIdScheme(value: string): CreatorIdScheme | undefined {
    return Object.values(CreatorIdScheme).find(v => v === value)
}

enum CreatorRoleScheme {
    DATACITE_CONTRIBUTOR = "datacite:contributorType",
}

function toCreatorRoleScheme(value: string): CreatorRoleScheme | undefined {
    return Object.values(CreatorRoleScheme).find(v => v === value)
}

export interface Creator {
    titles?: string
    initials?: string
    insertions?: string
    surname?: string
    ids?: SchemedValue[]
    role?: string
    organization?: string
}

export const emptyCreator: Creator = {
    titles: "",
    initials: "",
    insertions: "",
    surname: "",
    ids: [emptySchemedValue],
    role: "",
    organization: "",
}

const creatorSchemeIdConverter: (cs: any) => SchemedValue = cs => {
    const scheme = toCreatorIdScheme(cs.scheme)

    if (scheme) {
        return schemedValueConverter(scheme, cs.value)
    }
    else
        throw `Error in metadata: no such creator/contributor scheme: '${cs.scheme}'`
}

const creatorSchemeIdDeconverter: (sv: SchemedValue) => any = schemedValueDeconverter

const creatorRoleConverter: (cr: any) => string = cr => {
    const scheme = toCreatorRoleScheme(cr.scheme)

    if (scheme && scheme === CreatorRoleScheme.DATACITE_CONTRIBUTOR) {
        return cr.key
    }
}

const creatorRoleDeconverter: (r: string) => any = r => clean({
    scheme: CreatorRoleScheme.DATACITE_CONTRIBUTOR,
    key: r,
    value: "???", // TODO get correct value
})

export const creatorConverter: (c: any) => Creator = c => {
    return ({
        titles: c.titles || "",
        initials: c.initials || "",
        insertions: c.insertions || "",
        surname: c.surname || "",
        ids: c.ids ? c.ids.map(creatorSchemeIdConverter) : [emptySchemedValue],
        role: c.role ? creatorRoleConverter(c.role) : "",
        organization: c.organization || "",
    })
}

export const creatorDeconverter: (c: Creator) => any = c => clean({
    titles: c.titles,
    initials: c.initials,
    insertions: c.insertions,
    surname: c.surname,
    ids: c.ids && c.ids.map(creatorSchemeIdDeconverter).filter(nonEmptyObject),
    role: c.role && creatorRoleDeconverter(c.role),
    organization: c.organization,
})

export const contributorsConverter: (cs: any) => [Creator[], Creator[]] = cs => {
    const contributors: Creator[] = cs.map(creatorConverter)
    return lodash.partition(contributors, { role: "RightsHolder" })
}
