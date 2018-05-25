import * as React from "react"
import { connect } from "react-redux"
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"
import { FieldArrayProps } from "../../../../lib/formComponents/RepeatableField"
import SchemedTextFieldArray from "../../../../lib/formComponents/SchemedTextFieldArray"
import { SchemedValue } from "../../../../lib/metadata/Value"
import { AppState } from "../../../../model/AppState"
import { DropdownList } from "../../../../model/DropdownLists"

interface DateFieldArrayReduxProps {
    dates: DropdownList
}

type DateFieldArrayProps = FieldArrayProps<SchemedValue> & DateFieldArrayReduxProps

const DateFieldArray = ({ dates: { state, list }, ...rest }: DateFieldArrayProps) => (
    <LoadDropdownData state={state}>
        <SchemedTextFieldArray {...rest} schemeValues={
            list.map(entry => ({
                key: entry.key,
                value: entry.displayValue,
            }))
        }/>
    </LoadDropdownData>
)

const mapStateToProps = (state: AppState) => ({
    dates: state.dropDowns.dates,
})

export default connect(mapStateToProps)(DateFieldArray)
