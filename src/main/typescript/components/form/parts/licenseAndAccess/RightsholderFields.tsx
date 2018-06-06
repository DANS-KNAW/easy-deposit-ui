import * as React from "react"
import { DropdownList } from "../../../../model/DropdownLists"
import { FieldArrayProps } from "../../../../lib/formComponents/RepeatableField"
import { Contributor } from "../../../../lib/metadata/Contributor"
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"
import ContributorFieldArray from "../../../../lib/formComponents/ContributorFieldArray"

const RightsholderFields = (ids: DropdownList) => (props: FieldArrayProps<Contributor>) => (
    <LoadDropdownData state={ids.state}>
        <ContributorFieldArray {...props} idValues={ids.list}/>
    </LoadDropdownData>
)

export default RightsholderFields
