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
import { Component } from "react"
import { DepositId } from "../../model/Deposits"
import { RouteComponentProps } from "react-router"

interface RouterParams {
    depositId: DepositId // name is declared in client.tsx, in the path to the 'DepositFormPage'
}

interface MyDepositFormPageProps {

}

type DepositFormPageProps = MyDepositFormPageProps & RouteComponentProps<RouterParams>

class DepositFormPage extends Component<DepositFormPageProps> {
    constructor(props: DepositFormPageProps) {
        super(props)
    }

    render() {
        const { depositId } = this.props.match.params

        return (
            <>
                <h1>Deposit Form Page</h1>
                <p>deposit form filled with the data of {depositId}</p>
            </>
        )
    }
}

export default DepositFormPage
