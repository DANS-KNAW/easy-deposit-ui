import * as React from "react"
import { FieldArrayProps } from "../../../../lib/formComponents/RepeatableField"
import { Relation } from "../../../../lib/metadata/Relation"
import { DropdownList } from "../../../../model/DropdownLists"
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"
import RelationFieldArrayElement from "../../../../lib/formComponents/RelationFieldArrayElement"

const RelationFieldArray = ({ state, list }: DropdownList) => (props: FieldArrayProps<Relation>) => (
    <LoadDropdownData state={state}>
        <RelationFieldArrayElement {...props} schemeValues={list}/>
    </LoadDropdownData>
)

export default RelationFieldArray
