import * as React from "react"
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"
import { FieldArrayProps } from "../../../../lib/formComponents/RepeatableField"
import SchemedTextFieldArray from "../../../../lib/formComponents/SchemedTextFieldArray"
import { SchemedValue } from "../../../../lib/metadata/Value"
import { DropdownList } from "../../../../model/DropdownLists"

const IdentifierFieldArray = ({ state, list }: DropdownList) => (props: FieldArrayProps<SchemedValue>) => (
    <LoadDropdownData state={state}>
        <SchemedTextFieldArray {...props} withEmptyDefault schemeValues={list}/>
    </LoadDropdownData>
)

export default IdentifierFieldArray
