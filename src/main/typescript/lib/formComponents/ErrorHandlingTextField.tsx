import * as React from "react"
import TextField, { TextFieldProps } from "./TextField"

const ErrorHandlingTextField = (props: TextFieldProps) => {
    const { meta } = props
    const changed = (meta as any).changed
    const hasError = meta.error && (changed || meta.submitFailed)

    return (
        <>
            <TextField {...props} className={hasError ? "is-invalid" : ""}/>
            {hasError && <span className="invalid-feedback">{meta.error}</span>}
        </>
    )
}

export default ErrorHandlingTextField
