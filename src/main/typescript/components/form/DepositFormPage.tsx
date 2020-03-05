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
import { DepositId } from "../../model/Deposits"
import { useParams } from "react-router"
import DepositResourceLoader from "./DepositResourceLoader"
import DepositNotFound from "./DepositNotFound"
import DepositHolder from "./DepositHolder"

interface RouterParams {
    depositId: DepositId // name is declared in client.tsx, in the path to the 'DepositFormPage'
}

const DepositFormPage = () => {
    const { depositId } = useParams<RouterParams>()

    return (
        <>
            <h1>Deposit your data</h1>
            <p>
                Read the instructions
                (<a href="https://dans.knaw.nl/en/about/services/easy/information-about-depositing-data"
                    target="_blank"
                    className="text-primary">English</a>)
                (<a href="https://dans.knaw.nl/nl/over/diensten/easy/toelichting-data-deponeren"
                    target="_blank"
                    className="text-primary">Nederlands</a>)
            </p>
            <DepositResourceLoader depositId={depositId}
                                   renderForm={depositState => <DepositHolder depositId={depositId}
                                                                              depositState={depositState}/>}
                                   renderNotFound={() => <DepositNotFound/>}
            />
        </>
    )
}

export default DepositFormPage
