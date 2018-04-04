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
import DepositLicenseForm from "./DepositLicenseForm"
import PrivacySensitiveDataForm from "./PrivacySensitiveDataForm"
import MessageForDataManagerForm from "./MessageForDataManagerForm"
import TemporalAndSpatialCoverageForm from "./TemporalAndSpatialCoverageForm"
import LanguageAndLiteratureSpecificMetadataForm from "./LanguageAndLiteratureSpecificMetadataForm"
import ArchaeologySpecificMetadataForm from "./ArchaeologySpecificMetadataForm"
import UploadTypeForm from "./UploadTypeForm"
import LicenseAndAccessForm from "./LicenseAndAccessForm"
import BasicInformationForm from "./BasicInformationForm"
import DataForm from "./DataForm"
import "../../../resources/css/depositForm"

interface DepositFormProps {
    depositId: string
}

class DepositForm extends Component<DepositFormProps> {
    save = async () => {
        alert("saving draft")
    }

    submit = async () => {
        await this.save()
        alert("submitting deposit")
    }

    render() {
        return (
            <>
                <Card title="Upload your data" defaultOpened>
                    <DataForm/>
                </Card>

                <Card title="Basic information" required defaultOpened>
                    <BasicInformationForm/>
                </Card>

                <Card title="License and access" required defaultOpened>
                    <LicenseAndAccessForm/>
                </Card>

                <Card title="Upload type">
                    <UploadTypeForm/>
                </Card>

                <Card title="Archaeology specific metadata">
                    <ArchaeologySpecificMetadataForm/>
                </Card>

                <Card title="Language & literature specific metadata">
                    <LanguageAndLiteratureSpecificMetadataForm/>
                </Card>

                <Card title="Temporal and spatial coverage">
                    <TemporalAndSpatialCoverageForm/>
                </Card>

                <Card title="Message for the data manager">
                    <MessageForDataManagerForm/>
                </Card>

                <Card title="Privacy sensitive data" required defaultOpened>
                    <PrivacySensitiveDataForm/>
                </Card>

                <Card title="Deposit license" required defaultOpened>
                    <DepositLicenseForm/>
                </Card>

                <div className="buttons">
                    <button type="button" className="btn btn-primary mb-0" onClick={this.save}>Save draft</button>
                    <button type="button" className="btn btn-primary mb-0" onClick={this.submit}>Submit deposit</button>
                </div>
            </>
        )
    }
}

export default DepositForm
