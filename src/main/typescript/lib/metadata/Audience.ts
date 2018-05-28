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

enum AudienceScheme {
    narcisDisciplineTypes = "narcis:DisciplineType",
}

function toAudienceScheme(value: string): AudienceScheme | undefined {
    return Object.values(AudienceScheme).find(v => v === value)
}

export const audienceConverter: (audiences: DropdownListEntry[]) => (a: any) => string = audiences => a => {
    const scheme = toAudienceScheme(a.scheme)

    if (scheme && scheme === AudienceScheme.narcisDisciplineTypes)
        if (audiences.find(({ key }) => key === a.key))
            return a.key
        else
            throw `Error in metadata: no such audience found: '${a.key}'`
    else
        throw `Error in metadata: no such audience scheme: '${a.scheme}'`
}

export const audienceDeconverter: (audiences: DropdownListEntry[]) => (a: string) => any = audiences => a => {
    const entry: DropdownListEntry | undefined = audiences.find(({ key }) => key === a)

    if (entry)
        return {
            scheme: AudienceScheme.narcisDisciplineTypes,
            key: a,
            value: entry.value,
        }
    else
        throw `Error in metadata: no valid audience found for key '${a}'`
}
