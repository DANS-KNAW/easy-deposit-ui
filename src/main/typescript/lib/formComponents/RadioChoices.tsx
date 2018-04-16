import * as React from "react"
import { WrappedFieldProps } from "redux-form"
import { PrivacySensitiveDataValue } from "../../model/FormData"

interface RadioChoice {
    title: PrivacySensitiveDataValue
    value: string
}

interface RadioProps {
    choices: RadioChoice[]
}

const RadioChoices = ({ input, meta, choices }: WrappedFieldProps & RadioProps) => {
    const changed = (meta as any).changed
    const hasError = meta.error && (changed || meta.submitFailed)

    return (
        <>
            {hasError && <span className="validation-error">{meta.error}</span>}
            {choices.map(({ title, value }) =>
                <div className="form-check col-12" key={title}> {/* TODO unique key */}
                    {/*
                      * Note to future developers: the order of the attributes in <input> is important!
                      * {...input} must come before value={title} and neither of them may be omitted.
                      */}
                    <input className="form-check-input" id={title} type="radio"
                           {...input} value={title} defaultChecked={input.value == title}/>
                    <label className="form-check-label" htmlFor={title}>{value}</label>
                </div>,
            )}
        </>
    )
}

export default RadioChoices
