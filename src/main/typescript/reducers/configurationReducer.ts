import { Reducer } from "redux"
import { ConfigurationState, empty } from "../model/Configuration"

export const configurationReducer: Reducer<ConfigurationState> = (state = empty, action) => {
    switch (action) {
        default:
            return state
    }
}
