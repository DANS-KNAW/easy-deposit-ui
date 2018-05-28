import * as React from "react"
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"
import { FieldArrayProps } from "../../../../lib/formComponents/RepeatableField"
import SelectFieldArray from "../../../../lib/formComponents/SelectFieldArray"
import { SchemedValue } from "../../../../lib/metadata/Value"
import { DropdownList } from "../../../../model/DropdownLists"

const LanguageFieldArray = ({ state, list }: DropdownList) => (props: FieldArrayProps<SchemedValue>) => (
    <LoadDropdownData state={state}>
        <SelectFieldArray {...props} withEmptyDefault choices={list}/>
    </LoadDropdownData>
)

export default LanguageFieldArray
