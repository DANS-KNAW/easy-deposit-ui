import * as React from "react"
import TextField from "./TextField"
import { Field } from "redux-form"
import RemoveButton from "./RemoveButton"

interface TextFieldArrayElementProps {
    name: string
    label: string
    onDelete: () => void
    deleteDisabled: boolean
}

const TextFieldArrayElement = ({ name, label, onDelete, deleteDisabled }: TextFieldArrayElementProps) => (
    <div className="input-group mb-2 mr-2">
        <Field name={name}
               label={label}
               placeholder={label}
               component={TextField}/>
        <RemoveButton onClick={onDelete}
                      disabled={deleteDisabled}/>
    </div>
)

export default TextFieldArrayElement
