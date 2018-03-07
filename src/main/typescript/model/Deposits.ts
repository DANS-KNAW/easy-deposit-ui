export type DatasetId = string

export enum DepositState {
    DRAFT = "DRAFT",
    REJECTED = "REJECTED",
    IN_PROGRESS = "IN_PROGRESS",
    ARCHIVED = "ARCHIVED",
}

export interface Deposit {
    id: DatasetId
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

export interface DeleteState {
    deleting: boolean
    deleted: boolean
    deleteError?: string
}

export const emptyDelete: DeleteState = ({
    deleting: false,
    deleted: false
})

export interface Deposits {
    loading: LoadingState
    deleting: {[id: string]: DeleteState}
    deposits: Deposit[]
}

export const empty: Deposits = {
    loading: {
        loading: false,
        loaded: false
    },
    deleting: {},
    deposits: [],
}
