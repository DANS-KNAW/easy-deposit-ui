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

export interface SchemedValue {
    scheme?: string
    value?: string
}

export const emptySchemedValue: SchemedValue = { scheme: "", value: "" }

export const schemedValueConverter: (scheme: any, value: any) => SchemedValue = (scheme, value) => ({
    scheme: scheme,
    value: value,
})

export const schemedValueDeconverter: (sv: SchemedValue) => any = sv => clean({
    scheme: sv.scheme,
    value: sv.value,
})

export interface QualifiedSchemedValue {
    qualifier?: string
    scheme?: string
    value?: string
}

export const emptyQualifiedSchemedValue: (qualifiers: DropdownListEntry[]) => QualifiedSchemedValue = qs => ({
    qualifier: qs[0].key,
    scheme: "",
    value: "",
})

export const qualifiedSchemedValueConverter: (qualifier: any, scheme: any, value: any) => QualifiedSchemedValue = (qualifier, scheme, value) => ({
    qualifier: qualifier,
    scheme: scheme,
    value: value,
})

export const qualifiedSchemedValueDeconverter: (sv: QualifiedSchemedValue) => any = sv => clean({
    qualifier: sv.qualifier,
    scheme: sv.scheme,
    value: sv.value,
})
