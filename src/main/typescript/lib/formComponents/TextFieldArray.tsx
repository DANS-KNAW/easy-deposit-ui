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
import TextField from "./TextField"
import { Field } from "redux-form"
import RemoveButton from "./RemoveButton"
import asFieldArray from "./FieldArray"

interface TextFieldArrayElementProps {
    names: string[]
    label: string
    onDelete: () => void
    deleteDisabled: boolean
}

const TextFieldArrayElement = ({ names, label, onDelete, deleteDisabled }: TextFieldArrayElementProps) => (
    <div className="input-group mb-2 mr-2">
        <Field name={names[0]}
               label={label}
               placeholder={label}
               component={TextField}/>
        <RemoveButton onClick={onDelete}
                      disabled={deleteDisabled}/>
    </div>
)

export default asFieldArray(TextFieldArrayElement)
