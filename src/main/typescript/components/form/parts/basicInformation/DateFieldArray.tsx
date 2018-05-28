import * as React from "react"
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"
import { FieldArrayProps } from "../../../../lib/formComponents/RepeatableField"
import SchemedTextFieldArray from "../../../../lib/formComponents/SchemedTextFieldArray"
import { SchemedValue } from "../../../../lib/metadata/Value"
import { DropdownList } from "../../../../model/DropdownLists"

const DateFieldArray = ({ state, list }: DropdownList) => (props: FieldArrayProps<SchemedValue>) => (
    <LoadDropdownData state={state}>
        <SchemedTextFieldArray {...props} schemeValues={list}/>
    </LoadDropdownData>
)

export default DateFieldArray
