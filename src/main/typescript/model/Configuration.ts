import FetchState, { empty as emptyFetchState } from "./FetchState"

export interface Configuration {
    apiUrl?: string
}

export interface ConfigurationState {
    fetchState: FetchState
    configuration: Configuration
}

export const empty: ConfigurationState = {
    fetchState: emptyFetchState,
    configuration: {},
}
