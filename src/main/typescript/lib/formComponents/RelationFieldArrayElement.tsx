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
            <div className="col col-md-4 mb-1">
                <Field name={names[0]}
                       label="Qualifier"
                       choices={schemeValues}
                       withEmptyDefault
                       component={DropdownFieldInput}/>
            </div>
            <div className="col col-md-8 input-group mb-1">
                <Field name={names[1]}
                       label="Title"
                       placeholder="Title"
                       labelWidth={44}
                       component={LabeledTextField}/>
            </div>
        </div>

        <div className="form-row">
            <div className="col col-md-4 mb-2"/>
            <div className="col col-md-8 input-group mb-2">
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
