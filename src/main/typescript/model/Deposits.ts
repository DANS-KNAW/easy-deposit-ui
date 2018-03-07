export enum DepositState {
    DRAFT = "DRAFT",
    REJECTED = "REJECTED",
    IN_PROGRESS = "IN_PROGRESS",
    ARCHIVED = "ARCHIVED",
}

export interface Deposit {
    id: string
    title: string
    state: DepositState
    state_description: string
    date: Date
}

export interface Deposits {
    loading: boolean
    loaded: boolean
    deposits: Deposit[]
    error?: string
}

export const empty: Deposits = {
    loading: false,
    loaded: false,
    deposits: [],
}
