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
import { InjectedFormProps, reduxForm } from "redux-form"

interface LoginPageProps {
    authenticate: (username: string, password: string) => ReduxAction<Promise<any>>
    authenticated: boolean
    authenticating: boolean
    errorMessage: Error
}

interface LoginPageData {
    loginName: string
    loginPassword: string
}

type AllDemoFormProps = LoginPageProps & RouteComponentProps<any> & InjectedFormProps<LoginPageData>

class LoginPage extends Component<AllDemoFormProps> {
    constructor(props: AllDemoFormProps) {
        super(props)
        this.state = {loginName: "", loginPassword: ""}
    }

    callAuthenticate = (formValues: LoginPageData) => {
        this.props.authenticate(formValues.loginName, formValues.loginPassword)
    }

    render() {
        const {authenticated, errorMessage, location, handleSubmit} = this.props
        const {from} = location.state || {from: {pathname: homeRoute}}

        return authenticated
            ? <Redirect to={from}/>
            : <form onSubmit={handleSubmit(this.callAuthenticate)}>
                <p>You must log in to view this page at {from.pathname}</p>
                <label>Username</label>
                <input type="text" name="loginName" required/>
                <br/>
                <label>Password</label>
                <input type="password" name="loginPassword" required/>
                <br/>

                <button type="submit" disabled={this.props.authenticating}>Login</button>
                {errorMessage  && <span>{errorMessage.message}<br/></span>}
            </form>
    }
}

const mapStateToProps = (state: AppState) => ({
    authenticated: state.authenticatedUser.isAuthenticated,
    authenticating: state.authenticatedUser.isAuthenticating,
    errorMessage: state.authenticatedUser.authenticationError,
})

const form = reduxForm<LoginPageData>({form: 'login'})(LoginPage)
export default connect<{}>(mapStateToProps, {authenticate})(form)
