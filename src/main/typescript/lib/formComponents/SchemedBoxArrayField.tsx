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
import LabeledTextField from "./LabeledTextField"

interface SchemedBoxFieldArrayProps {
    schemeValues: DropdownListEntry[]
}

function SchemedBoxArrayField<T>(props: FieldArrayProps<T> & SchemedBoxFieldArrayProps) {
    const { fields, fieldNames, schemeValues } = props

    return (
        <FormArrayEntry {...props}>
            {fields.map((name, index, fields) => {
                return (
                    <div key={`${name}.${index}`}>
                        <div className="form-row">
                            <div className="col input-group mb-1">
                                <Field id="spatialBoxScheme"
                                       name={fieldNames[0](name)}
                                       label="Scheme"
                                       choices={schemeValues}
                                       withEmptyDefault
                                       component={SelectField}/>
                            </div>
                            <div className="col input-group mb-1">
                                <Field id="spatialBoxNorth"
                                       name={fieldNames[1](name)}
                                       label="North"
                                       placeholder="upper bound"
                                       type="number"
                                       component={LabeledTextField}/>
                            </div>
                            <div className="col input-group mb-1">
                                <Field id="spatialBoxEast"
                                       name={fieldNames[2](name)}
                                       label="East"
                                       placeholder="right bound"
                                       type="number"
                                       component={LabeledTextField}/>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col input-group mb-2"/>
                            <div className="col input-group mb-2">
                                <Field id="spatialBoxSouth"
                                       name={fieldNames[3](name)}
                                       label="South"
                                       placeholder="lower bound"
                                       type="number"
                                       component={LabeledTextField}/>
                            </div>
                            <div className="col">
                                <div className="input-group mb-2 mr-2">
                                    <Field id="spatialBoxWest"
                                           name={fieldNames[4](name)}
                                           label="West"
                                           placeholder="left bound"
                                           type="number"
                                           component={LabeledTextField}/>
                                    <RemoveButton onClick={() => fields.remove(index)}
                                                  disabled={fields.length < 1}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </FormArrayEntry>
    )
}

export default SchemedBoxArrayField
