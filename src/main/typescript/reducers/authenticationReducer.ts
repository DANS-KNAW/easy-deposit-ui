import { UserDetails, empty } from "../model/UserDetails"
import { Reducer } from "redux"
import { AuthenticationConstants } from "../constants/authenticationConstants"

export const authenticationReducer: Reducer<UserDetails> = (state = empty, action) => {
    switch (action.type) {
        // TODO handle pending and rejected variants here as well!
        case AuthenticationConstants.AUTH_LOGIN_FULFILLED: {
            return { ...state, isAuthenticated: true }
        }
        case AuthenticationConstants.AUTH_LOGOUT: {
            return { ...state, isAuthenticated: false }
        }
        default:
            return state
    }
}
