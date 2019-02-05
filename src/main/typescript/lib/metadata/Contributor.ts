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
import { partition } from "lodash"
import { clean, emptyString, nonEmptyObject } from "./misc"
import { DropdownListEntry } from "../../model/DropdownLists"

enum ContributorRoleScheme {
    DATACITE_CONTRIBUTOR = "datacite:contributorType",
}

function toContributorRoleScheme(value: string): ContributorRoleScheme | undefined {
    return Object.values(ContributorRoleScheme).find(v => v === value)
}

export const creatorRole = "Creator"
const rightsholderRole = "RightsHolder"
const rightsholderValue = "Rightsholder"

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
    titles: emptyString,
    initials: emptyString,
    insertions: emptyString,
    surname: emptyString,
    ids: [emptySchemedValue],
    role: emptyString,
    organization: emptyString,
}

export const emptyCreator: Contributor = {
    ...emptyContributor,
    role: creatorRole,
}

export const emptyRightsholder: Contributor = {
    ...emptyContributor,
    role: rightsholderRole,
}

const contributorSchemeIdConverter: (ids: DropdownListEntry[]) => (cs: any) => SchemedValue = ids => cs => {
    const scheme = cs.scheme && ids.find(({ key }) => key === cs.scheme)

    if (scheme || !cs.scheme)
        return schemedValueConverter(cs.scheme, cs.value)
    else
        throw `Error in metadata: no such creator/contributor id scheme: '${cs.scheme}'`
}

const contributorSchemeIdDeconverter: (sv: SchemedValue) => any = schemedValueDeconverter

const contributorRoleConverter: (roles: DropdownListEntry[]) => (cr: any) => string = roles => cr => {
    const scheme = toContributorRoleScheme(cr.scheme)

    if (scheme && scheme === ContributorRoleScheme.DATACITE_CONTRIBUTOR) {
        if (roles.find(({ key }) => key === cr.key) || rightsholderRole === cr.key)
            return cr.key
        else
            throw `Error in metadata: no such creator/contributor role: '${cr.key}'`
    }
    else
        throw `Error in metadata: no such creator/contributor role scheme: '${cr.scheme}'`
}

const contributorRoleDeconverter: (roles: DropdownListEntry[]) => (r: string) => any = roles => r => {
    const entry: DropdownListEntry | undefined = roles.find(({ key }) => key === r)

    if (entry)
        return {
            scheme: ContributorRoleScheme.DATACITE_CONTRIBUTOR,
            key: r,
            value: entry.value,
        }
    else
        throw `Error in metadata: no valid role found for key '${r}'`
}

const rightsHolderRoleDeconverter: (r: string) => any = r => clean({
    scheme: ContributorRoleScheme.DATACITE_CONTRIBUTOR,
    key: r,
    value: rightsholderValue,
})

export const splitCreatorsAndContributors: (cs: Contributor[]) => [Contributor[], Contributor[]] = cs => partition(cs, { role: creatorRole })

export const contributorConverter: (ids: DropdownListEntry[], roles: DropdownListEntry[]) => (c: any) => Contributor = (ids, roles) => c => {
    return ({
        titles: c.titles || emptyString,
        initials: c.initials || emptyString,
        insertions: c.insertions || emptyString,
        surname: c.surname || emptyString,
        ids: c.ids ? c.ids.map(contributorSchemeIdConverter(ids)) : [emptySchemedValue],
        role: c.role ? contributorRoleConverter(roles)(c.role) : emptyString,
        organization: c.organization || emptyString,
    })
}

export const contributorDeconverter: (roles: DropdownListEntry[]) => (c: Contributor) => any = roles => c => clean({
    titles: c.titles,
    initials: c.initials,
    insertions: c.insertions,
    surname: c.surname,
    ids: c.ids && c.ids.map(contributorSchemeIdDeconverter).filter(nonEmptyObject),
    role: c.role && contributorRoleDeconverter(roles)(c.role),
    organization: c.organization,
})

export const creatorConverter: (ids: DropdownListEntry[]) => (c: any) => Contributor = ids => c => {
    return ({
        titles: c.titles || emptyString,
        initials: c.initials || emptyString,
        insertions: c.insertions || emptyString,
        surname: c.surname || emptyString,
        ids: c.ids ? c.ids.map(contributorSchemeIdConverter(ids)) : [emptySchemedValue],
        role: creatorRole,
        organization: c.organization || emptyString,
    })
}

export const creatorDeconverter: (c: Contributor) => any = c => clean({
    titles: c.titles,
    initials: c.initials,
    insertions: c.insertions,
    surname: c.surname,
    ids: c.ids && c.ids.map(contributorSchemeIdDeconverter).filter(nonEmptyObject),
    organization: c.organization,
})

export const rightsHolderDeconverter: (c: Contributor) => any = c => {
    const rh = clean({
        titles: c.titles,
        initials: c.initials,
        insertions: c.insertions,
        surname: c.surname,
        ids: c.ids && c.ids.map(contributorSchemeIdDeconverter).filter(nonEmptyObject),
        organization: c.organization,
    })

    return Object.keys(rh).length !== 0
        ? { ...rh, role: c.role && rightsHolderRoleDeconverter(c.role) }
        : rh
}

export const contributorsConverter: (ids: DropdownListEntry[], roles: DropdownListEntry[]) => (cs: any) => [Contributor[], Contributor[]] = (ids, roles) => cs => {
    const contributors: Contributor[] = cs.map(contributorConverter(ids, roles))
    return partition(contributors, { role: "RightsHolder" })
}
