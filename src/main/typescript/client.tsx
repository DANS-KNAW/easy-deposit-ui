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
import createHistory from "history/createBrowserHistory"
import { newStore } from "./store"
import { ConnectedRouter } from "react-router-redux"

import Header from "./components/Header"
import Routes from "./Routes"
import Footer from "./components/Footer"

import "../resources/css/styling"

const history = createHistory()

const Main = () => (
    <Provider store={newStore(history)}>
        <ConnectedRouter history={history}>
            <>
                <Header/>
                <main role="main" className="container">
                    <Routes/>
                </main>
                <Footer/>
            </>
        </ConnectedRouter>
    </Provider>
)

ReactDOM.render(<Main/>, document.getElementById("app"))
