import * as React from "react"
import { TextareaHTMLAttributes } from "react"
import { WrappedFieldProps } from "redux-form"
import FormEntry from "./FormEntry"
import TextArea, { TextAreaProps } from "./TextArea"

const TextAreaEntry = (props: WrappedFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement> & TextAreaProps) => (
    <FormEntry htmlFor={props.input.name} label={props.label}>
        <TextArea {...props}/>
    </FormEntry>
)

export default TextAreaEntry
