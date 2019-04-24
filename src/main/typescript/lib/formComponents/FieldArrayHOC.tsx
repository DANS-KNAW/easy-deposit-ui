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
import { ComponentType } from "react"
import { FieldArrayProps } from "./ReduxFormUtils"
import Mandatory from "./Mandatory"
import AddButton from "./AddButton"
import RemoveButton from "./RemoveButton"
import HelpButton from "./HelpButton"
import HelpText from "./HelpText"

export interface InnerComponentProps<T = any> {
    className: string
    names: string[]
    itemData: T
}

const isFirstIndex: (index: number) => boolean = index => index === 0

const isLastIndex: <T>(arr: T[], index: number) => boolean = (arr, index) => index === arr.length - 1

const extractNameFromFirstIndex: (string: string) => string = string => string.slice(0, -3)

function asFieldArray<T>(InnerComponent: ComponentType<InnerComponentProps<T>>) {
    return function (props: FieldArrayProps<T> & any) {
        const { fields, fieldNames, empty, label, mandatory, helpText, meta } = props
        const changed = (meta as any).changed
        const hasError = meta.error && (changed || meta.submitFailed)

        return fields.map((name: string, index: number) => {
            const firstIndex = isFirstIndex(index)
            const lastIndex = isLastIndex(fields, index)
            const myHelpText = typeof helpText == "string" ? helpText : extractNameFromFirstIndex(name)

            return (
                <div className={`row form-group input-element ${lastIndex ? "mb-4" : "mb-2"}`} key={`${name}.${index}`}>
                    <label className="col-12 col-md-3 pl-0 pr-0 title-label">
                        {firstIndex && label
                            ? <>
                                {label}
                                {mandatory && <Mandatory/>}
                                {helpText && <HelpButton textFor={myHelpText}/>}
                            </>
                            : ""}
                    </label>

                    <div className="col-12 col-md-8 pl-0 pr-2">
                        {firstIndex && helpText && <HelpText textFor={myHelpText}/>}
                        <InnerComponent {...props}
                                        className={hasError ? "is-invalid" : ""}
                                        names={fieldNames.map((f: (name: string) => string) => f(name))}
                                        itemData={fields.get(index)}/>
                        {lastIndex && hasError && <span className="invalid-feedback">{meta.error}</span>}
                    </div>

                    <div className="col-1 pl-0 pr-0 remove-and-add-buttons">
                        <RemoveButton disabled={fields.length <= 1}
                                      className="mr-2"
                                      onClick={() => fields.remove(index)}/>
                        {lastIndex && <AddButton onClick={() => fields.push(empty)}/>}
                    </div>
                </div>
            )
        })
    }
}

export default asFieldArray
