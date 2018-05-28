import * as React from "react"
import { DropdownList } from "../../../../model/DropdownLists"
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"
import SelectField from "../../../../lib/formComponents/SelectField"
import { WrappedFieldProps } from "redux-form"
import { SelectHTMLAttributes } from "react"

interface LanguageFieldInputProps {
    withLabel?: boolean
    withEmptyDefault?: boolean
}

type LanguageFieldProps = WrappedFieldProps & SelectHTMLAttributes<HTMLSelectElement> & LanguageFieldInputProps

const LanguageField = ({ state, list }: DropdownList) => (props: LanguageFieldProps) => (
    <LoadDropdownData state={state}>
        <SelectField {...props} choices={list}/>
    </LoadDropdownData>
)

export default LanguageField
