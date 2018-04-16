import * as React from "react"
import { FieldArrayProps } from "./RepeatableField"
import TextField from "./TextField"
import {Field} from "redux-form"

function TextFieldArray<T>({ fields, meta, label, empty, fieldName }: FieldArrayProps<T>) {
    return (
        <>
            <label className="col-12 col-md-3 pl-0 title-label">{label}</label>
            <div className="col-12 col-md-8 pl-0 pr-0 text-array">
                {fields.map((name, index, fields) => {
                    return (
                        <div key={name} className="input-group mb-2 mr-2">
                            <Field name={fieldName(name)}
                                   label={label}
                                   className="form-control"
                                   placeholder={label}
                                   component={TextField}/>
                            <div className="input-group-append">
                                <button type="button"
                                        className="input-group-text bg-danger text-light remove-button"
                                        onClick={() => fields.remove(index)}
                                        disabled={fields.length <= 1}>
                                    <i className="fas fa-minus-square"/>
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="col-12 col-md-1 mb-2 pl-0 pr-0 add-button">
                <button type="button"
                        className="input-group-text bg-success text-light"
                        onClick={() => fields.push(empty)}>
                    <i className="fas fa-plus-square"/>
                </button>
            </div>
        </>
    )
}

export default TextFieldArray
