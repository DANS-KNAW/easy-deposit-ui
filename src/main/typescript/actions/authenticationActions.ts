/*
 * Copyright (C) 2018 DANS - Data Archiving and Networked Services (info@dans.knaw.nl)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { ComplexThunkAction, PromiseAction, ThunkAction } from "../lib/redux"
import { AuthenticationConstants } from "../constants/authenticationConstants"
import axios from "axios"
import { loginUrl, logoutUrl, userUrl } from "../selectors/serverRoutes"
import { UserConstants } from "../constants/userConstants"
import { userConverter } from "../lib/user/user"
import LocalStorage from "../lib/LocalStorage"

const authenticatePending = ({
    type: AuthenticationConstants.AUTH_LOGIN_PENDING,
})

const authenticateFulfilled = ({
    type: AuthenticationConstants.AUTH_LOGIN_FULFILLED,
})

const authenticateRejected = (response: any) => ({
    type: AuthenticationConstants.AUTH_LOGIN_REJECTED,
    payload: response.response
        ? { response: response.response } // when received error code (401, etc.)
        : { message: response.message }, // when network error occurs (no internet?) or user data could not be fetched
})

const userPending = ({
    type: UserConstants.FETCH_USER_PENDING,
})

const userFulfilled = (data: any) => ({
    type: UserConstants.FETCH_USER_FULFILLED,
    payload: data,
    meta: {
        transform: userConverter,
    },
})

export const authenticate: (userName: string, password: string) => ComplexThunkAction = (userName, password) => async (dispatch, getState) => {
    /*
     * dispatch AUTH_LOGIN_PENDING
     * call server with 'auth/login'
     *   - success:
     *       dispatch FETCH_USER_PENDING
     *       call server with 'user'
     *         - success:
     *             dispatch FETCH_USER_FULFILLED
     *             dispatch AUTH_LOGIN_FULFILLED
     *             local storage --> set 'logged-in: true'
     *         - failure:
     *             local storage --> remove 'logged-in'
     *             dispatch AUTH_LOGIN_REJECTED
     *   - failure:
     *       local storage --> remove 'logged-in'
     *       dispatch AUTH_LOGIN_REJECTED
     */
    dispatch(authenticatePending)

    try {
        await axios.post(loginUrl(getState()), {}, {
            auth: {
                password: password,
                username: userName,
            },
        })

        dispatch(userPending)

        try {
            const userResponse = await axios.get(userUrl(getState()))

            dispatch(userFulfilled(userResponse.data))
            dispatch(authenticateFulfilled)

            LocalStorage.setLogin()
        }
        catch (userResponse) {
            LocalStorage.setLogout()

            dispatch(authenticateRejected({ message: `not able to fetch user details: ${userResponse.response.status} - ${userResponse.response.statusText}` }))
        }
    }
    catch (loginResponse) {
        LocalStorage.setLogout()

        dispatch(authenticateRejected(loginResponse))
    }
}

export const signout: () => ThunkAction<PromiseAction<void>> = () => (dispatch, getState) => dispatch({
    type: AuthenticationConstants.AUTH_LOGOUT,
    async payload() {
        await axios.post(logoutUrl(getState()))
        LocalStorage.setLogout()
    },
})

export const getUser: () => ComplexThunkAction = () => async (dispatch, getState) => {
    /*
     * this action is called when localStorage says the user is logged in
     * if that is the case, we fetch the user data
     * else if the user isn't logged in (a.k.a. cookie isn't present or is expired)
     *     we correct the state and let the user login again
     *
     * dispatch FETCH_USER_PENDING
     * call server with 'user'
     *   - success:
     *       dispatch FETCH_USER_FULFILLED
     *   - failure:
     *       local storage --> remove 'logged-in'
     *       dispatch signout()
     */

    dispatch(userPending)

    try {
        const response = await axios.get(userUrl(getState()))
        dispatch(userFulfilled(response.data))
    }
    catch (response) {
        LocalStorage.setLogout()

        dispatch(signout())
    }
}
