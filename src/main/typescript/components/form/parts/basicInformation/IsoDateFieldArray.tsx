import * as React from "react"
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"
import { FieldArrayProps } from "../../../../lib/formComponents/RepeatableField"
import SchemedDatePickerArray from "../../../../lib/formComponents/SchemedDatePickerArray"
import { DropdownList } from "../../../../model/DropdownLists"
import { QualifiedDate } from "../../../../lib/metadata/Date"

const IsoDateFieldArray = ({ state, list }: DropdownList) => (props: FieldArrayProps<QualifiedDate<Date>>) => (
    <LoadDropdownData state={state}>
        <SchemedDatePickerArray {...props} schemeValues={list}/>
    </LoadDropdownData>
)

export default IsoDateFieldArray
