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
import { DropdownFieldInput } from "./DropDownField"
import { DropdownListEntry } from "../../model/DropdownLists"
import asFieldArray, { InnerComponentProps } from "./FieldArrayHOC"

interface DropdownFieldProps extends InnerComponentProps {
    label: string
    choices: DropdownListEntry[]
    withEmptyDefault?: boolean
}

const DropdownField = ({ className, names, label, choices, withEmptyDefault }: DropdownFieldProps) => (
    <Field name={names[0]}
           label={label}
           className={`custom-select ${className}`}
           choices={choices}
           withEmptyDefault={withEmptyDefault}
           component={DropdownFieldInput}/>
)

export default asFieldArray(DropdownField)
