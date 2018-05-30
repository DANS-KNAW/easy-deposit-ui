import * as React from "react"
import FormEntry from "./FormEntry"
import TextArea, { TextAreaProps } from "./TextArea"
import { WrappedFieldProps } from "redux-form"

const TextAreaEntry = (props: WrappedFieldProps & TextAreaProps) => (
    <FormEntry htmlFor={props.input.name} label={props.label}>
        <TextArea {...props}/>
    </FormEntry>
)

export default TextAreaEntry
