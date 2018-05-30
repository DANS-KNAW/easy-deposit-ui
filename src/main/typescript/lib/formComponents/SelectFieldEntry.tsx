import * as React from "react"
import { default as SelectField, SelectFieldProps } from "./SelectField"
import { WrappedFieldProps } from "redux-form"
import { SelectHTMLAttributes } from "react"
import FormEntry from "./FormEntry"

const SelectFieldEntry = (props: WrappedFieldProps & SelectHTMLAttributes<HTMLSelectElement> & SelectFieldProps) => (
    <FormEntry htmlFor={props.input.name} label={props.label}>
        <SelectField {...props}/>
    </FormEntry>
)

export default SelectFieldEntry
