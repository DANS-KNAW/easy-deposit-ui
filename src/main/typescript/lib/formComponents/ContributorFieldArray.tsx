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
import TextField from "./TextField"
import { DropdownFieldInput } from "./DropDownField"
import { DropdownListEntry } from "../../model/DropdownLists"
import RemoveButton from "./RemoveButton"
import { FieldArrayProps, RepeatableField } from "./ReduxFormUtils"
import { emptySchemedValue } from "../metadata/Value"
import AddButton from "./AddButton"
import Mandatory from "./Mandatory"

const ContributorIdArray = (idValues: DropdownListEntry[]) => (
    function <T>({ fields, fieldNames, empty }: FieldArrayProps<T>) {
        return (
            <>
                {fields.map((name, index) => (
                    <div className="form-row mb-2" key={`${name}.${index}`}>
                        <div className="col-12 col-md-3 pl-0">
                            <Field name={fieldNames[0](name)}
                                   choices={idValues}
                                   withEmptyDefault
                                   component={DropdownFieldInput}/>
                        </div>

                        <div className="col-12 col-md-6 pr-2">
                            <Field name={fieldNames[1](name)}
                                   placeholder="ID"
                                   component={TextField}/>
                        </div>

                        <div className="col-2 pl-0 pr-0 remove-and-add-buttons">
                            <RemoveButton onClick={() => fields.remove(index)}
                                          className="mr-2"
                                          disabled={fields.length <= 1}/>
                            {index === fields.length - 1 && <AddButton onClick={() => fields.push(empty)}/>}
                        </div>
                    </div>
                ))}
            </>
        )
    }
)

interface NameProps {
    titleName: string
    initialsName: string
    insertionsName: string
    surnameName: string
}

const Name = ({ titleName, initialsName, insertionsName, surnameName }: NameProps) => (
    <>
        <div className="col form-group col-md-3 mb-2">
            <label>Titles</label>
            <Field name={titleName}
                   placeholder="(acadamic) title(s)"
                   component={TextField}/>
        </div>
        <div className="col form-group col-md-3 mb-2">
            <label>Initials<Mandatory/></label>
            <Field name={initialsName}
                   placeholder="initials"
                   component={TextField}/>
        </div>
        <div className="col form-group col-md-3 mb-2">
            <label>Prefix</label>
            <Field name={insertionsName}
                   placeholder="prefix"
                   component={TextField}/>
        </div>
        <div className="col form-group col-md-3 mb-2">
            <label>Surname<Mandatory/></label>
            <Field name={surnameName}
                   placeholder="surname"
                   component={TextField}/>
        </div>
    </>
)

interface ContributorFieldProps extends InnerComponentProps {
    idValues: DropdownListEntry[]
    roleValues?: DropdownListEntry[]
}

const ContributorField = ({ names, idValues, roleValues }: ContributorFieldProps) => (
    <div className="border rounded contributor p-2 mb-4">
        <div className="form-row">
            <Name titleName={names[0]}
                  initialsName={names[1]}
                  insertionsName={names[2]}
                  surnameName={names[3]}/>
        </div>

        {roleValues && <div className="form-row">
            <div className="col mb-2">
                <Field name={names[5]}
                       choices={roleValues || []}
                       withEmptyDefault
                       emptyDefault="Choose role..."
                       component={DropdownFieldInput}/>
            </div>
        </div>}

        <RepeatableField name={names[4]}
                         label="Contributor Ids"
                         empty={emptySchemedValue}
                         fieldNames={[
                             (name: string) => `${name}.scheme`,
                             (name: string) => `${name}.value`,
                         ]}
                         component={ContributorIdArray(idValues)}/>

        <div className="form-row">
            <div className="col form-group">
                <label>Organization</label>
                <Field name={names[6]}
                       placeholder="organization"
                       component={TextField}/>
            </div>
        </div>
    </div>
)

export default asFieldArray(ContributorField)
