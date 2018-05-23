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
import { Value } from "./Value"
import { isEqual } from "lodash"
import { clean } from "./misc"

enum TypeScheme {
    dcmi = "dcterms:DCMIType",
}

function toTypeScheme(value: string): TypeScheme | undefined {
    return Object.values(TypeScheme).find(v => v === value)
}

export const typesConverter: (types: any[]) => [Value[], Value[]] = types => {
    return types.reduce(([dcmiTypes, normalTypes], type) => {
        const scheme = type.scheme && toTypeScheme(type.scheme)

        if (scheme && scheme == TypeScheme.dcmi)
            return [[...dcmiTypes, { value: type.value }], normalTypes]
        else if (isEqual(Object.keys(type), ["value"]))
            return [dcmiTypes, [...normalTypes, { value: type.value }]]
        else
            throw `Error in metadata: unrecognized object: ${JSON.stringify(type)}`
    }, [[], []])
}

export const dcmiTypeDeconverter: (type: Value) => any = type => {
    if (type.value)
        return {
            scheme: TypeScheme.dcmi,
            value: type.value,
        }
    else
        return {}
}

export const typeDeconverter: (type: Value) => any = type => clean({
    value: type.value,
})