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
import SchemedDatePickerArray from "../../../../lib/formComponents/SchemedDatePickerArray"
import { DropdownList } from "../../../../model/DropdownLists"
import { QualifiedDate } from "../../../../lib/metadata/Date"

const IsoDateFieldArray = ({ dropdowns: { dates }, ...props }: FieldArrayPropsWithDropdown<QualifiedDate<Date>, DropdownList>) => (
    <LoadDropdownData state={dates.state}>
        <SchemedDatePickerArray {...props} schemeValues={dates.list}/>
    </LoadDropdownData>
)

export default IsoDateFieldArray
