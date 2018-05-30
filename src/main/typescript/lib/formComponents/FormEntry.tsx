import * as React from "react"
import { SFC } from "react"

interface FormEntryProps {
    htmlFor: string
    label?: string // TODO what happens when label is undefined?
    withoutLabel?: boolean
}

const FormEntry: SFC<FormEntryProps> = ({htmlFor, label, withoutLabel, children}) => (
    <>
        {!withoutLabel && <label className="col-12 col-md-3 pl-0 title-label text-array-label"
                                 htmlFor={htmlFor}>{label}</label>}
        <div className={`col-12${withoutLabel ? "" : " col-md-8"} pl-0 pr-0`}>
            {children}
        </div>
    </>
)

export default FormEntry
