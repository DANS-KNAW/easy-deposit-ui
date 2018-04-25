import * as React from "react"
import { WrappedFieldProps } from "redux-form"
import { SelectHTMLAttributes } from "react"

const SelectField = ({ input, meta, label, children, className, ...rest }: WrappedFieldProps & SelectHTMLAttributes<HTMLSelectElement>) => (
    <select className={`form-control ${className}`} {...input} {...rest}>{children}</select>
)

export default SelectField
