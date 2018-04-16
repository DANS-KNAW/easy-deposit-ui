import * as React from "react"
import { WrappedFieldArrayProps, WrappedFieldProps } from "redux-form"

interface DoiFieldProps {
    fetchDoi: () => void
    fetchingDoi: boolean
}

const DoiField = ({ input, meta, label }: WrappedFieldProps & DoiFieldProps) => (
    <>
        <label className="col-12 col-md-3 pl-0 title-label" htmlFor={input.name}>{label}</label>
        {input.value
            ? <label className="col-12 col-md-9 value-label" id={input.name}>{input.value}</label>
            : <button type="button"
                      className="btn btn-primary mb-0 mt-0 value-button"
                      onClick={this.fetchDoi}
                      disabled={this.fetchingDoi}>Reserve DOI</button>}
    </>
)

export default DoiField
