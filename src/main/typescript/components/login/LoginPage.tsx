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
import { Redirect, RouteComponentProps } from "react-router"
import { compose } from "redux"
import { connect } from "react-redux"
import { InjectedFormProps, reduxForm, Field } from "redux-form"
import { ReduxAction } from "../../lib/redux"
import { authenticate } from "../../actions/authenticationActions"
import { AppState } from "../../model/AppState"
import { homeRoute } from "../../constants/clientRoutes"

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
    }

    callAuthenticate = (formValues: LoginPageData) => {
        this.props.authenticate(formValues.loginName, formValues.loginPassword)
    }

    render() {
        const { authenticated, errorMessage, location, handleSubmit } = this.props
        const { from } = location.state || { from: { pathname: homeRoute } }

        return authenticated
            ? <Redirect to={from}/>
            :
            <div className="row">
                <div className={"card pl-0 pr-0 col-4 offset-md-4"}>
                    <p className={"card-header ml-0 mr-0 bg-primary text-white"}>EASY account</p>
                    <form onSubmit={handleSubmit(this.callAuthenticate)} className={"card-body pl-0 pr-2 ml-0 mr-0"}>

                        <p className={"col-12"}>You must log in to view this page at {from.pathname}</p>
                        <div className={"mb-1"}>
                        <label className={"col-4"}>Username</label>
                        <Field className={"col-8"} name="loginName" type="text" component="input" required/>
                        </div>
                        <div>
                        <label className={"col-4"}>Password</label>
                        <Field className={"col-8"} type="password" name="loginPassword" component="input" required/>
                        </div>
                        <div className={"col-12"}>
                            <button className={"btn btn-primary"} type="submit"
                                    disabled={this.props.authenticating}>Login
                            </button>
                        </div>
                        {errorMessage && <span>{errorMessage.message}<br/></span>}
                    </form>
                </div>
            </div>
    }
}

const mapStateToProps = (state: AppState) => ({
    authenticated: state.authenticatedUser.isAuthenticated,
    authenticating: state.authenticatedUser.isAuthenticating,
    errorMessage: state.authenticatedUser.authenticationError,
})

const composedHOC = compose(
    connect(mapStateToProps, { authenticate }),
    reduxForm<LoginPageData>({ form: "login" }),
)

export default composedHOC(LoginPage)
