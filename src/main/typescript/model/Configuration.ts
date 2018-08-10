export interface Configuration {
    apiUrl?: string
}

export interface ConfigurationState {
    fetchingConfig: boolean
    fetchedConfig: boolean
    fetchConfigError?: string
    config: Configuration
}

export const empty: ConfigurationState = {
    fetchingConfig: true,
    fetchedConfig: false,
    config: {}
}
