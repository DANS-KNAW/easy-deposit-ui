import * as React from "react"
import { connect } from "react-redux"
import { fetchAudienceData } from "../../../../actions/dropdownActions"
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"
import { FieldArrayProps } from "../../../../lib/formComponents/RepeatableField"
import SelectFieldArray from "../../../../lib/formComponents/SelectFieldArray"
import { SchemedValue } from "../../../../lib/metadata/Value"
import { ReduxAction } from "../../../../lib/redux"
import { AppState } from "../../../../model/AppState"
import { DropdownList, DropdownListEntry } from "../../../../model/DropdownLists"

interface AudienceFieldArrayReduxProperties {
    audiences: DropdownList
}

type AudienceFieldArrayProperties = FieldArrayProps<SchemedValue> & AudienceFieldArrayReduxProperties

const AudienceFieldArray = ({ audiences: { state, list }, ...rest }: AudienceFieldArrayProperties) => (
    <LoadDropdownData state={state}>
        <SelectFieldArray {...rest} withEmptyDefault choices={
            list.map(entry => ({
                key: entry.key,
                value: entry.displayValue,
            }))
        }/>
    </LoadDropdownData>
)

const mapStateToProps = (state: AppState) => ({
    audiences: state.dropDowns.audiences,
})

export default connect(mapStateToProps)(AudienceFieldArray)
