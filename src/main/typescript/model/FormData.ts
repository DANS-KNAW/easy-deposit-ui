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
export interface Value<Type = string> {
    value: Type
}

export const emptyStringValue: Value = { value: "" }

// TODO define enums for these scheme values
interface Schemed<Scheme = string> {
    scheme: Scheme
}

export type SchemedValue = Schemed & Value
export type SchemedDate = Schemed & Value<Date>

export interface CreatorOrContributor {
    titles?: string
    initials: string
    insertions?: string
    surname: string
    ids?: SchemedValue[]
    role?: string
    organization?: string
}

// TODO are there optionals here?
export interface Relation {
    qualifier?: string
    url?: string
    title?: string
}

export interface AccessRight {
    category: AccessRightValue
    group?: string
}

export enum AccessRightValue {
    OPEN = "open",
    OPEN_FOR_REGISTERED_USERS = "open_for_registered_users",
    RESTRICTED_GROUP = "restricted_group",
    RESTRICTED_REQUEST = "restricted_request",
    OTHER_ACCESS = "other_access",
}

export function toAccessRight(value: string): AccessRightValue | undefined {
    return Object.values(AccessRightValue).find(v => v === value)
}

export interface Point extends Schemed {
    x: number
    y: number
}

export interface Box extends Schemed {
    north: number
    east: number
    south: number
    west: number
}

export enum PrivacySensitiveDataValue {
    YES = "yes",
    NO = "no",
    UNSPECIFIED = "unspecified"
}

export function toPrivacySensitiveData(value: string): PrivacySensitiveDataValue | undefined {
    return Object.values(PrivacySensitiveDataValue).find(v => v === value)
}
