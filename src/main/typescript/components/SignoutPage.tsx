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
import { useEffect } from "react"
import { connect } from "react-redux"
import { Redirect, RouteComponentProps } from "react-router"
import { signout } from "../actions/authenticationActions"
import { homeRoute } from "../constants/clientRoutes"
import { PromiseAction } from "../lib/redux"
import { AppState } from "../model/AppState"

interface SignoutPageProps extends RouteComponentProps {
    isLoggedIn: boolean

    signout: () => PromiseAction<void>
}

const SignoutPage = ({ isLoggedIn, signout, location }: SignoutPageProps) => {
    useEffect(() => {
        isLoggedIn && signout()
    }, [])

    return isLoggedIn
        ? <p>still logged in</p>
        : <Redirect to={{
            pathname: homeRoute,
            state: { from: location },
        }}/>
}

const mapStateToProps = (state: AppState) => ({
    isLoggedIn: state.authenticatedUser.isAuthenticated,
})

export default connect(mapStateToProps, { signout })(SignoutPage)
