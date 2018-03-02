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
