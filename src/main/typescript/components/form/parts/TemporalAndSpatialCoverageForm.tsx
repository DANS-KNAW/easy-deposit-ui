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
import TextFieldArray from "../../../lib/formComponents/TextFieldArray"
import { RepeatableField } from "../../../lib/formComponents/RepeatableField"
import { emptySchemedValue } from "../../../lib/metadata/Value"
import { emptyPoint, Point } from "../../../lib/metadata/SpatialPoint"
import { Box, emptyBox } from "../../../lib/metadata/SpatialBox"
import { emptyString } from "../../../lib/metadata/misc"
import SpatialPointFieldArray from "./temporalAndSpatialCoverage/SpatialPointFieldArray"
import SpatialBoxFieldArray from "./temporalAndSpatialCoverage/SpatialBoxFieldArray"
import SpatialCoverageIso3166FieldArray from "./temporalAndSpatialCoverage/SpatialCoverageIso3166FieldArray"

export interface TemporalAndSpatialCoverageFormData {
    temporalCoverages?: string[]
    spatialPoints?: Point[]
    spatialBoxes?: Box[]
    spatialCoverageIso3166?: string[]
    spatialCoverages?: string[]
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
                                     empty={emptyString}
                                     fieldNames={[(name: string) => name]}
                                     component={TextFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="spatialPoints"
                                     label="Spatial point"
                                     empty={emptyPoint}
                                     fieldNames={[
                                         (name: string) => `${name}.scheme`,
                                         (name: string) => `${name}.x`,
                                         (name: string) => `${name}.y`,
                                     ]}
                                     component={SpatialPointFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="spatialBoxes"
                                     label="Spatial box"
                                     empty={emptyBox}
                                     fieldNames={[
                                         (name: string) => `${name}.scheme`,
                                         (name: string) => `${name}.north`,
                                         (name: string) => `${name}.east`,
                                         (name: string) => `${name}.south`,
                                         (name: string) => `${name}.west`,
                                     ]}
                                     component={SpatialBoxFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="spatialCoverageIso3166"
                                     label="Spatial coverage (ISO 3166)"
                                     empty={emptySchemedValue}
                                     fieldNames={[
                                         (name: string) => name,
                                     ]}
                                     component={SpatialCoverageIso3166FieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="spatialCoverages"
                                     label="Spatial coverage"
                                     empty={emptyString}
                                     fieldNames={[(name: string) => name]}
                                     component={TextFieldArray}/>
                </div>
            </div>
        )
    }
}

export default TemporalAndSpatialCoverageForm
