import * as React from "react"
import { FieldArrayProps } from "../../../../lib/formComponents/RepeatableField"
import { Relation } from "../../../../lib/metadata/Relation"
import { DropdownList } from "../../../../model/DropdownLists"
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"

const RelationFieldArray = ({ state, list }: DropdownList) => (props: FieldArrayProps<Relation>) => (
    <LoadDropdownData state={state}>
        <h1>RelationFieldArray</h1>
    </LoadDropdownData>
)

export default RelationFieldArray
