import { combineReducers, Reducer } from "redux"
import { Configuration } from "../model/Configuration"
import { ConfigurationConstants } from "../constants/configurationConstants"
import FetchState, { empty as emptyFetchState } from "../model/FetchState"

const fetchStateReducer: Reducer<FetchState> = (state = emptyFetchState, action) => {
    switch (action.type) {
        case ConfigurationConstants.CONFIGURATION_LOADING_PENDING:
            return { fetching: true, fetched: false, fetchError: undefined }
        case ConfigurationConstants.CONFIGURATION_LOADING_SUCCESS:
            return { fetching: false, fetched: true, fetchError: undefined }
        case ConfigurationConstants.CONFIGURATION_LOADING_REJECTED:
            return { fetching: false, fetched: false, fetchError: action.payload.error }
        default:
            return state
    }
}

const configurationReducer: Reducer<Configuration> = (state = {}, action) => {
    switch (action.type) {
        case ConfigurationConstants.CONFIGURATION_LOADING_SUCCESS:
            return action.payload
        default:
            return state
    }
}

export default combineReducers({
    fetchState: fetchStateReducer,
    configuration: configurationReducer,
})
