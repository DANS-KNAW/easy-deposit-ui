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
import { DropdownListEntry } from "../../model/DropdownLists"
import asField from "./FieldHOC"
import { FieldProps } from "./ReduxFormUtils"

interface DropdownFieldInputProps {
    choices: DropdownListEntry[]
    withEmptyDefault?: boolean
    emptyDefault?: string
}

export type DropdownFieldProps = FieldProps & SelectHTMLAttributes<HTMLSelectElement> & DropdownFieldInputProps

const DropdownField = ({ input, withEmptyDefault, emptyDefault, choices, className, ...rest }: DropdownFieldProps) => (
    <select className={`form-control ${className || ""}`} {...input} {...rest}>
        {withEmptyDefault && <option key="empty choice" value="">{emptyDefault || "Choose..."}</option>}
        {choices.map(({ key, displayValue }, index) => <option key={`${key}${index}`}
                                                               value={key}>{displayValue}</option>)}
    </select>
)

export const DropdownFieldInput = DropdownField

export const ErrorHandlingDropdownFieldInput = (props: DropdownFieldProps) => {
    const { meta } = props
    const changed = (meta as any).changed
    const hasError = meta.error && (changed || meta.submitFailed)

    return (
        <>
            <DropdownField {...props} className={hasError ? "is-invalid" : ""}/>
            {hasError && <span className="invalid-feedback">{meta.error}</span>}
        </>
    )
}

export default asField(DropdownField)
