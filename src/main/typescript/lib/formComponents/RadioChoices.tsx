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
import asField from "./FieldHOC"
import { FieldProps } from "./ReduxFormUtils"

export interface RadioChoice {
    name?: string
    title: any
    value: string | JSX.Element
    disabled?: () => boolean
}

export interface RadioProps {
    choices: RadioChoice[]
    divClassName?: string
}

const RadioChoices = ({ input, choices, divClassName }: FieldProps & RadioProps) => (
    <>
        {choices.map(({ name, title, value, disabled }) =>
            <div className={`form-check col-12 ${divClassName || ""}`}
                 key={name || title.toString()}>
                {/*
                  * Note to future developers: the order of the attributes in <input> is important!
                  * {...input} must come before value={title} and neither of them may be omitted.
                  */}
                <input className="form-check-input" id={name || title.toString()} type="radio"
                       {...input} value={title} checked={input.value === title.toString()}
                       disabled={disabled && disabled()}/>
                <label className="form-check-label" htmlFor={name || title.toString()}>{value}</label>
            </div>,
        )}
    </>
)

export default asField(RadioChoices)

export const RadioChoicesInput = RadioChoices
