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
import { FC, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { cookieAuthenticate } from "./actions/authenticationActions"
import { loginRoute } from "./constants/clientRoutes"
import { useSelector } from "./lib/redux"

const CookieAuth: FC = ({ children }) => {
    const hasTriedCookieAuthenticate = useRef(false)
    const isAuthenticated = useSelector(state => state.authenticatedUser.isAuthenticated)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isAuthenticated) {
            dispatch(cookieAuthenticate())
            hasTriedCookieAuthenticate.current = true
        }
    }, [])

    if (hasTriedCookieAuthenticate) {
        if (isAuthenticated) return <>{children}</>
        else {
            window.location.replace(loginRoute)
            return null
        }
    }
    else return <p>need to try to authenticate</p>
}

export default CookieAuth
