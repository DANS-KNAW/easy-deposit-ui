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
import LibDatePicker, { ReactDatePickerProps } from "react-datepicker"
import * as moment from "moment"
import { WrappedFieldProps } from "redux-form"
import { Component } from "react"

type DatePickerProps = WrappedFieldProps & ReactDatePickerProps

const DatePickerField = (props: DatePickerProps) => {
    const { input: { value, onChange }, children } = props
    const dateFormat = "DD-MM-YYYY"

    return (
        <LibDatePicker {...props}
                       dateFormat={dateFormat}

                       isClearable={true}
                       placeholderText="Choose a date..."

                       showDisabledMonthNavigation
                       showMonthYearDropdown
                       dateFormatCalendar="MMM YYYY"
                       scrollableMonthYearDropdown

                       selected={value ? moment(value, dateFormat) : null}
                       onChange={date => onChange(date ? moment(date).format(dateFormat) : "")}>
            {children}
        </LibDatePicker>
    )
}

export default asField(DatePickerField)
