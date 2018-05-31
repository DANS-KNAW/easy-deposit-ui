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
import TextFieldArray from "../../../lib/formComponents/TextFieldArray"
import { RepeatableField } from "../../../lib/formComponents/RepeatableField"
import { Field } from "redux-form"
import { emptyString } from "../../../lib/metadata/misc"
import DcmiTypesFieldArray from "./uploadType/DcmiTypesFieldArray"
import ImtFormatsFieldArray from "./uploadType/ImtFormatsFieldArray"
import { AppState } from "../../../model/AppState"
import { connect } from "react-redux"
import { DropdownList } from "../../../model/DropdownLists"
import RadioChoices from "../../../lib/formComponents/RadioChoices"

export interface UploadTypeFormData {
    typesDCMI?: string[]
    types?: string[]
    formatsMediaType?: string[]
    formats?: string[]
    extraClarinMetadataPresent?: boolean
}

// validation rules
const oneSelected = (value?: any) => value !== undefined ? undefined : "you need to select one of these choices"

interface UploadTypeFormProps {
    dcmiTypes: DropdownList
    imtFormats: DropdownList
}

const clarinChoices = [
    {
        name: "no CLARIN metadata",
        title: false,
        value: "This dataset does not contain CLARIN metadata, i.e., no CMDI files",
    },
    {
        name: "contains CLARIN metadata",
        title: true,
        value: "This dataset contains CLARIN metadata, i.e., CMDI file(s)",
    },
]

const UploadTypeForm = ({ dcmiTypes, imtFormats }: UploadTypeFormProps) => (
    <div className="container pl-0 pr-0">
        <div className="row form-group input-element">
            <RepeatableField name="typesDCMI"
                             label="Type (DCMI resource type)"
                             empty={emptyString}
                             fieldNames={[(name: string) => name]}
                             component={DcmiTypesFieldArray(dcmiTypes)}/>
        </div>

        <div className="row form-group input-element">
            <RepeatableField name="types"
                             label="Types"
                             empty={emptyString}
                             fieldNames={[(name: string) => name]}
                             component={TextFieldArray}/>
        </div>

        <div className="row form-group input-element">
            <RepeatableField name="formatsMediaType"
                             label=" Format (internet media type)"
                             empty={emptyString}
                             fieldNames={[(name: string) => name]}
                             component={ImtFormatsFieldArray(imtFormats)}/>
        </div>

        <div className="row form-group input-element">
            <RepeatableField name="formats"
                             label="Formats"
                             empty={emptyString}
                             fieldNames={[(name: string) => name]}
                             component={TextFieldArray}/>
        </div>

        <div className="row form-group input-element">
            <Field name="extraClarinMetadataPresent"
                   label="Contains CLARIN metadata"
                   choices={clarinChoices}
                   component={RadioChoices}
                   validate={[oneSelected]}/>
        </div>
    </div>
)

const mapStateToProps = (state: AppState) => ({
    dcmiTypes: state.dropDowns.dcmiTypes,
    imtFormats: state.dropDowns.imtFormats,
})

export default connect(mapStateToProps)(UploadTypeForm)
