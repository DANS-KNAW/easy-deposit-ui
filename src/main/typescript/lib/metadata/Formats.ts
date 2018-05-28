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

enum FormatScheme {
    imt = "dcterms:IMT",
}

const cmdiFormat = "application/x-cmdi+xml"

function toFormatScheme(value: string): FormatScheme | undefined {
    return Object.values(FormatScheme).find(v => v === value)
}

export const formatsConverter: (imtFormatValues: DropdownListEntry[]) => (formats: any[]) => [string[], string[], boolean] = imtFormatValues => formats => {
    return formats.reduce(([imtFormats, normalFormats, hasCmdi], format) => {
        const scheme = format.scheme && toFormatScheme(format.scheme)
        const value = format.value

        if (scheme && scheme === FormatScheme.imt)
            if (value === cmdiFormat)
                return [imtFormats, normalFormats, true]
            else if (imtFormatValues.find(({ key }) => key === value))
                return [[...imtFormats, format.value], normalFormats, hasCmdi]
            else
                throw `Error in metadata: invalid internet media type: '${value}'`
        else if (isEqual(Object.keys(format), ["value"]))
            return [imtFormats, [...normalFormats, format.value], hasCmdi]
        else
            throw `Error in metadata: unrecognized object: ${JSON.stringify(format)}`
    }, [[], [], false])
}

export const imtFormatDeconverter: (type: string) => any = type => {
    if (type)
        return {
            scheme: FormatScheme.imt,
            value: type,
        }
    else
        return {}
}

export const formatDeconverter: (type: string) => any = type => clean({
    value: type,
})

export const cmdiFormatDeconverter: () => any = () => ({
    scheme: FormatScheme.imt,
    value: cmdiFormat,
})
