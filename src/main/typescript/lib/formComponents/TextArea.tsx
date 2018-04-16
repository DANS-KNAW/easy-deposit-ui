import * as React from "react"
import { TextareaHTMLAttributes } from "react"
import { WrappedFieldProps } from "redux-form"

const TextArea = ({ input, meta, label, ...rest }: WrappedFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <>
        <label className="col-12 col-md-3 pl-0 title-label" htmlFor={input.name}>{label}</label>
        <textarea className="form-control col-12 col-md-9" id={input.name} {...input} {...rest}/>
    </>
)

export default TextArea
