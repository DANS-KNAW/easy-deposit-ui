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
import { FieldProps } from "./ReduxFormUtils"
import { SFC } from "react"

// satisfyCompiler is used here to make sure it all compiles
// if we leave it out, the <Field component={Checkbox}/> will fail to compile
const Checkbox: SFC<FieldProps & {satisfyCompiler?: any}> = ({ input, meta, label, children }) => {
    const changed = (meta as any).changed
    const hasError = meta.error && (changed || meta.submitFailed)

    return (
        <>
            <div className="form-check col-12">
                <input className={`form-check-input ${hasError ? "is-invalid" : ""}`} id={input.name} type="checkbox"
                       {...input} defaultChecked={input.value}/>
                <label className="form-check-label" htmlFor={input.name}>{children}</label>
                {hasError && <span className="invalid-feedback">{meta.error}</span>}
            </div>
        </>
    )
}

export default Checkbox
