// TODO define enums for these scheme values
interface Schemed<Scheme = string> {
    scheme: Scheme
}

export interface SchemedValue extends Schemed {
    value: string
}

export interface SchemedDate extends Schemed {
    value: Date
}

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
