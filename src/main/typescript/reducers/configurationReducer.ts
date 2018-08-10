import { Reducer } from "redux"
import { ConfigurationState, empty } from "../model/Configuration"
import { ConfigurationConstants } from "../constants/configurationConstants"

export const configurationReducer: Reducer<ConfigurationState> = (state = empty, action) => {
    switch (action.type) {
        case ConfigurationConstants.CONFIGURATION_LOADING_PENDING:
            return { ...state, fetchingConfig: true, fetchedConfig: false, fetchConfigError: undefined }
        case ConfigurationConstants.CONFIGURATION_LOADING_SUCCESS:
            return {
                configuration: action.payload,
                fetchingConfig: false,
                fetchedConfig: true,
                fetchConfigError: undefined,
            }
        case ConfigurationConstants.CONFIGURATION_LOADING_REJECTED:
            return { ...state, fetchingConfig: false, fetchedConfig: false, fetchConfigError: action.payload.error }
        default:
            return state
    }
}
