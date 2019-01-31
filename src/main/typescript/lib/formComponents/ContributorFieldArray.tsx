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
import asFieldArray, { InnerComponentProps } from "./FieldArrayHOC"
import { Field } from "redux-form"
import TextField, { ErrorHandlingTextField } from "./TextField"
import { DropdownFieldInput, ErrorHandlingDropdownFieldInput } from "./DropDownField"
import { DropdownListEntry } from "../../model/DropdownLists"
import RemoveButton from "./RemoveButton"
import { FieldArrayProps, FieldArrayPropsWithDropdown, RepeatableFieldWithDropdown } from "./ReduxFormUtils"
import { emptySchemedValue, SchemedValue } from "../metadata/Value"
import AddButton from "./AddButton"
import Mandatory from "./Mandatory"
import { Contributor } from "../metadata/Contributor"

const ContributorIdArray = ({ fields, fieldNames, empty, dropdowns: { contributorIds } }: FieldArrayPropsWithDropdown<SchemedValue, DropdownListEntry[]>) => (
    <>
        <div className="form-row">
            <div className="col form-group col-12 col-md-3 pl-0 mb-0">
                <label>Identifier</label>
            </div>
        </div>

        {fields.map((name, index) => (
            <div className="form-row mb-2" key={`${name}.${index}`}>
                <div className="col col-12 col-md-3 pl-0">
                    <Field name={fieldNames[0](name)}
                           choices={contributorIds}
                           withEmptyDefault
                           component={ErrorHandlingDropdownFieldInput}/>
                </div>

                <div className="col col-12 col-md-6">
                    <Field name={fieldNames[1](name)}
                           placeholder="ID"
                           component={ErrorHandlingTextField}/>
                </div>

                <div className="col col-2 remove-and-add-buttons">
                    <RemoveButton onClick={() => fields.remove(index)}
                                  className="mr-2"
                                  disabled={fields.length <= 1}/>
                    {index === fields.length - 1 && <AddButton onClick={() => fields.push(empty())}/>}
                </div>
            </div>
        ))}
    </>
)

interface ContributorFieldProps extends InnerComponentProps, FieldArrayProps<Contributor> {
    idValues: DropdownListEntry[]
    roleValues?: DropdownListEntry[]
}

const ContributorField = ({ names, idValues, roleValues, className }: ContributorFieldProps) => (
    <div className={`border rounded contributor pt-2 pl-2 pr-2 pb-0 ${className || ""}`}>
        {roleValues && <div className="form-row">
            <div className="col form-group col-md-6 mb-1">
                <Field name={names[5]}
                       choices={roleValues || []}
                       component={DropdownFieldInput}/>
            </div>
        </div>}

        <div className="form-row">
            <div className="col form-group col-md-6 mb-1">
                <label>Organization</label>
                <Field name={names[6]}
                       placeholder="organization"
                       component={ErrorHandlingTextField}/>
            </div>
            {/* TODO these fields need to be added later. they do not yet occur in the UI model, nor in the API */}
            {/*<div className="col form-group col-md-3 mb-1">
                <label>Identifier</label>
                <Field name={""}
                       choices={idValues}
                       withEmptyDefault
                       emptyDefault="Choose..."
                       component={DropdownFieldInput}/>
            </div>
            <div className="col form-group col-md-3 mb-1">
                <label/>
                <Field name={"abc"}
                       placeholder="identifier"
                       component={TextField}/>
            </div>*/}
        </div>

        <div className="form-row">
            <div className="col form-group col-md-3 mb-1">
                <label>Titles</label>
                <Field name={names[0]}
                       placeholder="(acadamic) title(s)"
                       component={TextField}/>
            </div>
            <div className="col form-group col-md-3 mb-1">
                <label>Initials<Mandatory/></label>
                <Field name={names[1]}
                       placeholder="initials"
                       component={ErrorHandlingTextField}/>
            </div>
            <div className="col form-group col-md-3 mb-1">
                <label>Prefix</label>
                <Field name={names[2]}
                       placeholder="prefix"
                       component={TextField}/>
            </div>
            <div className="col form-group col-md-3 mb-1">
                <label>Surname<Mandatory/></label>
                <Field name={names[3]}
                       placeholder="surname"
                       component={ErrorHandlingTextField}/>
            </div>
        </div>

        <RepeatableFieldWithDropdown name={names[4]}
                                     label="Contributor Ids"
                                     empty={() => emptySchemedValue}
                                     fieldNames={[
                                         (name: string) => `${name}.scheme`,
                                         (name: string) => `${name}.value`,
                                     ]}
                                     dropdowns={{ contributorIds: idValues }}
                                     component={ContributorIdArray}/>
    </div>
)

export default asFieldArray(ContributorField)
