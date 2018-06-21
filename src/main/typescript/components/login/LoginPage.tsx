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
import { Redirect, RouteComponentProps } from "react-router"
import { AppState } from "../../model/AppState"
import { homeRoute } from "../../constants/clientRoutes"
import EasyLogin from "./EasyLogin"
import { connect } from "react-redux"
import "../../../resources/css/login"

interface LoginPageProps {
    authenticated: boolean
}

type AllDemoFormProps = LoginPageProps & RouteComponentProps<any>

const LoginPage = ({ authenticated, location }: AllDemoFormProps) => {
    const { from } = location.state || { from: { pathname: homeRoute } }

    return authenticated
        ? <Redirect to={from}/>
        : <div className="container">
            <div className="row justify-content-around">
                <EasyLogin/>

                {/* TODO other kinds of login forms here*/}
            </div>
        </div>
}

const mapStateToProps = (state: AppState) => ({
    authenticated: state.authenticatedUser.isAuthenticated,
})

export default connect(mapStateToProps)(LoginPage)
