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
import { ErrorHandlingDropdownFieldInput } from "./DropDownField"
import { DropdownListEntry } from "../../model/DropdownLists"
import asFieldArray, { InnerComponentProps } from "./FieldArrayHOC"

interface SchemedTextFieldProps extends InnerComponentProps {
    label: string
    schemeValues: DropdownListEntry[]
    withEmptyDefault?: boolean
}

const SchemedTextField = ({ names, label, schemeValues, withEmptyDefault }: SchemedTextFieldProps) => (
    <div className="form-row">
        <div className="col col-md-4">
            <Field name={names[0]}
                   label="Scheme"
                   choices={schemeValues}
                   withEmptyDefault={withEmptyDefault}
                   component={ErrorHandlingDropdownFieldInput}/>
        </div>
        <div className="col col-md-8">
            <Field name={names[1]}
                   label="Value"
                   placeholder={label}
                   component={ErrorHandlingTextField}/>
        </div>
    </div>
)

export default asFieldArray(SchemedTextField)
