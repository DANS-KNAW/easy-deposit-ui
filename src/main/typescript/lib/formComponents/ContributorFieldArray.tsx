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
                <div className="col-12 col-md-11 pl-0 pr-0 text-array">
                    {fields.map((name: string, index: number) => (
                        <div className="form-row" key={`${name}.${index}`}>
                            <div className="col form-group mb-2">
                                <label>Scheme</label>
                                <Field name={fieldNames[0](name)}
                                       choices={idValues}
                                       withEmptyDefault
                                       component={DropdownFieldInput}/>
                            </div>

                            <div className="col">
                                <div className="form-group mb-2">
                                    <label>ID</label>
                                    <div className="input-group">
                                        <Field name={fieldNames[1](name)}
                                               component={TextField}/>
                                        <RemoveButton onClick={() => fields.remove(index)}
                                                      disabled={fields.length <= 1}/>
                                    </div>
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

interface ContributorFieldProps extends InnerComponentProps {
    idValues: DropdownListEntry[]
    roleValues: DropdownListEntry[]
}

const ContributorField = ({ names, onDelete, deleteDisabled, idValues, roleValues }: ContributorFieldProps) => (
    <div className="contributor mb-3">
        <div className="container pl-0 pr-0">
            <div className="row ml-0 mr-0">
                <RepeatableField name={names[4]}
                                 label="Contributor Ids"
                                 empty={emptySchemedValue}
                                 fieldNames={[
                                     (name: string) => `${name}.scheme`,
                                     (name: string) => `${name}.value`,
                                 ]}
                                 component={ContributorIdArray(idValues)}/>
            </div>
        </div>

        <div className="form-row">
            <div className="col form-group mb-2">
                <label>Titles</label>
                <Field name={names[0]}
                       component={TextField}/>
            </div>
            <div className="col form-group mb-2">
                <label>Initials</label>
                <Field name={names[1]}
                       component={TextField}/>
            </div>
            <div className="col form-group mb-2">
                <label>Insertions</label>
                <Field name={names[2]}
                       component={TextField}/>
            </div>
            <div className="col form-group mb-2">
                <label>Surname</label>
                <Field name={names[3]}
                       component={TextField}/>
            </div>
        </div>

        <div className="form-row">
            <div className="col form-group mb-2">
                <label>Role</label>
                <Field name={names[5]}
                       choices={roleValues}
                       withEmptyDefault
                       component={DropdownFieldInput}/>
            </div>
            <div className="col">
                <div className="form-group mb-2">
                    <label>Organization</label>
                    <div className="input-group">
                        <Field name={names[6]}
                               component={TextField}/>
                        <RemoveButton onClick={onDelete}
                                      disabled={deleteDisabled}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default asFieldArray(ContributorField)
