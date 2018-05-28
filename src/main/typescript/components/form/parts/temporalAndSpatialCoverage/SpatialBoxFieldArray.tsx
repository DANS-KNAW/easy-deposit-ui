import * as React from "react"
import { connect } from "react-redux"
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"
import { FieldArrayProps } from "../../../../lib/formComponents/RepeatableField"
import { SchemedValue } from "../../../../lib/metadata/Value"
import { AppState } from "../../../../model/AppState"
import { DropdownList } from "../../../../model/DropdownLists"
import SchemedBoxArrayField from "../../../../lib/formComponents/SchemedBoxArrayField"

interface SpatialBoxFieldArrayReduxProperties {
    spatialCoordinates: DropdownList
}

type SpatialBoxFieldArrayProperties = FieldArrayProps<SchemedValue> & SpatialBoxFieldArrayReduxProperties

const SpatialBoxFieldArray = ({ spatialCoordinates: { state, list }, ...rest }: SpatialBoxFieldArrayProperties) => (
    <LoadDropdownData state={state}>
        <SchemedBoxArrayField {...rest} schemeValues={list}/>
    </LoadDropdownData>
)

const mapStateToProps = (state: AppState) => ({
    spatialCoordinates: state.dropDowns.spatialCoordinates,
})

export default connect(mapStateToProps)(SpatialBoxFieldArray)
