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
import { emptyStringValue, Value } from "../../../model/FormData"
import TextFieldArray from "../../../lib/formComponents/TextFieldArray"
import { RepeatableField } from "../../../lib/formComponents/RepeatableField"

export interface UploadTypeFormData {
    typesDCMI?: string[]
    types?: Value[]
    formatsMediaType?: string[]
    formats?: Value[]
}

interface UploadTypeFormProps {
}

class UploadTypeForm extends Component<UploadTypeFormProps> {
    render() {
        return (
            <div className="container pl-0 pr-0">
                <div className="row form-group input-element">
                    <p>Type (DCMI resource type)</p>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="types"
                                     label="Types"
                                     empty={emptyStringValue}
                                     fieldNames={[(name: string) => `${name}.value`]}
                                     component={TextFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <p>Format (internet media type)</p>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="formats"
                                     label="Formats"
                                     empty={emptyStringValue}
                                     fieldNames={[(name: string) => `${name}.value`]}
                                     component={TextFieldArray}/>
                </div>
            </div>
        )
    }
}

export default UploadTypeForm
