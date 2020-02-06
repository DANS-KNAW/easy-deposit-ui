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
import asField from "./FieldHOC"
import LibDatePicker, { ReactDatePickerProps } from "react-datepicker"
import { FieldProps } from "./ReduxFormUtils"

// detects if the website is displayed on a mobile device
// copied from https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript
const isMobileDevice = () => (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf("IEMobile") !== -1)

const removeTimeFromDate: (date: Date) => Date = date => new Date(new Date(date).setHours(0, 0, 0, 0))

type DatePickerProps = FieldProps & ReactDatePickerProps

// See https://reactdatepicker.com/ for all kinds of options to be used on the DatePicker
const DatePickerField = (props: DatePickerProps) => {
    const { className, input: { value, onChange }, children } = props
    const dateFormat = "dd-MM-yyyy"

    return (
        <div className={`date-picker ${className || ""}`}>
            <LibDatePicker {...props}
                           dateFormat={dateFormat}

                           isClearable={true}
                           withPortal={isMobileDevice()}
                           placeholderText="Choose a date..."

                           className="react-datepicker__input-field"

                           selected={value ? new Date(value) : null}
                           onChange={date => onChange(date ? removeTimeFromDate(date) : "")}>
                {children}
            </LibDatePicker>
        </div>
    )
}

export default asField(DatePickerField)

export const ErrorHandlingDatePickerInputField = (props: DatePickerProps & any) => {
    const { meta } = props
    const changed = (meta as any).changed
    const hasError = meta.error && (changed || meta.submitFailed)

    return (
        <>
            <DatePickerField {...props} className={`form-control date-picker-field ${hasError ? "is-invalid" : ""}`.trim()}/>
            {hasError && <span className="invalid-feedback">{meta.error}</span>}
        </>
    )
}
