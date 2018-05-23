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
import { FieldArrayProps, RepeatableField } from "../../../lib/formComponents/RepeatableField"
import SelectFieldArray from "../../../lib/formComponents/SelectFieldArray"
import RadioChoices from "../../../lib/formComponents/RadioChoices"
import { Field } from "redux-form"
import { emptyStringValue, Value } from "../../../lib/metadata/Value"

export interface UploadTypeFormData {
    typesDCMI?: Value[]
    types?: Value[]
    formatsMediaType?: Value[]
    formats?: Value[]
    extraClarinMetadataPresent?: boolean
}

// validation rules
const oneSelected = (value?: any) => value ? undefined : "you need to select one of these choices"

interface UploadTypeFormProps {
}

const TypesDCMIFieldArray = (props: FieldArrayProps<Value>) => (
    <SelectFieldArray {...props} withEmptyDefault choices={[
        // @formatter:off
        { key: "Collection",           value: "Collection" },
        { key: "Dataset",              value: "Dataset" },
        { key: "Event",                value: "Event" },
        { key: "Image",                value: "Image" },
        { key: "Interactive resource", value: "Interactive resource" },
        { key: "Moving image",         value: "Moving image" },
        { key: "Physical object",      value: "Physical object" },
        { key: "Service",              value: "Service" },
        { key: "Software",             value: "Software" },
        { key: "Sound",                value: "Sound" },
        { key: "Still image",          value: "Still image" },
        { key: "Text",                 value: "Text" },
        // @formatter:on
    ]}/>
)

const FormatMediaTypeFieldArray = (props: FieldArrayProps<Value>) => (
    <SelectFieldArray {...props} withEmptyDefault choices={[
        // @formatter:off
        { key: "application/postscript", value: "application/postscript" },
        { key: "application/rtf",        value: "application/rtf" },
        { key: "application/pdf",        value: "application/pdf" },
        { key: "application/msword",     value: "application/msword" },
        { key: "text/plain",             value: "text/plain" },
        { key: "text/html",              value: "text/html" },
        { key: "text/sgml",              value: "text/sgml" },
        { key: "text/xml",               value: "text/xml" },
        { key: "image/jpeg",             value: "image/jpeg" },
        { key: "image/gif",              value: "image/gif" },
        { key: "image/tiff",             value: "image/tiff" },
        { key: "video/quicktime",        value: "video/quicktime" },
        { key: "video/mpeg1",            value: "video/mpeg1" },
        // @formatter:on
    ]}/>
)

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

class UploadTypeForm extends Component<UploadTypeFormProps> {
    render() {
        return (
            <div className="container pl-0 pr-0">
                <div className="row form-group input-element">
                    <RepeatableField name="typesDCMI"
                                     label="Type (DCMI resource type)"
                                     empty={emptyStringValue}
                                     fieldNames={[(name: string) => `${name}.value`]}
                                     component={TypesDCMIFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="types"
                                     label="Types"
                                     empty={emptyStringValue}
                                     fieldNames={[(name: string) => `${name}.value`]}
                                     component={TextFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="formatsMediaType"
                                     label=" Format (internet media type)"
                                     empty={emptyStringValue}
                                     fieldNames={[(name: string) => `${name}.value`]}
                                     component={FormatMediaTypeFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="formats"
                                     label="Formats"
                                     empty={emptyStringValue}
                                     fieldNames={[(name: string) => `${name}.value`]}
                                     component={TextFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <Field name="extraClarinMetadataPresent"
                           label="Contains CLARIN metadata"
                           withLabel
                           choices={clarinChoices}
                           component={RadioChoices}
                           validate={[oneSelected]}/>
                </div>
            </div>
        )
    }
}

export default UploadTypeForm
