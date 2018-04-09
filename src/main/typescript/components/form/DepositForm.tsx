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
import Card from "./FoldableCard"
import "../../../resources/css/depositForm"
import { InjectedFormProps, reduxForm } from "redux-form"
import {
    ArchaeologySpecificMetadata,
    BasicInformation,
    Data,
    DepositFormData,
    DepositLicense,
    LanguageAndLiteratureSpecificMetadata,
    LicenseAndAccess,
    MessageForDataManager,
    PrivacySensitiveData,
    TemporalAndSpatialCoverage,
    UploadType,
} from "./parts"
import { DepositId } from "../../model/Deposits"
import { Dispatch } from "../../lib/redux"
import { saveDraft, submitDeposit } from "../../actions/depositFormActions"

interface DepositFormInputArguments {
    depositId: DepositId
}

type DepositFormProps =
    DepositFormInputArguments
    & InjectedFormProps<DepositFormData, DepositFormInputArguments>

class DepositForm extends Component<DepositFormProps> {
    save = async (data: DepositFormData, dispatch: Dispatch, props: DepositFormInputArguments) => {
        const { depositId } = props
        alert(`saving draft for ${depositId}:\n\n${JSON.stringify(data, null, 2)}`)

        dispatch(saveDraft(depositId, data))
    }

    submit = async (data: DepositFormData, dispatch: Dispatch, props: DepositFormInputArguments) => {
        const { depositId } = props
        alert(`submitting deposit for ${depositId}`)

        dispatch(submitDeposit(depositId, data))
    }

    render() {
        console.log(this.props)

        const { depositId } = this.props
        console.log("depositId", depositId)

        return (
            <form>
                <Card title="Upload your data" defaultOpened>
                    <Data/>
                </Card>

                <Card title="Basic information" required defaultOpened>
                    <BasicInformation/>
                </Card>

                <Card title="License and access" required defaultOpened>
                    <LicenseAndAccess/>
                </Card>

                <Card title="Upload type">
                    <UploadType/>
                </Card>

                <Card title="Archaeology specific metadata">
                    <ArchaeologySpecificMetadata/>
                </Card>

                <Card title="Language & literature specific metadata">
                    <LanguageAndLiteratureSpecificMetadata/>
                </Card>

                <Card title="Temporal and spatial coverage">
                    <TemporalAndSpatialCoverage/>
                </Card>

                <Card title="Message for the data manager">
                    <MessageForDataManager/>
                </Card>

                <Card title="Privacy sensitive data" required defaultOpened>
                    <PrivacySensitiveData/>
                </Card>

                <Card title="Deposit license" required defaultOpened>
                    <DepositLicense/>
                </Card>

                <div className="buttons">
                    <button type="button" className="btn btn-primary mb-0"
                            onClick={this.props.handleSubmit(this.save)}>Save draft
                    </button>
                    <button type="button" className="btn btn-primary mb-0"
                            onClick={this.props.handleSubmit(this.submit)}>Submit deposit
                    </button>
                </div>
            </form>
        )
    }
}

const depositForm = reduxForm<DepositFormData, DepositFormInputArguments>({ form: "depositForm" })(DepositForm)

export default depositForm
