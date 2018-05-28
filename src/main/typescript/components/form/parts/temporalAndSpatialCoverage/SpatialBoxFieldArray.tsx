import * as React from "react"
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"
import { FieldArrayProps } from "../../../../lib/formComponents/RepeatableField"
import { SchemedValue } from "../../../../lib/metadata/Value"
import { DropdownList } from "../../../../model/DropdownLists"
import SchemedBoxArrayField from "../../../../lib/formComponents/SchemedBoxArrayField"

const SpatialBoxFieldArray = ({ state, list }: DropdownList) => (props: FieldArrayProps<SchemedValue>) => (
    <LoadDropdownData state={state}>
        <SchemedBoxArrayField {...props} schemeValues={list}/>
    </LoadDropdownData>
)

export default SpatialBoxFieldArray
