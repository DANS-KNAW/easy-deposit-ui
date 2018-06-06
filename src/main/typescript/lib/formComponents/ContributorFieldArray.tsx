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
                            <div className="form-group col-md-3 mb-2">
                                <label>Scheme</label>
                                <Field name={fieldNames[0](name)}
                                       choices={idValues}
                                       withEmptyDefault
                                       component={DropdownFieldInput}/>
                            </div>

                            <div className="form-group col-md-9 mb-2">
                                <label>ID</label>
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

interface FirstRowProps {
    titleName: string
    initialsName: string
    insertionsName: string
    surnameName: string
}

const FirstRow = ({ titleName, initialsName, insertionsName, surnameName }: FirstRowProps) => (
    <>
        <div className="form-group col-md-3 mb-2">
            <label>Titles</label>
            <Field name={titleName}
                   placeholder="(acadamic) title(s)"
                   component={TextField}/>
        </div>
        <div className="form-group col-md-3 mb-2">
            <label>Initials</label>
            <Field name={initialsName}
                   placeholder="initials"
                   component={TextField}/>
        </div>
        <div className="form-group col-md-3 mb-2">
            <label>Insertions</label>
            <Field name={insertionsName}
                   placeholder="insertions"
                   component={TextField}/>
        </div>
        <div className="form-group col-md-3 mb-2">
            <label>Surname</label>
            <Field name={surnameName}
                   placeholder="surname"
                   component={TextField}/>
        </div>
    </>
)

interface OrganizationProps {
    organizationName: string
    onDelete: () => void
    deleteDisabled: boolean
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

interface SecondRowWithRoleProps {
    roleName: string
    roleValues: DropdownListEntry[]
    organizationName: string
    onDelete: () => void
    deleteDisabled: boolean
}

const SecondRowWithRole = ({ roleName, roleValues, organizationName, onDelete, deleteDisabled }: SecondRowWithRoleProps) => (
    <>
        <div className="form-group col-md-4 mb-2">
            <label>Role</label>
            <Field name={roleName}
                   choices={roleValues || []}
                   withEmptyDefault
                   emptyDefault="-no role-"
                   component={DropdownFieldInput}/>
        </div>
        <div className="form-group col-md-8 mb-2">
            <Organization organizationName={organizationName}
                          onDelete={onDelete}
                          deleteDisabled={deleteDisabled}/>
        </div>
    </>
)

interface ContributorFieldProps extends InnerComponentProps {
    idValues: DropdownListEntry[]
    roleValues?: DropdownListEntry[]
}

const ContributorField = ({ names, onDelete, deleteDisabled, idValues, roleValues }: ContributorFieldProps) => (
    <div className="contributor mb-3">
        <ContributorIdRows idName={names[4]}
                           idValues={idValues}/>

        <div className="form-row">
            <FirstRow titleName={names[0]}
                      initialsName={names[1]}
                      insertionsName={names[2]}
                      surnameName={names[3]}/>
        </div>

        <div className="form-row">
            {roleValues
                ? <SecondRowWithRole roleName={names[5]}
                                     roleValues={roleValues}
                                     organizationName={names[6]}
                                     onDelete={onDelete}
                                     deleteDisabled={deleteDisabled}/>
                : <div className="form-group col-md-12 mb-2">
                    <Organization organizationName={names[6]}
                                  onDelete={onDelete}
                                  deleteDisabled={deleteDisabled}/>
                </div>}
        </div>
    </div>
)

export default asFieldArray(ContributorField)
