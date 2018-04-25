import * as React from "react"
import { WrappedFieldProps } from "redux-form"
import { SelectHTMLAttributes } from "react"

interface SelectFieldProps {
    withLabel?: boolean
}

const SelectField = ({ input, meta, label, withLabel, children, className, ...rest }: WrappedFieldProps & SelectHTMLAttributes<HTMLSelectElement> & SelectFieldProps) => (
    <>
        {withLabel && <label className="col-12 col-md-3 pl-0 title-label text-array-label" htmlFor={input.name}>{label}</label>}
        <select className={`form-control ${className}`} {...input} {...rest}>{children}</select>
    </>
)

export default SelectField
