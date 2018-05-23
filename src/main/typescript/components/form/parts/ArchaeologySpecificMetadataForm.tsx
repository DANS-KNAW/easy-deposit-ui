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
import TextFieldArray from "../../../lib/formComponents/TextFieldArray"
import { RepeatableField } from "../../../lib/formComponents/RepeatableField"
import { emptyString } from "../../../lib/metadata/misc"

export interface ArchaeologySpecificMetadataFormData {
    archisNrs?: string[]
    subjectsAbrComplex?: string[]
    temporalCoveragesAbr?: string[]
}

interface ArchaeologySpecificMetadataFormProps {
}

class ArchaeologySpecificMetadataForm extends Component<ArchaeologySpecificMetadataFormProps> {
    render() {
        return (
            <div className="container pl-0 pr-0">
                <div className="row form-group input-element">
                    <RepeatableField name="archisNrs"
                                     label="Archis zaakidentificatie"
                                     empty={emptyString}
                                     fieldNames={[(name: string) => name]}
                                     component={TextFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <p>Subject (ABR complex)</p>
                </div>

                <div className="row form-group input-element">
                    <p>Temporal (ABR period)</p>
                </div>
            </div>
        )
    }
}

export default ArchaeologySpecificMetadataForm
