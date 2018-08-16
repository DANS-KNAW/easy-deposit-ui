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
import { PromiseAction, ThunkAction } from "../../lib/redux"
import { authenticate } from "../../actions/authenticationActions"
import { Field, InjectedFormProps, reduxForm } from "redux-form"
import { AppState } from "../../model/AppState"
import { compose } from "redux"
import { connect } from "react-redux"
import TextField from "../../lib/formComponents/TextField"
import LoginCard from "./LoginCard"

interface EasyLoginData {
    username: string
    password: string
}

interface EasyLoginProps {
    authenticating: boolean
    errorMessage?: string

    authenticate: (username: string, password: string) => ThunkAction<PromiseAction<void>>
}

type AllEasyLoginProps = EasyLoginProps & InjectedFormProps<EasyLoginData>

class EasyLogin extends Component<AllEasyLoginProps> {
    callAuthenticate = (formValues: EasyLoginData) => {
        this.props.authenticate(formValues.username, formValues.password)
    }

    render() {
        const {authenticating, errorMessage, handleSubmit} = this.props

        // TODO add form validation
        return (
            <LoginCard authenticating={authenticating}
                       errorMessage={errorMessage}
                       onSubmit={handleSubmit(this.callAuthenticate)}
                       header={() => <>EASY account</>}>
                <div className="container pl-0 pr-0 pb-0 ml-0 mr-0">
                    <div className="row ml-0 mr-0 mb-1 form-group">
                        <label htmlFor="username"
                               className="col-12 col-md-5 col-lg-4 col-form-label">Username</label>
                        <div className="col-12 col-md-7 col-lg-8">
                            <Field name="username"
                                   label="Username"
                                   id="username"
                                   autoFocus
                                   required
                                   component={TextField}/>
                        </div>
                    </div>
                    <div className="form-group row ml-0 mr-0 mb-0">
                        <label htmlFor="password"
                               className="col-12 col-md-5 col-lg-4 col-form-label">Password</label>
                        <div className="col-12 col-md-7 col-lg-8">
                            <Field name="password"
                                   label="Password"
                                   id="password"
                                   type="password"
                                   required
                                   component={TextField}/>
                        </div>
                    </div>
                </div>
            </LoginCard>
        )
    }
}

const mapEasyLoginStateToProps = (state: AppState) => ({
    authenticating: state.authenticatedUser.isAuthenticating,
    errorMessage: state.authenticatedUser.authenticationError,
})

const composedEasyLoginHOC = compose(
    connect(mapEasyLoginStateToProps, { authenticate }),
    reduxForm<EasyLoginData>({ form: "easyLogin" }),
)

export default composedEasyLoginHOC(EasyLogin)
