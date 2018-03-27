// TODO signout also requires a server call...
import {ReduxAction} from "../lib/redux";
import {UserDetails} from "../model/UserDetails";
import {loginURL, userURL} from "../constants/apiConstants";
import {AuthenticationConstants} from "../constants/authenticationConstants"
import {UserConstants} from "../constants/userConstants"
import {Action} from "redux"
import axios from "axios";

export const authenticate: (userName: string, password: string) => ReduxAction<Promise<any>> = (userName, password) => ({
    type: AuthenticationConstants.AUTH_LOGIN,
    async payload() {
        await new Promise(vs => {
            setTimeout(vs, 1000)}
        )

        // TODO temporary do a timeout to simulate server I/O
        const authResponse = await axios({
            method: 'post',
            url: loginURL,
            auth: {
                username: userName,
                password: password
            }
        })
        return authResponse.data
    },
})

// TODO signout also requires a server call...
export const signout: () => Action = () => ({
    type: AuthenticationConstants.AUTH_LOGOUT,
})

export const getUser: () => ReduxAction<Promise<any>>  = () => ({
    type: UserConstants.USER,
    async payload() {
        console.log("in getUser")
        // TODO temporary do a fake timeout to simulate server I/O
        await new Promise(resolve => setTimeout(resolve, 1000))
        const response = await axios.get(userURL)
        console.log("responsedata: " +response.data);
        return response.data
    },
})

export const fetchUserFailed: (errorMessage: string) => ReduxAction<string> = errorMessage => ({
    type: UserConstants.USER_FAILED,
    payload: errorMessage
})

export const fetchUserSucceeded: (user: UserDetails) => ReduxAction<UserDetails> = user => ({
    type: UserConstants.USER_SUCCESS,
    payload: user
})