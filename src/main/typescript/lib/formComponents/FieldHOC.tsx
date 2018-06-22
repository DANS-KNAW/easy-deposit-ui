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
import { WrappedFieldProps } from "redux-form"

interface InnerComponentProps {
    htmlFor: string
    label?: string
}

const asField = (InnerComponent: ComponentType<InnerComponentProps & any>) => (props: WrappedFieldProps & any) => {
    const { htmlFor, label } = props

    return (
        <>
            <label className="col-12 col-md-3 pl-0 title-label text-array-label" htmlFor={htmlFor}>{label || ""}</label>
            <div className="col-12 col-md-8 pl-0 pr-0">
                <InnerComponent {...props}/>
            </div>
        </>
    )
}

export default asField
