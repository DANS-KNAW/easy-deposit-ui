import * as React from "react"
import { connect } from "react-redux"
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"
import { FieldArrayProps } from "../../../../lib/formComponents/RepeatableField"
import SchemedTextFieldArray from "../../../../lib/formComponents/SchemedTextFieldArray"
import { SchemedValue } from "../../../../lib/metadata/Value"
import { AppState } from "../../../../model/AppState"
import { DropdownList } from "../../../../model/DropdownLists"

interface IdentifierFieldArrayReduxProps {
    identifiers: DropdownList
}

type IdentifierFieldArrayProps = FieldArrayProps<SchemedValue> & IdentifierFieldArrayReduxProps

const IdentifierFieldArray = ({ identifiers: { state, list }, ...rest }: IdentifierFieldArrayProps) => (
    <LoadDropdownData state={state}>
        <SchemedTextFieldArray {...rest} withEmptyDefault schemeValues={list}/>
    </LoadDropdownData>
)

const mapStateToProps = (state: AppState) => ({
    identifiers: state.dropDowns.identifiers,
})

export default connect(mapStateToProps)(IdentifierFieldArray)
