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
import { Link } from "react-router-dom"
import { depositOverviewRoute } from "../../constants/clientRoutes"

const HomePage = () => (
    <>
        <h1>Home Page</h1>
        <Link className="btn btn-dark margin-top-bottom" to={depositOverviewRoute}>Deposit your data</Link>
    </>
)

export default HomePage
