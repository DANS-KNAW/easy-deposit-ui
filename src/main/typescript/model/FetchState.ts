export default interface FetchState {
    fetching: boolean
    fetched: boolean
    fetchError?: string
}

export const empty: FetchState = {
    fetching: false,
    fetched: false,
    fetchError: undefined,
}
