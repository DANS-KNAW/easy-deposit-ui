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
import { AccessRight } from "../../../model/FormData"

export interface LicenseAndAccessFormData {
    rightsHolders?: string[]
    publishers?: string[]
    accessRights?: AccessRight
    license?: string
    dateAvailable?: Date
}

interface LicenseAndAccessFormProps {
}

class LicenseAndAccessForm extends Component<LicenseAndAccessFormProps> {
    render() {
        return (
            <div className="container pl-0 pr-0">
                <div className="row form-group input-element">
                    <p>Rightsholder</p>
                </div>

                <div className="row form-group input-element">
                    <p>Publisher</p>
                </div>

                <div className="row form-group input-element">
                    <p>Access rights</p>
                </div>

                <div className="row form-group input-element">
                    <p>License</p>
                </div>

                <div className="row form-group input-element">
                    <p>Date available</p>
                </div>
            </div>
        )
    }
}

export default LicenseAndAccessForm
