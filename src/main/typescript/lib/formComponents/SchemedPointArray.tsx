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
import { Point } from "../metadata/SpatialPoint"

interface SchemedPointProps extends InnerComponentProps<Point> {
    schemeValues: SpatialCoordinatesDropdownListEntry[]
}

const SchemedPoint = ({ names, schemeValues, itemData }: SchemedPointProps) => {
    const choice = schemeValues.find(value => value.key === itemData.scheme)
    const step = choice ? choice.step : "any"

    return (
        <div className="form-row spatialPoint">
            <div className="col col-md-4">
                <Field name={names[0]}
                       label="Scheme"
                       choices={schemeValues}
                       withEmptyDefault
                       component={ErrorHandlingDropdownFieldInput}/>
            </div>
            <div className="col col-md-4">
                <Field name={names[1]}
                       className="spatialpoint_x"
                       label={choice ? choice.xLabel : "X"}
                       placeholder="coordinate"
                       type="number"
                       step={step}
                       labelWidth={55}
                       component={LabeledTextField}/>
            </div>
            <div className="col col-md-4">
                <Field name={names[2]}
                       className="spatialpoint_y"
                       label={choice ? choice.yLabel : "Y"}
                       placeholder="coordinate"
                       type="number"
                       step={step}
                       labelWidth={50}
                       component={LabeledTextField}/>
            </div>
        </div>
    )
}

export default asFieldArray(SchemedPoint)
