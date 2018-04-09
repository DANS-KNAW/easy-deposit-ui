interface Schemed {
    scheme: string
}

export interface SchemedValue extends Schemed {
    value: string
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

export interface Relation {
    qualifier: string
    url: string
    title: string
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
