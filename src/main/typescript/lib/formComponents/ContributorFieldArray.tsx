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
import { FieldArrayProps, RepeatableField } from "./RepeatableField"
import { emptySchemedValue } from "../metadata/Value"
import AddButton from "./AddButton"

const ContributorIdArray = (idValues: DropdownListEntry[]) => (
    function <T>({ fields, fieldNames, empty }: FieldArrayProps<T>) {
        return (
            <>
                <div className="col-12 col-md-9 pl-0 pr-0 text-array">
                    {fields.map((name: string, index: number) => (
                        <div className="form-row" key={`${name}.${index}`}>
                            <div className="col col-md-3 mb-2">
                                <Field name={fieldNames[0](name)}
                                       choices={idValues}
                                       withEmptyDefault
                                       component={DropdownFieldInput}/>
                            </div>

                            <div className="col col-md-9 mb-2">
                                <div className="input-group">
                                    <Field name={fieldNames[1](name)}
                                           placeholder="ID"
                                           component={TextField}/>
                                    <RemoveButton onClick={() => fields.remove(index)}
                                                  disabled={fields.length <= 1}/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <AddButton onClick={() => fields.push(empty)}/>
            </>
        )
    }
)

interface ContributorIdRowsProps {
    idName: string
    idValues: DropdownListEntry[]
}

const ContributorIdRows = ({ idName, idValues }: ContributorIdRowsProps) => (
    <div className="container pl-0 pr-0">
        <div className="row ml-0 mr-0">
            <RepeatableField name={idName}
                             label="Contributor Ids"
                             empty={emptySchemedValue}
                             fieldNames={[
                                 (name: string) => `${name}.scheme`,
                                 (name: string) => `${name}.value`,
                             ]}
                             component={ContributorIdArray(idValues)}/>
        </div>
    </div>
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
            <label>Initials</label>
            <Field name={initialsName}
                   placeholder="initials"
                   component={TextField}/>
        </div>
        <div className="col form-group col-md-3 mb-2">
            <label>Insertions</label>
            <Field name={insertionsName}
                   placeholder="insertions"
                   component={TextField}/>
        </div>
        <div className="col form-group col-md-3 mb-2">
            <label>Surname</label>
            <Field name={surnameName}
                   placeholder="surname"
                   component={TextField}/>
        </div>
    </>
)

interface OrganizationProps {
    organizationName: string
    deleteDisabled: boolean

    onDelete: () => void
}

const Organization = ({ organizationName, onDelete, deleteDisabled }: OrganizationProps) => (
    <>
        <label>Organization</label>
        <div className="input-group">
            <Field name={organizationName}
                   placeholder="organization"
                   component={TextField}/>
            <RemoveButton onClick={onDelete}
                          disabled={deleteDisabled}/>
        </div>
    </>
)

interface ContributorFieldProps extends InnerComponentProps {
    idValues: DropdownListEntry[]
    roleValues?: DropdownListEntry[]
}

const ContributorField = ({ names, onDelete, deleteDisabled, idValues, roleValues }: ContributorFieldProps) => (
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

        <ContributorIdRows idName={names[4]}
                           idValues={idValues}/>

        <div className="form-row">
            <div className="col form-group">
                <Organization organizationName={names[6]}
                              onDelete={onDelete}
                              deleteDisabled={deleteDisabled}/>
            </div>
        </div>
    </div>
)

export default asFieldArray(ContributorField)
