import * as React from "react"
import { Route, Switch } from "react-router"
import HomePage from "./components/home/HomePage"
import PrivateRoute from "./components/PrivateRoute"
import LoginPage from "./components/login/LoginPage"
import DepositFormPage from "./components/form/DepositFormPage"
import DepositOverviewPage from "./components/overview/DepositOverviewPage"
import NotFoundPage from "./components/NotFoundPage"
import { depositFormRoute, depositOverviewRoute, homeRoute, loginRoute } from "./constants/clientRoutes"

const Routes = () => (
    <Switch>
        <Route path={homeRoute}
               component={HomePage}
               exact/>
        <Route path={loginRoute}
               component={LoginPage}
               exact/>
        <PrivateRoute
            path={depositFormRoute(":depositId")} // this name matches the property in DepositFormPage.tsx/RouterParams
            redirectTo={loginRoute}
            component={DepositFormPage}/>
        <PrivateRoute path={depositOverviewRoute}
                      redirectTo={loginRoute}
                      component={DepositOverviewPage}
                      exact/>
        <Route component={NotFoundPage}/>
    </Switch>
)

export default Routes
