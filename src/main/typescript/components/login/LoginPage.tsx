import * as React from "react"
import { Component } from "react"
import { ReduxAction } from "../../lib/redux"
import { connect } from "react-redux"
import { authenticate } from "../../actions/authenticationActions"
import { Redirect, RouteComponentProps } from "react-router"
import { AppState } from "../../model/AppState"

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
        const { from } = location.state || { from: { pathname: "/" } }

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
