import * as React from "react"
import { InputHTMLAttributes } from "react"
import { WrappedFieldProps } from "redux-form"

const TextField = ({ input, meta, label, ...rest }: WrappedFieldProps & InputHTMLAttributes<HTMLInputElement>) => (
    <input type="text" className="form-control" {...input} {...rest}/>
)

export default TextField
