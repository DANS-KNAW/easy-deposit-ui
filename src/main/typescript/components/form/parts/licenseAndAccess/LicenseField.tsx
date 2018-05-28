import * as React from "react"
import { DropdownList } from "../../../../model/DropdownLists"
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"
import SelectField from "../../../../lib/formComponents/SelectField"
import { WrappedFieldProps } from "redux-form"
import { SelectHTMLAttributes } from "react"

interface LicenseFieldInputProps {
    withLabel?: boolean
    withEmptyDefault?: boolean
}

type LicenseFieldProps = WrappedFieldProps & SelectHTMLAttributes<HTMLSelectElement> & LicenseFieldInputProps

const LicenseField = ({ state, list }: DropdownList) => (props: LicenseFieldProps) => (
    <LoadDropdownData state={state}>
        <SelectField {...props} choices={list}/>
    </LoadDropdownData>
)

export default LicenseField
