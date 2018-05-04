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
import { WrappedFieldProps } from "redux-form"
import { SelectHTMLAttributes } from "react"

interface SelectFieldProps {
    withLabel?: boolean
}

const SelectField = ({ input, meta, label, withLabel, children, className, ...rest }: WrappedFieldProps & SelectHTMLAttributes<HTMLSelectElement> & SelectFieldProps) => (
    <>
        {withLabel && <label className="col-12 col-md-3 pl-0 title-label text-array-label" htmlFor={input.name}>{label}</label>}
        <select className={`form-control ${className}`} {...input} {...rest}>{children}</select>
    </>
)

export default SelectField