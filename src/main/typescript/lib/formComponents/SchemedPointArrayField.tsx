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
import { DropdownListEntry } from "../../model/DropdownLists"
import { SelectFieldInput } from "./SelectField"
import LabeledTextField from "./LabeledTextField"
import RemoveButton from "./RemoveButton"
import { Field } from "redux-form"
import asFieldArray from "./FieldArray"

interface SchemedPointArrayFieldElementProps {
    names: string[]
    onDelete: () => void
    deleteDisabled: boolean
    schemeValues: DropdownListEntry[]
}

const SchemedPointArrayFieldElement = ({ names, onDelete, deleteDisabled, schemeValues }: SchemedPointArrayFieldElementProps) => (
    <div className="form-row">
        <div className="col">
            <Field name={names[0]}
                   label="Scheme"
                   choices={schemeValues}
                   withEmptyDefault
                   component={SelectFieldInput}/>
        </div>
        <div className="col input-group mb-2">
            <Field name={names[1]}
                   label="X"
                   placeholder="coordinate"
                   type="number"
                   component={LabeledTextField}/>
        </div>
        <div className="col">
            <div className="input-group mb-2 mr-2">
                <Field name={names[2]}
                       label="Y"
                       placeholder="coordinate"
                       type="number"
                       component={LabeledTextField}/>
                <RemoveButton onClick={onDelete}
                              disabled={deleteDisabled}/>
            </div>
        </div>
    </div>
)

export default asFieldArray(SchemedPointArrayFieldElement)
