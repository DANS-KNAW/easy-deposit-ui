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
import * as React from "react"
import { FC, useEffect } from "react"
import { loginRoute } from "../constants/clientRoutes"
import { useSelector } from "../lib/redux"
import { shallowEqual, useDispatch } from "react-redux"
import { cookieAuthenticate } from "../actions/authenticationActions"
import Loading from "./Loading"

const CookieAuth: FC = ({ children }) => {
    const { isAuthenticating, isAuthenticated, authenticationError } = useSelector(state => state.authenticatedUser, shallowEqual)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(cookieAuthenticate())
    }, [])

    if (authenticationError) {
        window.location.replace(loginRoute)
        return <>{children}</>
    }
    else if (isAuthenticating || !isAuthenticated) // currently authenticating or authentication has not started
        return <div className="text-center"><Loading/></div>
    else
        return <>{children}</>
}

export default CookieAuth
