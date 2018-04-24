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
import { WrappedFieldArrayProps, WrappedFieldProps } from "redux-form"

interface DoiFieldProps {
    fetchDoi: () => void
    fetchingDoi: boolean
}

const DoiField = ({ input, meta, label, fetchDoi, fetchingDoi }: WrappedFieldProps & DoiFieldProps) => (
    <>
        <label className="col-12 col-md-3 pl-0 title-label" htmlFor={input.name}>{label}</label>
        {input.value
            ? <label className="col-12 col-md-9 value-label" id={input.name}>{input.value}</label>
            : <button type="button"
                      className="btn btn-primary mb-0 mt-0 value-button"
                      onClick={fetchDoi}
                      disabled={fetchingDoi}>Reserve DOI</button>}
    </>
)

export default DoiField
