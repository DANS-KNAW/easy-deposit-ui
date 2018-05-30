import * as React from "react"
import TextField, { TextFieldProps } from "./TextField"

const LabeledTextField = ({label, ...rest}: TextFieldProps) => (
    <>
        <div className="input-group-prepend">
            <span className="input-group-text">{label}</span>
        </div>
        <TextField {...rest}/>
    </>
)

export default LabeledTextField
