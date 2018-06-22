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
import { Field } from "redux-form"
import TextField from "./TextField"
import { DropdownFieldInput } from "./DropDownField"
import { DropdownListEntry } from "../../model/DropdownLists"
import RemoveButton from "./RemoveButton"
import asFieldArray, { InnerComponentProps } from "./FieldArrayHOC"

interface QualifiedSchemedTextFieldProps extends InnerComponentProps {
    label: string
    qualifierValues: DropdownListEntry[]
    withEmptyQualifierDefault?: boolean
    schemeValues: DropdownListEntry[]
    withEmptySchemeDefault?: boolean
}

const QualifiedSchemedTextFieldArray = ({ names, label, onDelete, deleteDisabled, qualifierValues, withEmptyQualifierDefault, schemeValues, withEmptySchemeDefault }: QualifiedSchemedTextFieldProps) => (
    <div className="form-row">
        <div className="col col-md-3">
            <Field name={names[0]}
                   label="Qualifier"
                   choices={qualifierValues}
                   withEmptyDefault={withEmptyQualifierDefault}
                   component={DropdownFieldInput}/>
        </div>
        <div className="col col-md-3">
            <Field name={names[1]}
                   label="Scheme"
                   choices={schemeValues}
                   withEmptyDefault={withEmptySchemeDefault}
                   component={DropdownFieldInput}/>
        </div>
        <div className="col col-md-6">
            <div className="input-group mb-2 mr-2">
                <Field name={names[2]}
                       label="Value" // TODO is label necessary anyway?
                       placeholder={label}
                       component={TextField}/>
                <RemoveButton onClick={onDelete}
                              disabled={deleteDisabled}/>
            </div>
        </div>
    </div>
)

export default asFieldArray(QualifiedSchemedTextFieldArray)
