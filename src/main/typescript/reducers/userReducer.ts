
import {UserConstants} from "../constants/userConstants";
import { UserDetails, empty } from "../model/UserDetails"
import { Reducer } from "redux"
import { AuthenticationConstants } from "../constants/authenticationConstants"

export const userReducer: Reducer<UserDetails> = (state = empty, action) => {
    switch (action.type) {
        case UserConstants.USER_SUCCESS: {
            return {...state, userName: action.payload.userName}
        }
        case UserConstants.USER_FAILED: {
            return {...state, isAuthenticated: false}
        }
        case UserConstants.USER_PENDING: {
            return {...state, userName: "loading ..."}
        }
        case AuthenticationConstants.AUTH_LOGIN_FULFILLED: {
            return { ...state, isAuthenticated: true }
        }
        case AuthenticationConstants.AUTH_LOGIN_REJECTED: {
            return { ...state, isAuthenticated: false, authenticationError: action.payload }
        }
        case AuthenticationConstants.AUTH_LOGIN_FAILED: {
            return { ...state, isAuthenticated: false, authenticationError: action.payload }
        }
        case AuthenticationConstants.AUTH_LOGOUT: {
            return { ...state, isAuthenticated: false, userName: "" }
        }
        default:
            return state
    }
}