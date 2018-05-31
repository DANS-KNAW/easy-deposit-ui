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
import { DropdownList } from "../../../../model/DropdownLists"
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"
import SelectField from "../../../../lib/formComponents/SelectField"
import { WrappedFieldProps } from "redux-form"

interface LanguageFieldProps {
    withLabel?: boolean
    withEmptyDefault?: boolean
}

const LanguageField = ({ state, list }: DropdownList) => (props: WrappedFieldProps & LanguageFieldProps) => (
    <LoadDropdownData state={state}>
        <SelectField {...props} choices={list}/>
    </LoadDropdownData>
)

export default LanguageField
