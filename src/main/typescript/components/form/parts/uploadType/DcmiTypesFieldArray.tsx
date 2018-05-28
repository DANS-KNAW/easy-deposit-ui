import * as React from "react"
import { connect } from "react-redux"
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"
import { FieldArrayProps } from "../../../../lib/formComponents/RepeatableField"
import SelectFieldArray from "../../../../lib/formComponents/SelectFieldArray"
import { SchemedValue } from "../../../../lib/metadata/Value"
import { AppState } from "../../../../model/AppState"
import { DropdownList } from "../../../../model/DropdownLists"

interface DcmiTypesFieldArrayReduxProperties {
    dcmiTypes: DropdownList
}

type DcmiTypesFieldArrayProperties = FieldArrayProps<SchemedValue> & DcmiTypesFieldArrayReduxProperties

const DcmiTypesFieldArray = ({ dcmiTypes: { state, list }, ...rest }: DcmiTypesFieldArrayProperties) => (
    <LoadDropdownData state={state}>
        <SelectFieldArray {...rest} withEmptyDefault choices={list}/>
    </LoadDropdownData>
)

const mapStateToProps = (state: AppState) => ({
    dcmiTypes: state.dropDowns.dcmiTypes,
})

export default connect(mapStateToProps)(DcmiTypesFieldArray)
