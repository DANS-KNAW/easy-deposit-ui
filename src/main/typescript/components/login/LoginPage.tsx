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
import { authenticate } from "../../actions/userActions"
import { Redirect, RouteComponentProps } from "react-router"
import { AppState } from "../../model/AppState"
import { homeRoute } from "../../constants/clientRoutes"
import { Field, InjectedFormProps, reduxForm } from "redux-form"
import { RenderInput } from "../../lib/formElements"

interface LoginPageProps {
    authenticate: (username: string, password: string) => ReduxAction<Promise<any>>
    authenticated: boolean
    errorMessage: Error
}

interface LoginPageState {
    loginName: string
    loginPassword: string
}

type AllDemoFormProps = LoginPageProps & RouteComponentProps<any> & InjectedFormProps<LoginPageState>
const isRequired = (errorText: string) => (value?: any) => value ? undefined : errorText
const required = isRequired("Required")

class LoginPage extends Component<AllDemoFormProps> {
    constructor(props: AllDemoFormProps) {
        super(props)
        this.state = {loginName: "", loginPassword: ""}
    }

    showResults = (values: LoginPageState) => {
        console.log(values);
        this.props.authenticate(values.loginName, values.loginPassword)
    }

    render() {
        const {authenticated, errorMessage, location, handleSubmit} = this.props
        const {from} = location.state || {from: {pathname: homeRoute}}

        return authenticated
            ? <Redirect to={from}/>
            : <form onSubmit={handleSubmit(this.showResults)}>
                <p>You must log in to view this page at {from.pathname}</p>
                <Field name="loginName"
                       label="Username"
                       type="text"
                       component={RenderInput}
                       required
                       validate={[required]}/>
                <Field name="loginPassword"
                       label="Password"
                       type="password"
                       component={RenderInput}
                       required
                       validate={[required]}/>
                {this.props.error && <span>{this.props.error}<br/></span>}

                <button type="submit" disabled={this.props.submitting}>Login</button>

                <div>{(errorMessage) ? errorMessage.message : ""}</div>
            </form>
    }
}

const mapStateToProps = (state: AppState) => ({
    authenticated: state.user.isAuthenticated,
    errorMessage: state.user.authenticationError,
})

const form = reduxForm<LoginPageState>({form: 'login'})(LoginPage)
export default connect<{}>(mapStateToProps, {authenticate})(form)
