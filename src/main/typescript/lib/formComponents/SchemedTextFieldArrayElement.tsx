import * as React from "react"
import SelectField from "./SelectField"
import TextField from "./TextField"
import {Field} from "redux-form"
import RemoveButton from "./RemoveButton"
import { SchemedTextFieldArrayProps } from "./SchemedTextFieldArray"

interface SchemedTextFieldArrayElementProps {
    name: string[]
    label: string
    onDelete: () => void
    deleteDisabled: boolean
}

const SchemedTextFieldArrayElement = ({name, label, onDelete, deleteDisabled, schemeValues, withEmptyDefault}: SchemedTextFieldArrayElementProps & SchemedTextFieldArrayProps) => (
    <div className="form-row">
        <div className="col col-md-4">
            <Field name={name[0]}
                   label="Scheme"
                   choices={schemeValues}
                   withEmptyDefault={withEmptyDefault}
                   component={SelectField}/>
        </div>
        <div className="col col-md-8">
            <div className="input-group mb-2 mr-2">
                <Field name={name[1]}
                       label="Value"
                       placeholder={label}
                       component={TextField}/>
                <RemoveButton onClick={onDelete}
                              disabled={deleteDisabled}/>
            </div>
        </div>
    </div>
)

export default SchemedTextFieldArrayElement
