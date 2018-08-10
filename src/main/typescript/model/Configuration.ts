export interface Configuration {
    apiUrl?: string
}

export interface ConfigurationState {
    fetchingConfig: boolean
    fetchedConfig: boolean
    fetchConfigError?: string
    configuration: Configuration
}

export const empty: ConfigurationState = {
    fetchingConfig: true,
    fetchedConfig: false,
    configuration: {}
}
