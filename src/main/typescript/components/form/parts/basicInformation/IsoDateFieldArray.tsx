import * as React from "react"
import SchemedDatePickerArray from "../../../../lib/formComponents/SchemedDatePickerArray"
import { FieldArrayProps } from "../../../../lib/formComponents/RepeatableField"
import { QualifiedDate } from "../../../../lib/metadata/Date"

const IsoDateFieldArray = (props: FieldArrayProps<QualifiedDate<Date>>) => (
    // TODO dropdown fetch/list
    <SchemedDatePickerArray {...props}/>
)

export default IsoDateFieldArray
