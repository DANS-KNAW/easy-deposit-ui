import * as React from "react"
import SelectField from "./SelectField"
import {Field} from "redux-form"
import RemoveButton from "./RemoveButton"
import { SelectFieldArrayProps } from "./SelectFieldArray"

interface SelectFieldArrayElementProps {
    name: string
    label: string
    onDelete: () => void
    deleteDisabled: boolean
}

const SelectFieldArrayElement = ({ name, label, onDelete, deleteDisabled, choices, withEmptyDefault }: SelectFieldArrayElementProps & SelectFieldArrayProps) => (
    <div className="input-group mb-2 mr-2">
        <Field name={name}
               label={label}
               className="custom-select"
               choices={choices}
               withEmptyDefault={withEmptyDefault}
               component={SelectField}/>
        <RemoveButton onClick={onDelete}
                      disabled={deleteDisabled}/>
    </div>
)

export default SelectFieldArrayElement
