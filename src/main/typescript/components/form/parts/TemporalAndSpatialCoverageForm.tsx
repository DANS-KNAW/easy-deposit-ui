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
import { Box, Point, SchemedValue } from "../../../model/FormData"

export interface TemporalAndSpatialCoverageFormData {
    temporalCoverages?: string[]
    spatialPoint?: Point[]
    spatialBoxes?: Box[]
    spatialCoverageIso3166?: SchemedValue[]
    spatialCoverages?: string[]
}

interface TemporalAndSpatialCoverageFormProps {
}

class TemporalAndSpatialCoverageForm extends Component<TemporalAndSpatialCoverageFormProps> {
    render() {
        return <p>Temporal and spatial coverage form</p>
    }
}

export default TemporalAndSpatialCoverageForm
