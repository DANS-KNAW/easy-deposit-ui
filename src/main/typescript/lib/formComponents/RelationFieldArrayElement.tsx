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
import { AnchorHTMLAttributes } from "react"
import asFieldArray, { InnerComponentProps } from "./FieldArrayHOC"
import { DropdownListEntry } from "../../model/DropdownLists"
import LabeledTextField from "./LabeledTextField"
import RemoveButton from "./RemoveButton"
import { DropdownFieldInput } from "./DropDownField"
import { Field, WrappedFieldProps } from "redux-form"
import * as validUrl from "valid-url"

const RelationValidateButton = ({ ...props }: WrappedFieldProps & AnchorHTMLAttributes<HTMLAnchorElement>) => (
    props.input.value && validUrl.isUri(props.input.value)
        ? <a className="btn btn-primary value-button relation-validate-button"
             href={props.input.value}
             target="_blank">
            validate
        </a>
        : <p className="btn btn-primary value-button relation-validate-button disabled">validate</p>
)

interface RelationFieldArrayProps extends InnerComponentProps {
    label: string
    schemeValues: DropdownListEntry[]

    get(index: number): any
}

const RelationFieldArrayElement = ({ names, onDelete, deleteDisabled, schemeValues }: RelationFieldArrayProps) => (
    <div className="relation">
        <div className="form-row">
            <div className="col col-md-3 mb-1">
                <Field name={names[0]}
                       label="Qualifier"
                       choices={schemeValues}
                       component={DropdownFieldInput}/>
            </div>
            <div className="col col-md-9 input-group mb-1">
                <Field name={names[1]}
                       label="Title"
                       placeholder="Title"
                       labelWidth={44}
                       component={LabeledTextField}/>
            </div>
        </div>

        <div className="form-row">
            <div className="col col-md-3 mb-2"/>
            <div className="col col-md-9 input-group mb-2">
                <div className="input-group">
                    <Field name={names[2]}
                           label="Url"
                           placeholder="Url"
                           labelWidth={44}
                           component={LabeledTextField}/>
                    <div className="input-group-append">
                        <Field name={names[2]}
                               component={RelationValidateButton}/>
                    </div>
                    <RemoveButton onClick={onDelete} disabled={deleteDisabled}/>
                </div>
            </div>
        </div>
    </div>
)

export default asFieldArray(RelationFieldArrayElement)
