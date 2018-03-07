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

export interface LoadingState {
    loading: boolean
    loaded: boolean
    loadingError?: string
}

export interface Deposits {
    loading: LoadingState
    deposits: Deposit[]
}

export const empty: Deposits = {
    loading: {
        loading: false,
        loaded: false
    },
    deposits: [],
}
