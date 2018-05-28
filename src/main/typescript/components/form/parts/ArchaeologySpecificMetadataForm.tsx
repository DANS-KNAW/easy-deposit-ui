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
import AbrComplexSubjectFieldArray from "./archaeologySpecificMetadata/AbrComplexSubjectFieldArray"
import { DropdownList } from "../../../model/DropdownLists"
import { AppState } from "../../../model/AppState"
import { connect } from "react-redux"
import AbrPeriodeTemporalsFieldArray from "./archaeologySpecificMetadata/AbrPeriodeTemporalsFieldArray"

export interface ArchaeologySpecificMetadataFormData {
    archisNrs?: string[]
    subjectsAbrComplex?: string[]
    temporalCoveragesAbr?: string[]
}

interface ArchaeologySpecificMetadataFormProps {
    abrComplexSubjects: DropdownList
    abrPeriodeTemporals: DropdownList
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
                    <RepeatableField name="subjectsAbrComplex"
                                     label="Subject (ABR complex)"
                                     empty={emptyString}
                                     fieldNames={[(name: string) => name]}
                                     component={AbrComplexSubjectFieldArray(this.props.abrComplexSubjects)}/>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="temporalCoveragesAbr"
                                     label="Temporal (ABR period)"
                                     empty={emptyString}
                                     fieldNames={[(name: string) => name]}
                                     component={AbrPeriodeTemporalsFieldArray(this.props.abrPeriodeTemporals)}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    abrComplexSubjects: state.dropDowns.abrComplexSubjects,
    abrPeriodeTemporals: state.dropDowns.abrPeriodeTemporals,
})

export default connect(mapStateToProps)(ArchaeologySpecificMetadataForm)
