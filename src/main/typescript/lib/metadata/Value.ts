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

export interface Qualifier<Q = string> {
    qualifier: Q
}

export interface Schemed<Scheme = string> {
    scheme: Scheme
}

export interface Value<Type = string> {
    value: Type
}

export const emptyStringValue: Value = { value: "" }

export const isEmptyStringValue: (v: Value) => boolean = v => v === emptyStringValue

export const wrapValue: (v: any) => Value = v => ({
    value: v
})

export const unwrapValue: (value: Value) => string = value => value.value

export type SchemedValue = Schemed & Value

export const emptySchemedValue: SchemedValue = { scheme: "", value: "" }

export const schemedValueConverter: (scheme: any, value: any) => SchemedValue = (scheme, value) => ({
    scheme: scheme,
    value: value,
})

export const schemedValueDeconverter: (sv: SchemedValue) => any = sv => clean({
    scheme: sv.scheme,
    value: sv.value,
})

export type QualifiedSchemedValue = Qualifier & Schemed & Value

export const emptyQualifiedSchemedValue: QualifiedSchemedValue = { qualifier: "", scheme: "", value: "" }

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
