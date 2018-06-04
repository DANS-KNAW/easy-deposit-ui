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

enum ContributorIdScheme {
    DAI = "id-type:DAI",
    ORCID = "id-type:ORCID",
    ISNI = "id-type:ISNI",
}

function toContributorIdScheme(value: string): ContributorIdScheme | undefined {
    return Object.values(ContributorIdScheme).find(v => v === value)
}

enum ContributorRoleScheme {
    DATACITE_CONTRIBUTOR = "datacite:contributorType",
}

function toContributorRoleScheme(value: string): ContributorRoleScheme | undefined {
    return Object.values(ContributorRoleScheme).find(v => v === value)
}

export interface Contributor {
    titles?: string
    initials?: string
    insertions?: string
    surname?: string
    ids?: SchemedValue[]
    role?: string
    organization?: string
}

export const emptyContributor: Contributor = {
    titles: "",
    initials: "",
    insertions: "",
    surname: "",
    ids: [emptySchemedValue],
    role: "",
    organization: "",
}

const contributorSchemeIdConverter: (cs: any) => SchemedValue = cs => {
    const scheme = toContributorIdScheme(cs.scheme)

    if (scheme) {
        return schemedValueConverter(scheme, cs.value)
    }
    else
        throw `Error in metadata: no such creator/contributor scheme: '${cs.scheme}'`
}

const contributorSchemeIdDeconverter: (sv: SchemedValue) => any = schemedValueDeconverter

const contributorRoleConverter: (cr: any) => string = cr => {
    const scheme = toContributorRoleScheme(cr.scheme)

    if (scheme && scheme === ContributorRoleScheme.DATACITE_CONTRIBUTOR)
        return cr.key
    else
        throw `Error in metadata: no such creator/contributor role scheme: '${cr.scheme}'`
}

const contributorRoleDeconverter: (r: string) => any = r => clean({
    scheme: ContributorRoleScheme.DATACITE_CONTRIBUTOR,
    key: r,
    value: "???", // TODO get correct value
})

export const contributorConverter: (c: any) => Contributor = c => {
    return ({
        titles: c.titles || "",
        initials: c.initials || "",
        insertions: c.insertions || "",
        surname: c.surname || "",
        ids: c.ids ? c.ids.map(contributorSchemeIdConverter) : [emptySchemedValue],
        role: c.role ? contributorRoleConverter(c.role) : "",
        organization: c.organization || "",
    })
}

export const contributorsConverter: (cs: any) => [Contributor[], Contributor[]] = cs => {
    const contributors: Contributor[] = cs.map(contributorConverter)
    return lodash.partition(contributors, { role: "RightsHolder" })
}

export const contributorDeconverter: (c: Contributor) => any = c => clean({
    titles: c.titles,
    initials: c.initials,
    insertions: c.insertions,
    surname: c.surname,
    ids: c.ids && c.ids.map(contributorSchemeIdDeconverter).filter(nonEmptyObject),
    role: c.role && contributorRoleDeconverter(c.role),
    organization: c.organization,
})
