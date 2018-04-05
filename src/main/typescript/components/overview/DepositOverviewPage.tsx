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
import DepositOverview from "./DepositOverview"
import { RouteComponentProps } from "react-router"
import NewDepositButton from "./NewDepositButton"
import "../../../resources/css/depositOverviewPage"

type DepositOverviewPageProps = RouteComponentProps<any>

const DepositOverviewPage = ({ history }: DepositOverviewPageProps) => (
    <>
        <h1>Deposit Overview Page</h1>
        <NewDepositButton history={history}>New deposit</NewDepositButton>
        <DepositOverview/>
    </>
)

export default DepositOverviewPage
