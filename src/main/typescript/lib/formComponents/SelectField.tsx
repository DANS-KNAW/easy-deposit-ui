import * as React from "react"
import { WrappedFieldProps } from "redux-form"
import { SelectHTMLAttributes } from "react"

const SelectField = ({ input, meta, label, children, ...rest }: WrappedFieldProps & SelectHTMLAttributes<HTMLSelectElement>) => (
    <select className="form-control" {...input} {...rest}>{children}</select>
)

export default SelectField
