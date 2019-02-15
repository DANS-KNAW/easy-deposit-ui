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
import { ErrorHandlingDropdownFieldInput } from "./DropDownField"
import { SpatialCoordinatesDropdownListEntry } from "../../model/DropdownLists"
import LabeledTextField from "./LabeledTextField"
import asFieldArray, { InnerComponentProps } from "./FieldArrayHOC"

interface SchemedBoxProps extends InnerComponentProps {
    schemeValues: SpatialCoordinatesDropdownListEntry[]
}

const SchemedBox = ({ names, schemeValues }: SchemedBoxProps) => (
    <div className="spatialBox">
        <div className="form-row">
            <div className="col col-md-4 mb-1">
                <Field name={names[0]}
                       label="Scheme"
                       choices={schemeValues}
                       withEmptyDefault
                       component={ErrorHandlingDropdownFieldInput}/>
            </div>
            <div className="col col-md-4 mb-1">
                <Field name={names[1]}
                       label="North"
                       placeholder="upper bound"
                       type="number"
                       labelWidth={55}
                       component={LabeledTextField}/>
            </div>
            <div className="col col-md-4 mb-1">
                <Field name={names[2]}
                       label="East"
                       placeholder="right bound"
                       type="number"
                       labelWidth={50}
                       component={LabeledTextField}/>
            </div>
        </div>

        <div className="form-row">
            <div className="col col-md-4"/>
            <div className="col col-md-4">
                <Field name={names[3]}
                       label="South"
                       placeholder="lower bound"
                       type="number"
                       labelWidth={55}
                       component={LabeledTextField}/>
            </div>
            <div className="col col-md-4">
                <Field name={names[4]}
                       label="West"
                       placeholder="left bound"
                       type="number"
                       labelWidth={50}
                       component={LabeledTextField}/>
            </div>
        </div>
    </div>
)

export default asFieldArray(SchemedBox)
