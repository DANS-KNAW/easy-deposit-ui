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
import FormArrayEntry from "./FormArrayEntry"
import { FieldArrayProps } from "./RepeatableField"
import { DropdownListEntry } from "../../model/DropdownLists"
import SchemedTextFieldArrayElement from "./SchemedTextFieldArrayElement"

export interface SchemedTextFieldArrayProps {
    schemeValues: DropdownListEntry[]
    withEmptyDefault?: boolean
}

function SchemedTextFieldArray<T>(props: FieldArrayProps<T> & SchemedTextFieldArrayProps) {
    const { fields, label, fieldNames, schemeValues, withEmptyDefault } = props

    return (
        <FormArrayEntry {...props}>
            {fields.map((name, index) => (
                <SchemedTextFieldArrayElement key={`${name}.${index}`}
                                              name={fieldNames.map(f => f(name))}
                                              label={label}
                                              onDelete={() => fields.remove(index)}
                                              deleteDisabled={fields.length <= 1}
                                              schemeValues={schemeValues}
                                              withEmptyDefault={withEmptyDefault}/>
            ))}
        </FormArrayEntry>
    )
}

export default SchemedTextFieldArray
