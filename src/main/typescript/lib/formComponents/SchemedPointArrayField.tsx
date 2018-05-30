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
import TextField from "./TextField"
import { DropdownListEntry } from "../../model/DropdownLists"
import RemoveButton from "./RemoveButton"

interface SchemedPointFieldArrayProps {
    schemeValues: DropdownListEntry[]
}

function SchemedPointArrayField<T>(props: FieldArrayProps<T> & SchemedPointFieldArrayProps) {
    const { fields, fieldNames, schemeValues } = props

    return (
        <FormArrayEntry {...props}>
            {fields.map((name, index, fields) => {
                return (
                    <div key={name} className="form-row">
                        <div className="col">
                            <Field id="spatialPointScheme"
                                   name={fieldNames[0](name)}
                                   label="Scheme"
                                   choices={schemeValues}
                                   withEmptyDefault
                                   component={SelectField}/>
                        </div>
                        <div className="col input-group mb-2">
                            <div className="input-group-prepend">
                                <span className="input-group-text">X</span>
                            </div>
                            <Field id="spatialPointX"
                                   name={fieldNames[1](name)}
                                   label="X"
                                   placeholder="coordinate"
                                   type="number"
                                   component={TextField}/>
                        </div>
                        <div className="col">
                            <div className="input-group mb-2 mr-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Y</span>
                                </div>
                                <Field id="spatialPointY"
                                       name={fieldNames[2](name)}
                                       label="Y"
                                       placeholder="coordinate"
                                       type="number"
                                       component={TextField}/>
                                <RemoveButton onClick={() => fields.remove(index)}
                                              disabled={fields.length < 1}/>
                            </div>
                        </div>
                    </div>
                )
            })}
        </FormArrayEntry>
    )
}

export default SchemedPointArrayField
