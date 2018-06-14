import * as React from "react"
import asFieldArray, { InnerComponentProps } from "./FieldArrayHOC"
import TextField from "./TextField"
import { Field } from "redux-form"
import RemoveButton from "./RemoveButton"
import { DatePickerInput } from "./DatePickerField"

interface SchemedDatePickerArrayProps extends InnerComponentProps {
    label: string
}

const SchemedDatePickerArray = ({ names, label, onDelete, deleteDisabled }: SchemedDatePickerArrayProps) => (
    <div className="form-row">
        <div className="col col-md-4">
            <Field name={names[0]}
                   label="Scheme"
                   component={TextField}/>
        </div>
        <div className="col col-md-8">
            <div className="input-group mb-2 mr-2">
                <Field name={names[1]}
                       label="Value"
                       placeholder={label}
                       component={DatePickerInput}/>
                <RemoveButton onClick={onDelete}
                              disabled={deleteDisabled}/>
            </div>
        </div>
    </div>
)

export default asFieldArray(SchemedDatePickerArray)
