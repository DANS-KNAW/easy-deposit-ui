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
import { Component, ComponentType } from "react"
import * as H from "history"
import { RouteComponentProps, withRouter } from "react-router"
import { ComplexThunkAction } from "../../lib/redux"
import { authenticate } from "../../actions/authenticationActions"
import { Field, InjectedFormProps, reduxForm } from "redux-form"
import { AppState } from "../../model/AppState"
import { compose } from "redux"
import { connect } from "react-redux"
import TextField from "../../lib/formComponents/TextField"
import LoginCard from "./LoginCard"
import { formValidate } from "./Validation"
import { EasyLoginData } from "./index"
import { loginFormName } from "../../constants/authenticationConstants"
import { FieldProps } from "../../lib/formComponents/ReduxFormUtils"

const asField = (InnerComponent: ComponentType<any>) => (props: FieldProps) => {
    const { label, input: { name }, meta: { error, submitFailed } } = props
    const hasError = error && submitFailed

    return (
        <div className="row ml-0 mr-0 mb-1 form-group">
            <label htmlFor={name}
                   className="col-12 col-md-4 col-lg-3 col-form-label">{label}</label>
            <div className="col-12 col-md-8 col-lg-9">
                <InnerComponent className={hasError ? "is-invalid" : ""} id={name} {...props} />
                {hasError && <span className="invalid-feedback">{error}</span>}
            </div>
        </div>
    )
}

const LoginTextField = asField(TextField)

interface EasyLoginProps {
    authenticating: boolean
    errorMessage?: string

    authenticate: (location: H.Location, username: string, password: string) => ComplexThunkAction
}

type AllEasyLoginProps = EasyLoginProps & InjectedFormProps<EasyLoginData> & RouteComponentProps<{}>

class EasyLogin extends Component<AllEasyLoginProps> {
    callAuthenticate = (formValues: EasyLoginData) => {
        this.props.authenticate(this.props.location, formValues.username, formValues.password)
    }

    render() {
        const { authenticating, errorMessage, handleSubmit } = this.props

        return (
            <LoginCard headerName="EASY account">
                <form>
                    <Field name="username"
                           label="Username"
                           autoFocus
                           required
                           component={LoginTextField}/>

                    <Field name="password"
                           label="Password"
                           type="password"
                           required
                           component={LoginTextField}/>

                    {errorMessage && <span>{errorMessage}<br/></span>}

                    <button type="button"
                            className="btn btn-dark ml-3 margin-top-bottom"
                            onClick={handleSubmit(this.callAuthenticate)}
                            disabled={authenticating}>
                        Login
                    </button>
                </form>
            </LoginCard>
        )
    }
}

const mapEasyLoginStateToProps = (state: AppState) => ({
    authenticating: state.authenticatedUser.isAuthenticating,
    errorMessage: state.authenticatedUser.authenticationError,
})

const composedEasyLoginHOC = compose(
    withRouter,
    connect(mapEasyLoginStateToProps, { authenticate }),
    reduxForm<EasyLoginData>({
        form: loginFormName,
        validate: formValidate,
    }),
)

export default composedEasyLoginHOC(EasyLogin)
