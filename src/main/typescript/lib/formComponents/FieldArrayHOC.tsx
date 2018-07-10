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
import AddButton from "./AddButton"
import { ComponentType } from "react"
import { FieldArrayProps } from "./ReduxFormUtils"
import Mandatory from "./Mandatory"

export interface InnerComponentProps {
    names: string[]
    deleteDisabled: boolean

    onDelete: () => void
}

const asFieldArray = (InnerComponent: ComponentType<InnerComponentProps>) => {
    return function <T>(props: FieldArrayProps<T> & any) {
        const { fields, fieldNames, empty, label, mandatory } = props

        return (
            <>
                <label className={"col-12 col-md-3 pl-0 title-label multi-field-label"}>
                    {label || ""}
                    {mandatory && <Mandatory/>}
                </label>
                <div className="col-12 col-md-8 pl-0 pr-0 text-array">
                    {fields.map((name: string, index: number) => {
                        const innerProps = {
                            ...(props),
                            names: fieldNames.map((f: (name: string) => string) => f(name)),
                            onDelete: () => fields.remove(index),
                            deleteDisabled: fields.length <= 1,
                        }
                        return <InnerComponent {...innerProps} key={`${name}.${index}`}/>
                    })}
                </div>
                <AddButton onClick={() => fields.push(empty)}/>
            </>
        )
    }
}

export default asFieldArray
