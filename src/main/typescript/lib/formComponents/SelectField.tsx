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
import { SelectHTMLAttributes } from "react"
import { WrappedFieldProps } from "redux-form"
import { DropdownListEntry } from "../../model/DropdownLists"

export interface SelectFieldProps {
    choices: DropdownListEntry[]
    withEmptyDefault?: boolean
}

const SelectField = ({ input, withEmptyDefault, choices, className, ...rest }: WrappedFieldProps & SelectHTMLAttributes<HTMLSelectElement> & SelectFieldProps) => (
    <select className={`form-control ${className}`} {...input} {...rest}>
        {withEmptyDefault ? [<option key="empty choice" value="">Choose...</option>] : []}
        {choices.map(({ key, displayValue }, index) => <option key={`${key}${index}`}
                                                               value={key}>{displayValue}</option>)}
    </select>
)

export default SelectField
