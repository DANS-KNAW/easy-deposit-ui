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
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"
import { FieldArrayPropsWithDropdown } from "../../../../lib/formComponents/ReduxFormUtils"
import { SchemedValue } from "../../../../lib/metadata/Value"
import { DropdownList, SpatialCoordinatesDropdownListEntry } from "../../../../model/DropdownLists"
import SchemedPointArray from "../../../../lib/formComponents/SchemedPointArray"

type SpatialPointFieldArrayProps = FieldArrayPropsWithDropdown<SchemedValue, DropdownList<SpatialCoordinatesDropdownListEntry>>

const SpatialPointFieldArray = ({ dropdowns: { coordinates }, ...props }: SpatialPointFieldArrayProps) => (
    <LoadDropdownData state={coordinates.state}>
        <SchemedPointArray {...props} schemeValues={coordinates.list}/>
    </LoadDropdownData>
)

export default SpatialPointFieldArray
