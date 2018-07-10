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
import { TextareaHTMLAttributes } from "react"
import TextareaAutosize from "react-textarea-autosize"
import asField from "./FieldHOC"
import { FieldProps } from "./ReduxFormUtils"

interface TextAreaInputProps {
    maxRows?: number
    maxHeight?: number
}

type TextAreaProps = FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement> & TextAreaInputProps

const TextArea = ({ input, label, className, rows, maxRows, style, maxHeight, ...rest }: TextAreaProps) => (
    <TextareaAutosize className={`form-control ${className || ""}`.trim()}
                      id={input.name}
                      placeholder={label}
                      minRows={rows}
                      maxRows={maxRows}
                      style={{ ...style, maxHeight: maxHeight ? `${maxHeight}px` : "400px" }}
                      {...input}
                      {...rest}/>
)

export default asField(TextArea)

export const TextAreaInput = TextArea
