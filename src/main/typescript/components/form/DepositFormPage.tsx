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
import { useEffect } from "react"
import DepositForm from "./DepositForm"
import { useDispatch } from "react-redux"
import { unregisterForm } from "../../actions/depositFormActions"
import { cleanFiles } from "../../actions/fileOverviewActions"
import { DepositId } from "../../model/Deposits"
import { RouteComponentProps, withRouter } from "react-router"
import DepositStateLoader from "./DepositStateLoader"

interface RouterParams {
    depositId: DepositId // name is declared in client.tsx, in the path to the 'DepositFormPage'
}

type DepositFormPageProps = RouteComponentProps<RouterParams>

const DepositFormPage = (props: DepositFormPageProps) => {
    const { depositId } = props.match.params

    const dispatch = useDispatch()
    useEffect(() => {
        return function cleanup() {
            dispatch(unregisterForm())
            dispatch(cleanFiles())
        }
    })

    return <>
        <h1>Deposit your data</h1>
        <p>
            Read the instructions
            (<a href="https://dans.knaw.nl/en/deposit/information-about-depositing-data"
                target="_blank"
                className="text-primary">English</a>)
            (<a href="https://dans.knaw.nl/nl/deponeren/toelichting-data-deponeren"
                target="_blank"
                className="text-primary">Nederlands</a>)
        </p>
        <DepositStateLoader depositId={depositId}
                            renderForm={depositState => {
                                // TODO provide the depositState to the DepositForm (types don't align yet)
                                return <DepositForm/>
                            }}
                            renderSubmitted={depositState => {
                                // TODO render a Component that displays an alternative message
                                return <p>deposit {depositId} was already submitted</p>
                            }}
                            renderNotFound={() => {
                                // TODO render a Component that displays the error message
                                return <p>deposit {depositId} was not found</p>
                            }}
        />
    </>
}

export default withRouter(DepositFormPage)
