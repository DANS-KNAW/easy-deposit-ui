import * as React from "react"
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"
import { FieldArrayProps } from "../../../../lib/formComponents/RepeatableField"
import { SchemedValue } from "../../../../lib/metadata/Value"
import { DropdownList } from "../../../../model/DropdownLists"
import SchemedPointArrayField from "../../../../lib/formComponents/SchemedPointArrayField"

const SpatialPointFieldArray = ({ state, list }: DropdownList) => (props: FieldArrayProps<SchemedValue>) => (
    <LoadDropdownData state={state}>
        <SchemedPointArrayField {...props} schemeValues={list}/>
    </LoadDropdownData>
)

export default SpatialPointFieldArray
