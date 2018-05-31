import * as React from "react"
import { ComponentType } from "react"
import { WrappedFieldProps } from "redux-form"

interface FormEntryProps {
    htmlFor: string
    label?: string // TODO what happens when label is undefined?
    withoutLabel?: boolean
}

const asFormEntry = (InnerComponent: ComponentType<FormEntryProps & any>) => (props: WrappedFieldProps & any) => {
    const { htmlFor, label, withoutLabel } = props

    return (
        <>
            {!withoutLabel && <label className="col-12 col-md-3 pl-0 title-label text-array-label"
                                     htmlFor={htmlFor}>{label}</label>}
            <div className={`col-12${withoutLabel ? "" : " col-md-8"} pl-0 pr-0`}>
                <InnerComponent {...props}/>
            </div>
        </>
    )
}

export default asFormEntry
