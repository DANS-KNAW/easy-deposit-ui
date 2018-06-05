import * as React from "react"
import { DropdownList } from "../../../../model/DropdownLists"
import { FieldArrayProps } from "../../../../lib/formComponents/RepeatableField"
import { Contributor } from "../../../../lib/metadata/Contributor"
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"
import ContributorFieldArray from "../../../../lib/formComponents/ContributorFieldArray"

const ContributorFields = (ids: DropdownList, roles: DropdownList) => (props: FieldArrayProps<Contributor>) => (
    <LoadDropdownData state={ids.state}>
        <LoadDropdownData state={roles.state}>
            <ContributorFieldArray {...props} idValues={ids.list} roleValues={roles.list}/>
        </LoadDropdownData>
    </LoadDropdownData>
)

export default ContributorFields
