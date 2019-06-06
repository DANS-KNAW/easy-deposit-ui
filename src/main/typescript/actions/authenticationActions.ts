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
import { userUrl } from "../selectors/serverRoutes"
import { UserConstants } from "../constants/userConstants"
import { userConverter } from "../lib/user/user"
import fetch from "../lib/fetch"
import LocalStorage from "../lib/LocalStorage"

const authenticateFulfilled = ({
    type: AuthenticationConstants.AUTH_LOGIN_FULFILLED,
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

export const cookieAuthenticate: () => ComplexThunkAction = () => async (dispatch, getState) => {
    /*
     *   dispatch fetchUserOnLogin
     *   - failure:
     *       local storage --> remove 'logged-in'
     *       dispatch AUTH_LOGIN_REJECTED
     */
    try {
        dispatch(fetchUserOnLogin())
    }
    catch (loginResponse) {
        LocalStorage.setLogout()
    }
}

const fetchUserOnLogin: () => ComplexThunkAction = () => async (dispatch, getState) => {
    /*
     * dispatch FETCH_USER_PENDING
     * call server with 'user'
     *   - success:
     *       dispatch FETCH_USER_FULFILLED
     *       dispatch AUTH_LOGIN_FULFILLED
     *       local storage --> set 'logged-in: true'
     *   - failure:
     *       local storage --> remove 'logged-in'
     *       dispatch AUTH_LOGIN_REJECTED
     */
    dispatch(userPending)

    try {
        const userResponse = await fetch.get(userUrl(getState()))

        dispatch(userFulfilled(userResponse.data))
        dispatch(authenticateFulfilled)

        LocalStorage.setLogin()
    }
    catch (userResponse) {
        LocalStorage.setLogout()
    }
}

export const getUser: () => ComplexThunkAction = () => async (dispatch, getState) => {
    /*
     * this action is called when localStorage says the user is logged in
     * if that is the case, we fetch the user data
     * else if the user isn't logged in (a.k.a. cookie isn't present or is expired)
     *     we correct the state to let the user login again
     *
     * dispatch FETCH_USER_PENDING
     * call server with 'user'
     *   - success:
     *       dispatch FETCH_USER_FULFILLED
     *   - failure:
     *       local storage --> remove 'logged-in'
     */

    dispatch(userPending)

    try {
        const response = await fetch.get(userUrl(getState()))
        dispatch(userFulfilled(response.data))
    }
    catch (response) {
        LocalStorage.setLogout()
    }
}
