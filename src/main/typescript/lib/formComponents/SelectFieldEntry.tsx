import * as React from "react"
import { default as SelectField, SelectFieldProps } from "./SelectField"
import FormEntry from "./FormEntry"
import { WrappedFieldProps } from "redux-form"

const SelectFieldEntry = (props: WrappedFieldProps & SelectFieldProps) => (
    <FormEntry htmlFor={props.input.name} label={props.label}>
        <SelectField {...props}/>
    </FormEntry>
)

export default SelectFieldEntry
