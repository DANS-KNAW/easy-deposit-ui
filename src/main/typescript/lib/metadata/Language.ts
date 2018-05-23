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

enum LanguageScheme {
    ISO639_2 = "dcterms:ISO639-2",
}

function toLanguageScheme(value: string): LanguageScheme | undefined {
    return Object.values(LanguageScheme).find(v => v === value)
}

export const languageOfDescriptionConverter: (schemedLanguageOfDescription: any) => string = lang => {
    const scheme = toLanguageScheme(lang.scheme)

    if (scheme && scheme === LanguageScheme.ISO639_2)
        return lang.key
    else
        throw `Error in metadata: no such language scheme: '${lang.scheme}'`
}

export const languageOfDescriptionDeconverter: (lang: string) => any = lang => clean({
    scheme: LanguageScheme.ISO639_2,
    key: lang,
    value: "???", // TODO get correct value
})

export const languagesOfFilesConverter: (lofs: any[]) => [string[], string[]] = lofs => {
    return lofs.reduce(([isoLangs, langs], lof) => {
        const scheme = lof.scheme && toLanguageScheme(lof.scheme)

        if (scheme && scheme === LanguageScheme.ISO639_2)
            return [[...isoLangs, lof.key], langs]
        else if (isEqual(Object.keys(lof), ["value"]))
            return [isoLangs, [...langs, lof.value]]
        else
            throw `Error in metadata: unrecognized language-of-files object: ${JSON.stringify(lof)}`
    }, [[], []])
}

export const languageOfFilesIsoDeconverter: (lof: string) => any = lof => {
    if (lof)
        return {
            scheme: LanguageScheme.ISO639_2,
            key: lof,
            value: "???", // TODO get correct value
        }
    else
        return {}
}

export const languageOfFilesDeconverter: (lof: string) => any = lof => clean({
    value: lof,
})
