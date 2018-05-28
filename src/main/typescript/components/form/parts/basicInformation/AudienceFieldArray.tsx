import * as React from "react"
import { connect } from "react-redux"
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"
import { FieldArrayProps } from "../../../../lib/formComponents/RepeatableField"
import SelectFieldArray from "../../../../lib/formComponents/SelectFieldArray"
import { SchemedValue } from "../../../../lib/metadata/Value"
import { AppState } from "../../../../model/AppState"
import { DropdownList } from "../../../../model/DropdownLists"

interface AudienceFieldArrayReduxProperties {
    audiences: DropdownList
}

type AudienceFieldArrayProperties = FieldArrayProps<SchemedValue> & AudienceFieldArrayReduxProperties

const AudienceFieldArray = ({ audiences: { state, list }, ...rest }: AudienceFieldArrayProperties) => (
    <LoadDropdownData state={state}>
        <SelectFieldArray {...rest} withEmptyDefault choices={list}/>
    </LoadDropdownData>
)

const mapStateToProps = (state: AppState) => ({
    audiences: state.dropDowns.audiences,
})

export default connect(mapStateToProps)(AudienceFieldArray)
