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
import TextFieldArray from "../../../lib/formComponents/TextFieldArray"
import { RepeatableField, RepeatableFieldWithDropdown } from "../../../lib/formComponents/ReduxFormUtils"
import { emptySchemedValue } from "../../../lib/metadata/Value"
import { emptyPoint, Point } from "../../../lib/metadata/SpatialPoint"
import { Box, emptyBox } from "../../../lib/metadata/SpatialBox"
import { emptyString } from "../../../lib/metadata/misc"
import SpatialPointFieldArray from "./temporalAndSpatialCoverage/SpatialPointFieldArray"
import SpatialBoxFieldArray from "./temporalAndSpatialCoverage/SpatialBoxFieldArray"
import SpatialCoverageIso3166FieldArray from "./temporalAndSpatialCoverage/SpatialCoverageIso3166FieldArray"
import { useSelector } from "../../../lib/redux"

export interface TemporalAndSpatialCoverageFormData {
    temporalCoverages?: string[]
    spatialPoints?: Point[]
    spatialBoxes?: Box[]
    spatialCoverageIso3166?: string[]
    spatialCoverages?: string[]
}

const TemporalAndSpatialCoverageForm = () => {
    const spatialCoordinates = useSelector(state => state.dropDowns.spatialCoordinates)
    return (
        <>
            <RepeatableField name="temporalCoverages"
                             label="Temporal coverage"
                             helpText
                             empty={() => emptyString}
                             fieldNames={[(name: string) => name]}
                             component={TextFieldArray}/>

            <RepeatableFieldWithDropdown name="spatialPoints"
                                         label="Spatial point"
                                         helpText
                                         empty={() => emptyPoint}
                                         fieldNames={[
                                             (name: string) => `${name}.scheme`,
                                             (name: string) => `${name}.x`,
                                             (name: string) => `${name}.y`,
                                         ]}
                                         dropdowns={{ coordinates: spatialCoordinates }}
                                         component={SpatialPointFieldArray}/>

            <RepeatableFieldWithDropdown name="spatialBoxes"
                                         label="Spatial box"
                                         helpText
                                         empty={() => emptyBox}
                                         fieldNames={[
                                             (name: string) => `${name}.scheme`,
                                             (name: string) => `${name}.north`,
                                             (name: string) => `${name}.east`,
                                             (name: string) => `${name}.south`,
                                             (name: string) => `${name}.west`,
                                         ]}
                                         dropdowns={{ coordinates: spatialCoordinates }}
                                         component={SpatialBoxFieldArray}/>

            <RepeatableFieldWithDropdown name="spatialCoverageIso3166"
                                         label="Spatial coverage"
                                         helpText="spatialCoverages"
                                         empty={() => emptySchemedValue}
                                         fieldNames={[
                                             (name: string) => name,
                                         ]}
                /*
                 * values taken from https://nl.wikipedia.org/wiki/ISO_3166-1
                 * use values ISO-3166-1 alpha-3
                 */
                                         dropdowns={{ coverages: useSelector(state => state.dropDowns.spatialCoveragesIso) }}
                                         component={SpatialCoverageIso3166FieldArray}/>

            <RepeatableField name="spatialCoverages"
                             label="Only if you can’t use the dropdown field above"
                             showNoLabel
                             empty={() => emptyString}
                             fieldNames={[(name: string) => name]}
                             component={TextFieldArray}/>
        </>
    )
}

export default TemporalAndSpatialCoverageForm
