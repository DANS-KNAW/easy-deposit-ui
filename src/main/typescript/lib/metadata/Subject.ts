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
import { DropdownListEntry } from "../../model/DropdownLists"

enum SubjectScheme {
    abrComplex = "abr:ABRcomplex",
}

function toSubjectScheme(value: string): SubjectScheme | undefined {
    return Object.values(SubjectScheme).find(v => v === value)
}

export const subjectConverter: (abrComplexSubjects: DropdownListEntry[]) => (ss: any[]) => [string[], string[]] = abrComplexSubjects => ss => {
    return ss.reduce(([subjects, abrSubjects], s) => {
        const scheme = s.scheme && toSubjectScheme(s.scheme)

        if (scheme && scheme === SubjectScheme.abrComplex && s.key)
            if (abrComplexSubjects.find(({ key }) => key === s.key))
                return [subjects, [...abrSubjects, s.key]]
            else
                throw `Error in metadata: no such ABR complex subject found: '${s.key}'`
        else if (!scheme && !s.key && s.value)
            return [[...subjects, s.value], abrSubjects]
        else
            throw `Error in metadata: unrecognized subject: ${JSON.stringify(s)}`
    }, [[], []])
}

export const subjectDeconverter: (s: string) => any = s => clean({
    value: s,
})

export const subjectAbrDeconverter: (abrComplexSubjects: DropdownListEntry[]) => (s: string) => any = abrComplexSubjects => s => {
    const entry: DropdownListEntry | undefined = abrComplexSubjects.find(({ key }) => key === s)

    if (s)
        if (entry)
            return {
                scheme: SubjectScheme.abrComplex,
                key: s,
                value: entry.value,
            }
        else
            throw `Error in metadata: no valid ABR complex subject found for key '${s}'`
    else
        return {}
}
