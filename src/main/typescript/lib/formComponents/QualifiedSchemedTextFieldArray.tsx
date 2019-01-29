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
import { ErrorHandlingTextField } from "./TextField"
import { DropdownFieldInput, ErrorHandlingDropdownFieldInput } from "./DropDownField"
import { DropdownListEntry } from "../../model/DropdownLists"
import asFieldArray, { InnerComponentProps } from "./FieldArrayHOC"

interface QualifiedSchemedTextFieldProps extends InnerComponentProps {
    label: string
    qualifierValues: DropdownListEntry[]
    withEmptyQualifierDefault?: boolean
    schemeValues: DropdownListEntry[]
    withEmptySchemeDefault?: boolean
}

const QualifiedSchemedTextFieldArray = ({ names, label, qualifierValues, withEmptyQualifierDefault, schemeValues, withEmptySchemeDefault }: QualifiedSchemedTextFieldProps) => (
    <div className="form-row">
        <div className="col col-md-4">
            <Field name={names[0]}
                   choices={qualifierValues}
                   withEmptyDefault={withEmptyQualifierDefault}
                   component={DropdownFieldInput}/>
        </div>
        <div className="col col-md-3">
            <Field name={names[1]}
                   choices={schemeValues}
                   withEmptyDefault={withEmptySchemeDefault}
                   component={ErrorHandlingDropdownFieldInput}/>
        </div>
        <div className="col col-md-5">
            <Field name={names[2]}
                   placeholder={label}
                   component={ErrorHandlingTextField}/>
        </div>
    </div>
)

export default asFieldArray(QualifiedSchemedTextFieldArray)
