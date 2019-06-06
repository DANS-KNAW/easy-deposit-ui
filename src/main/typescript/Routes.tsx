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
import { Route, Switch } from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute"
import DepositFormPage from "./components/form/DepositFormPage"
import DepositOverviewPage from "./components/overview/DepositOverviewPage"
import NotFoundPage from "./components/NotFoundPage"
import { depositFormRoute, depositOverviewRoute, homeRoute, loginRoute } from "./constants/clientRoutes"
import { easyHome } from "./lib/config"

const Routes = () => (
    <Switch>
        <Route path={homeRoute}
               exact
               render={() => {
                   window.location.replace(easyHome)
                   return null
               }}/>
        <PrivateRoute
            path={depositFormRoute(":depositId")} // this name matches the property in DepositFormPage.tsx/RouterParams
            redirectTo={loginRoute}
            component={DepositFormPage}/>
        <PrivateRoute path={depositOverviewRoute}
                      exact
                      redirectTo={loginRoute}
                      component={DepositOverviewPage}/>
        <Route component={NotFoundPage}/>
    </Switch>
)

export default Routes
