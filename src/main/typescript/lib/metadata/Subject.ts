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
import { clean } from "./misc"

enum SubjectScheme {
    abrComplex = "abr:ABRcomplex",
}

function toSubjectScheme(value: string): SubjectScheme | undefined {
    return Object.values(SubjectScheme).find(v => v === value)
}

export const subjectConverter: (ss: any[]) => [string[], string[]] = ss => {
    return ss.reduce(([subjects, abrSubjects], s) => {
        const scheme = s.scheme && toSubjectScheme(s.scheme)
        const key = s.key
        const value = s.value

        if (scheme && key)
            return [subjects, [...abrSubjects, key]]
        else if (!scheme && !key && value)
            return [[...subjects, value], abrSubjects]
        else
            throw `Error in metadata: unrecognized subject: ${JSON.stringify(s)}`
    }, [[], []])
}

export const subjectDeconverter: (s: string) => any = s => clean({
    value: s,
})

export const subjectAbrDeconverter: (s: string) => any = s => {
    if (s)
        return {
            scheme: SubjectScheme.abrComplex,
            key: s,
            value: "???", // TODO get correct value
        }
    else
        return {}
}
