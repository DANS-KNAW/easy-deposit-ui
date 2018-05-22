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
import { Value, wrapValue } from "./Value"
import { clean } from "./misc"

enum AudienceScheme {
    narcisDisciplineTypes = "narcis:DisciplineType",
}

function toAudienceScheme(value: string): AudienceScheme | undefined {
    return Object.values(AudienceScheme).find(v => v === value)
}

export const audienceConverter: (a: any) => Value = a => {
    const scheme = toAudienceScheme(a.scheme)

    if (scheme && scheme === AudienceScheme.narcisDisciplineTypes)
        return wrapValue(a.key)
    else
        throw `Error in metadata: no such audience scheme: '${a.scheme}'`
}

export const audienceDeconverter: (a: Value) => any = a => clean({
    scheme: AudienceScheme.narcisDisciplineTypes,
    key: a.value,
    value: "???", // TODO get correct value
})
