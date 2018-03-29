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
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import store from "./store"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Header from "./components/Header"
import HomePage from "./components/home/HomePage"
import LoginPage from "./components/login/LoginPage"
import DepositFormPage from "./components/form/DepositFormPage"
import DepositOverviewPage from "./components/overview/DepositOverviewPage"
import PrivateRoute from "./components/PrivateRoute"
import NotFoundPage from "./components/NotFoundPage"
import Footer from "./components/Footer"

import "../resources/css/styling"

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <>
                <Header/>
                <main role="main" className="container">
                    <Switch>
                        <Route path="/"
                               component={HomePage}
                               exact/>
                        <Route path="/login"
                               component={LoginPage}
                               exact/>
                        <PrivateRoute path="/deposit-form/:depositId" // this name matches the property in DepositFormPage.txt/RouterParams
                                      redirectTo="/login"
                                      component={DepositFormPage}/>
                        <PrivateRoute path="/deposit-overview"
                                      redirectTo="/login"
                                      component={DepositOverviewPage}
                                      exact/>
                        <Route component={NotFoundPage}/>
                    </Switch>
                </main>
                <Footer/>
            </>
        </BrowserRouter>
    </Provider>,
    document.getElementById("app"),
)
