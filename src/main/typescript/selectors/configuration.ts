import { AppState } from "../model/AppState"

export const getConfigurationFetchState = (state: AppState) => state.configuration.fetchState

export const getApiUrl = (state: AppState) => state.configuration.configuration.apiUrl
