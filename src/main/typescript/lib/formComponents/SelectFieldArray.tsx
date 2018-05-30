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
import FormArrayEntry from "./FormArrayEntry"
import { FieldArrayProps } from "./RepeatableField"
import SelectField from "./SelectField"
import { DropdownListEntry } from "../../model/DropdownLists"
import RemoveButton from "./RemoveButton"

interface SelectFieldArrayProps {
    choices: DropdownListEntry[]
    withEmptyDefault?: boolean
}

function SelectFieldArray<T>(props: FieldArrayProps<T> & SelectFieldArrayProps) {
    const { fields, label, fieldNames, choices, withEmptyDefault } = props

    return (
        <FormArrayEntry {...props}>
            {fields.map((name, index, fields) => {
                return (
                    <div key={name} className="input-group mb-2 mr-2">
                        <Field name={fieldNames[0](name)}
                               label={label}
                               className="custom-select"
                               choices={choices}
                               withEmptyDefault={withEmptyDefault}
                               component={SelectField}/>
                        <RemoveButton onClick={() => fields.remove(index)}
                                      disabled={fields.length < 1}/>
                    </div>
                )
            })}
        </FormArrayEntry>
    )
}

export default SelectFieldArray
