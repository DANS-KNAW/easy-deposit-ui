import * as React from "react"
import { connect } from "react-redux"
import { Redirect, Route, RouteProps } from "react-router"
import { AppState } from "../model/AppState"

interface PrivateRouteProps {
    isAuthenticated: boolean
    redirectTo: string
}

// inspired by https://www.youtube.com/watch?v=ojYbcon588A
const PrivateRoute = ({ isAuthenticated, redirectTo, component: Comp, ...rest }: PrivateRouteProps & RouteProps) => (
    <Route {...rest} render={({ ...props }) =>
        isAuthenticated
            ? Comp ? <Comp {...props}/> : "Error: no component defined"
            : <Redirect to={{
                pathname: redirectTo,
                state: { from: props.location },
            }}/>
    }/>
)

const mapStateToProps = (state: AppState) => ({
    isAuthenticated: state.user.isAuthenticated,
})

export default connect(mapStateToProps)(PrivateRoute)
