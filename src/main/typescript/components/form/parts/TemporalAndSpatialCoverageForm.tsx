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
import { Component } from "react"
import { Box, emptyStringValue, Point, SchemedValue, Value } from "../../../model/FormData"
import TextFieldArray from "../../../lib/formComponents/TextFieldArray"
import { RepeatableField } from "../../../lib/formComponents/RepeatableField"

export interface TemporalAndSpatialCoverageFormData {
    temporalCoverages?: Value[]
    spatialPoint?: Point[]
    spatialBoxes?: Box[]
    spatialCoverageIso3166?: SchemedValue[]
    spatialCoverages?: Value[]
}

interface TemporalAndSpatialCoverageFormProps {
}

class TemporalAndSpatialCoverageForm extends Component<TemporalAndSpatialCoverageFormProps> {
    render() {
        return (
            <div className="container pl-0 pr-0">
                <div className="row form-group input-element">
                    <RepeatableField name="temporalCoverages"
                                     label="Temporal coverage"
                                     empty={emptyStringValue}
                                     fieldName={(name: string) => `${name}.value`}
                                     component={TextFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <p>Spatial point</p>
                </div>

                <div className="row form-group input-element">
                    <p>Spatial box</p>
                </div>

                <div className="row form-group input-element">
                    <p>Spatial coverage (ISO 3166)</p>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="spatialCoverages"
                                     label="Spatial coverage"
                                     empty={emptyStringValue}
                                     fieldName={(name: string) => `${name}.value`}
                                     component={TextFieldArray}/>
                </div>
            </div>
        )
    }
}

export default TemporalAndSpatialCoverageForm
