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
import {Component, FormEvent} from "react"
import {ReduxAction} from "../../lib/redux"
import {connect} from "react-redux"
import {authenticate} from "../../actions/userActions"
import {Redirect, RouteComponentProps} from "react-router"
import {AppState} from "../../model/AppState"

interface LoginPageProps {
    authenticate: (username: string, password: string) => ReduxAction<Promise<any>>
    authenticated: boolean
    errorMessage: Error
}

interface LoginPageState {
    loginName: string
    loginPassword: string
}

class LoginPage extends Component<LoginPageProps & RouteComponentProps<any>, LoginPageState> {
    constructor(props: LoginPageProps & RouteComponentProps<any>) {
        super(props)
        this.state = {loginName: "", loginPassword: ""}
    }

    handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        this.props.authenticate(this.state.loginName, this.state.loginPassword)
    }


    render() {
        const {authenticated, errorMessage, location} = this.props
        const {from} = location.state || {from: {pathname: "/"}}

        return authenticated === true
            ? <Redirect to={from}/>
            : <form onSubmit={this.handleSubmit}>
                <p>You must log in to view this page at {from.pathname}</p>
                <label>Username</label>
                <input type="text" name="username" onChange={e => this.setState({loginName: e.currentTarget.value})}
                       value={this.state.loginName}/><br/>
                <label>Password</label>
                <input type="password" name="password"
                       onChange={e => this.setState({loginPassword: e.currentTarget.value})}
                       value={this.state.loginPassword}/>
                <input type="submit" value="Login"/>
                <div>{(errorMessage) ? errorMessage.message : ""}</div>
            </form>
    }
}

const mapStateToProps = (state: AppState) => ({
    authenticated: state.user.isAuthenticated,
    errorMessage: state.user.authenticationError,
})

export default connect(mapStateToProps, {authenticate})(LoginPage)
