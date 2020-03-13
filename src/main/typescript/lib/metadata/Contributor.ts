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
import { partition } from "lodash"
import { clean, emptyString, nonEmptyObject } from "./misc"
import { ContributorIdDropdownListEntry, DropdownListEntry } from "../../model/DropdownLists"

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
    orcid?: string
    isni?: string
    dai?: string
    role?: string
    organization?: string
}

export const emptyContributor: Contributor = {
    titles: emptyString,
    initials: emptyString,
    insertions: emptyString,
    surname: emptyString,
    orcid: emptyString,
    isni: emptyString,
    dai: emptyString,
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

export const DAI: ContributorIdDropdownListEntry = {
    key: "id-type:DAI",
    value: "DAI",
    displayValue: "DAI",
    format: "^(info:eu-repo/dai/nl/)?[0-9]{8,9}[0-9xX]$",
    placeholder: "(e.g.: info:eu-repo/dai/nl/358163587)",
}

export const ISNI: ContributorIdDropdownListEntry = {
    key: "id-type:ISNI",
    value: "ISNI",
    displayValue: "ISNI",
    // the regexp of the dcx-dai.xsd is embedded in "^()$" to make it a full match in this context
    format: "^((http://isni.org/isni/[0-9]{15}[0-9X])|((ISNI:? ?)?([0-9]{4} ?){3}[0-9]{3}[0-9X]))$",
    placeholder: "(e.g.: 000000012281955X)",
    replace: [
        {
            from: /^http:\/\/www.isni.org\/(.*)$/,
            to: "http://isni.org/$1",
        },
    ],
}

export const ORCID: ContributorIdDropdownListEntry = {
    key: "id-type:ORCID",
    value: "ORCID",
    displayValue: "ORCID",
    format: "^(https://orcid.org/)?([0-9]{4}-){3}[0-9]{3}[0-9xX]?$",
    placeholder: "(e.g.: 0000-0002-1825-0097)",
    replace: [
        {
            from: /^http:\/\/orcid.org\/(.*)$/,
            to: "https://orcid.org/$1",
        },
    ],
}

const contributorSchemeIdConverter: (cs: any) => SchemedValue = cs => {
    const scheme = cs.scheme && [DAI, ISNI, ORCID].find(value => value.key === cs.scheme)

    if (scheme || !cs.scheme)
        return schemedValueConverter(cs.scheme, cs.value)
    else
        throw `Error in metadata: no such creator/contributor id scheme: '${cs.scheme}'`
}

const contributorSchemeIdDeconverter: (scheme: ContributorIdDropdownListEntry, value?: string) => any = (scheme, value) => {
    return schemedValueDeconverter({ scheme: scheme.key, value: value })
}

const contributorIdentifierDeconverter: (c: Contributor) => any = c => {
    return [
        c.dai ? (contributorSchemeIdDeconverter(DAI, c.dai)) : undefined,
        c.isni ? (contributorSchemeIdDeconverter(ISNI, c.isni)) : undefined,
        c.orcid ? (contributorSchemeIdDeconverter(ORCID, c.orcid)) : undefined,
    ].filter(nonEmptyObject)
}

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

export const contributorConverter: (roles: DropdownListEntry[]) => (c: any) => Contributor = roles => c => {
    const contributorIds: SchemedValue[] = c.ids ? c.ids.map(contributorSchemeIdConverter) : []
    return ({
        titles: c.titles || emptyString,
        initials: c.initials || emptyString,
        insertions: c.insertions || emptyString,
        surname: c.surname || emptyString,
        orcid: contributorIds.find(({ scheme }) => scheme === ORCID.key)?.value || emptyString,
        isni: contributorIds.find(({ scheme }) => scheme === ISNI.key)?.value || emptyString,
        dai: contributorIds.find(({ scheme }) => scheme === DAI.key)?.value || emptyString,
        role: c.role ? contributorRoleConverter(roles)(c.role) : emptyString,
        organization: c.organization || emptyString,
    })
}

export const contributorDeconverter: (roles: DropdownListEntry[]) => (c: Contributor) => any = roles => c => clean({
    titles: c.titles,
    initials: c.initials,
    insertions: c.insertions,
    surname: c.surname,
    ids: contributorIdentifierDeconverter(c),
    role: c.role && contributorRoleDeconverter(roles)(c.role),
    organization: c.organization,
})

export const creatorConverter: (c: any) => Contributor = c => {
    const contributorIds: SchemedValue[] = c.ids ? c.ids.map(contributorSchemeIdConverter) : []
    return ({
        titles: c.titles || emptyString,
        initials: c.initials || emptyString,
        insertions: c.insertions || emptyString,
        surname: c.surname || emptyString,
        orcid: contributorIds.find(({ scheme }) => scheme === ORCID.key)?.value || emptyString,
        isni: contributorIds.find(({ scheme }) => scheme === ISNI.key)?.value || emptyString,
        dai: contributorIds.find(({ scheme }) => scheme === DAI.key)?.value || emptyString,
        role: creatorRole,
        organization: c.organization || emptyString,
    })
}

export const creatorDeconverter: (c: Contributor) => any = c => clean({
    titles: c.titles,
    initials: c.initials,
    insertions: c.insertions,
    surname: c.surname,
    ids: contributorIdentifierDeconverter(c),
    organization: c.organization,
})

export const rightsHolderDeconverter: (c: Contributor) => any = c => {
    const rh = clean({
        titles: c.titles,
        initials: c.initials,
        insertions: c.insertions,
        surname: c.surname,
        ids: contributorIdentifierDeconverter(c),
        organization: c.organization,
    })

    return Object.keys(rh).length !== 0
        ? { ...rh, role: c.role && rightsHolderRoleDeconverter(c.role) }
        : rh
}

export const contributorsConverter: (roles: DropdownListEntry[]) => (cs: any) => [Contributor[], Contributor[]] = roles => cs => {
    const contributors: Contributor[] = cs.map(contributorConverter(roles))
    return partition(contributors, { role: "RightsHolder" })
}
