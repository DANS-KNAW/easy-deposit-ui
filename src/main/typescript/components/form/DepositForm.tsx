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

class DepositForm extends Component {
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
                    <p>Upload your data form</p>
                </Card>

                <Card title="Basic information" required defaultOpened>
                    <p>Basic information form</p>
                </Card>

                <Card title="License and access" required defaultOpened>
                    <p>License and Access form</p>
                </Card>

                <Card title="Upload type">
                    <p>Upload type form</p>
                </Card>

                <Card title="Archaeology specific metadata">
                    <p>Archaeology specific metadata form</p>
                </Card>

                <Card title="Language & literature specific metadata">
                    <p>Language & literature specific metadata form</p>
                </Card>

                <Card title="Temporal and spatial coverage">
                    <p>Temporal and spatial coverage form</p>
                </Card>

                <Card title="Message for the data manager">
                    <p>Message for the data manager form</p>
                </Card>

                <Card title="Privacy sensitive data" required defaultOpened>
                    <p>Privacy sensitive data form</p>
                </Card>

                <Card title="Deposit license" required defaultOpened>
                    <p>Deposit license form</p>
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
