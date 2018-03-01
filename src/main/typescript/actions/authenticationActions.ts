import { AuthenticationConstants } from "../constants/authenticationConstants"
import { Action } from "redux"
import { ReduxAction } from "../lib/redux"

export const authenticate: () => ReduxAction<Promise<void>> = () => ({
    type: AuthenticationConstants.AUTH_LOGIN,
    // temporary do a fake timeout to simulate server I/O
    payload: new Promise(vs => setTimeout(vs, 1000))
})

export const signout: () => Action = () => ({
    type: AuthenticationConstants.AUTH_LOGOUT,
})
