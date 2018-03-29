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
import { Component } from "react"
import { ReduxAction } from "../../lib/redux"
import { connect } from "react-redux"
import { authenticate } from "../../actions/authenticationActions"
import { Redirect, RouteComponentProps } from "react-router"
import { AppState } from "../../model/AppState"
import { homeRoute } from "../../constants/clientRoutes"

interface LoginPageProps {
    authenticate: () => ReduxAction<Promise<void>>
    authenticated: boolean
}

class LoginPage extends Component<LoginPageProps & RouteComponentProps<any>> {
    constructor(props: LoginPageProps & RouteComponentProps<any>) {
        super(props)
    }

    login = () => this.props.authenticate()

    render() {
        const { authenticated, location } = this.props
        const { from } = location.state || { from: { pathname: homeRoute } }

        return authenticated === true
            ? <Redirect to={from}/>
            : <div>
                <p>You must log in to view this page at {from.pathname}</p>
                <button onClick={this.login}>Log in</button>
            </div>
    }
}

const mapStateToProps = (state: AppState) => ({
    authenticated: state.user.isAuthenticated,
})

export default connect(mapStateToProps, { authenticate })(LoginPage)
