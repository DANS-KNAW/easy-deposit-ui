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
import TextField, { TextFieldProps } from "./TextField"
import { FieldProps } from "./ReduxFormUtils"
import { ReactNode } from "react"

interface LabeledTextFieldProps {
    labelWidth?: number
    appendElem?: (props: FieldProps) => ReactNode
}

/**
 * Creates a TextField with a prepended label
 */
const LabeledTextField = ({ label, labelWidth, appendElem, ...rest }: LabeledTextFieldProps & TextFieldProps) => {
    const { meta } = rest
    const changed = (meta as any).changed
    const hasError = meta.error && (changed || meta.submitFailed)

    return (
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text"
                      style={labelWidth ? { width: `${labelWidth}px`, display: "block", textAlign: "center" } : {}}>
                    {label}
                </span>
            </div>
            <TextField className={hasError ? "is-invalid" : ""} {...rest}/>
            {appendElem && <div className="input-group-append">{appendElem(rest)}</div>}
            {hasError && <span className="invalid-feedback">{meta.error}</span>}
        </div>
    )
}

export default LabeledTextField
