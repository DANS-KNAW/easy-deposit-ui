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
import DepositForm from "./DepositForm"
import { ReduxAction } from "../../lib/redux"
import { connect } from "react-redux"
import { registerForm, unregisterForm } from "../../actions/depositFormActions"
import { Action } from "redux"
import { cleanFiles } from "../../actions/fileOverviewActions"

interface RouterParams {
    depositId: DepositId // name is declared in client.tsx, in the path to the 'DepositFormPage'
}

interface MyDepositFormPageProps {
    registerForm: (depositId: DepositId) => ReduxAction<DepositId>
    unregisterForm: () => Action
    cleanFiles: () => Action
}

type DepositFormPageProps = MyDepositFormPageProps & RouteComponentProps<RouterParams>

class DepositFormPage extends Component<DepositFormPageProps> {
    constructor(props: DepositFormPageProps) {
        super(props)
        this.props.registerForm(this.props.match.params.depositId)
    }

    componentWillUnmount() {
        this.props.unregisterForm()
        this.props.cleanFiles()
    }

    render() {
        return (
            <>
                <h1>Deposit your data</h1>
                <p>
                    Read the instructions
                    (<a href="https://dans.knaw.nl/en/deposit/information-about-depositing-data"
                        target="_blank"><u>English</u></a>)
                    (<a href="https://dans.knaw.nl/nl/deponeren/toelichting-data-deponeren"
                        target="_blank"><u>Nederlands</u></a>)
                </p>
                <DepositForm/>
            </>
        )
    }
}

export default connect(null, { registerForm, unregisterForm, cleanFiles })(DepositFormPage)
