import * as React from "react"
import { Field } from "redux-form"
import { FieldArrayProps } from "./RepeatableField"
import TextField from "./TextField"
import SelectField from "./SelectField"

interface SchemedTextFieldProps {
    schemeValues: { key: string, value: string }[]
}

function SchemedTextFieldArray<T>({ fields, meta, label, empty, fieldNames, schemeValues }: FieldArrayProps<T> & SchemedTextFieldProps) {
    return (
        <>
            <label className="col-12 col-md-3 pl-0 title-label">{label}</label>
            <div className="col-12 col-md-8 pl-0 pr-0 text-array">

                <div className="form-row">
                    <div className="col">
                        <label htmlFor="spatialCoverageISO3166Scheme">Scheme</label>
                    </div>
                    <div className="col">
                        <label htmlFor="spatialCoverageISO3166Value">Value</label>
                    </div>
                </div>

                {fields.map((name, index, fields) => {
                    return (
                        <div key={name} className="form-row">
                            <div className="col">
                                <Field id="spatialCoverageISO3166Scheme"
                                       name={fieldNames[0](name)}
                                       label="Scheme"
                                       component={SelectField}>
                                    <option>Choose...</option>
                                    {schemeValues.map((value, index) => (
                                        <option key={`${value.key}${index}`} value={value.key}>{value.value}</option>
                                    ))}
                                </Field>
                            </div>
                            <div className="col">
                                <div className="input-group mb-2 mr-2" style={{ marginTop: "4px" }}>
                                    <Field id="spatialCoverageISO3166Value"
                                           name={fieldNames[1](name)}
                                           label="Value"
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

export default SchemedTextFieldArray
