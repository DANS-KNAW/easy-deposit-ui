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
import { isEqual } from "lodash"
import { clean } from "./misc"
import { DropdownListEntry } from "../../model/DropdownLists"

enum LanguageScheme {
    ISO639_2 = "dcterms:ISO639-2",
}

function toLanguageScheme(value: string): LanguageScheme | undefined {
    return Object.values(LanguageScheme).find(v => v === value)
}

export const languageOfDescriptionConverter: (languages: DropdownListEntry[]) => (schemedLanguageOfDescription: any) => string = languages => lang => {
    const scheme = toLanguageScheme(lang.scheme)

    if (scheme && scheme === LanguageScheme.ISO639_2)
        if (languages.find(({ key }) => key === lang.key))
            return lang.key
        else
            throw `Error in metadata: no such language of description found: '${lang.key}'`
    else
        throw `Error in metadata: no such language scheme: '${lang.scheme}'`
}

export const languageOfDescriptionDeconverter: (languages: DropdownListEntry[]) => (lang: string) => any = languages => lang => {
    const entry: DropdownListEntry | undefined = languages.find(({ key }) => key === lang)

    if (entry)
        return {
            scheme: LanguageScheme.ISO639_2,
            key: lang,
            value: entry.value,
        }
    else
        throw `Error in metadata: no valid language of description found for key '${lang}'`
}

export const languagesOfFilesConverter: (languages: DropdownListEntry[]) => (lofs: any[]) => [string[], string[]] = languages => lofs => {
    return lofs.reduce(([isoLangs, langs], lof) => {
        const scheme = lof.scheme && toLanguageScheme(lof.scheme)

        if (scheme && scheme === LanguageScheme.ISO639_2)
            if (languages.find(({ key }) => key === lof.key))
                return [[...isoLangs, lof.key], langs]
            else
                throw `Error in metadata: no such language of files found: '${lof.key}'`

        else if (isEqual(Object.keys(lof), ["value"]))
            return [isoLangs, [...langs, lof.value]]
        else
            throw `Error in metadata: unrecognized language of files object: ${JSON.stringify(lof)}`
    }, [[], []])
}

export const languageOfFilesIsoDeconverter: (languages: DropdownListEntry[]) => (lof: string) => any = languages => lof => {
    const entry: DropdownListEntry | undefined = languages.find(({ key }) => key === lof)

    if (lof)
        if (entry)
            return {
                scheme: LanguageScheme.ISO639_2,
                key: lof,
                value: entry.value,
            }
        else
            throw `Error in metadata: no valid language of files found for key '${lof}'`
    else
        return {}
}

export const languageOfFilesDeconverter: (lof: string) => any = lof => clean({
    value: lof,
})
