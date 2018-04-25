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
import { AccessRight, emptyStringValue, Value } from "../../../model/FormData"
import TextFieldArray from "../../../lib/formComponents/TextFieldArray"
import { RepeatableField } from "../../../lib/formComponents/RepeatableField"

export interface LicenseAndAccessFormData {
    rightsHolders?: Value[]
    publishers?: Value[]
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
                    <RepeatableField name="rightsHolders"
                                     label="Rightsholders"
                                     empty={emptyStringValue}
                                     fieldNames={[(name: string) => `${name}.value`]}
                                     component={TextFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="publishers"
                                     label="Publishers"
                                     empty={emptyStringValue}
                                     fieldNames={[(name: string) => `${name}.value`]}
                                     component={TextFieldArray}/>
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
