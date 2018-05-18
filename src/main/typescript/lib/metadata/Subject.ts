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
import { emptyStringValue, Value } from "./Value"

enum SubjectScheme {
    abrComplex = "abr:ABRcomplex",
}

function toSubjectScheme(value: string): SubjectScheme | undefined {
    return Object.values(SubjectScheme).find(v => v === value)
}

export const subjectConverter: (ss: any[]) => [Value[], Value[]] = ss => {
    return ss.reduce(([subjects, abrSubjects], s) => {
        const scheme = s.scheme && toSubjectScheme(s.scheme)
        const key = s.key
        const value = s.value

        if (scheme && key)
            return [subjects, [...abrSubjects, { value: key }]]
        else if (!scheme && !key && value)
            return [[...subjects, { value: value }], abrSubjects]
        else
            throw `Error in metadata: unrecognized subject: ${JSON.stringify(s)}`
    }, [[emptyStringValue], [emptyStringValue]])
}

export const subjectDeconverter: (s: Value) => any = s => ({
    value: s.value
})

export const subjectAbrDeconverter: (s: Value) => any = s => ({
    scheme: SubjectScheme.abrComplex,
    key: s.value,
    value: "???", // TODO get correct value
})
