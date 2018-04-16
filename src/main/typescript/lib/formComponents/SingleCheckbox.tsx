import * as React from "react"
import { Component } from "react"
import { WrappedFieldProps } from "redux-form"

const SingleCheckbox = ({ input, meta, label }: WrappedFieldProps & { foo?: number }) => {
    const changed = (meta as any).changed
    const hasError = meta.error && (changed || meta.submitFailed)

    return (
        <>
            {hasError && <span className="validation-error">{meta.error}</span>}
            <div className="form-check col-12">
                <input className="form-check-input" id={input.name} type="checkbox"
                       {...input} defaultChecked={input.value}/>
                <label className="form-check-label" htmlFor={input.name}>{label}</label>
            </div>
        </>
    )
}

export default SingleCheckbox
