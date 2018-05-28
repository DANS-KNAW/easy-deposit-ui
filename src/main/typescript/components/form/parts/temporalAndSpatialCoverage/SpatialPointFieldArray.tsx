import * as React from "react"
import { connect } from "react-redux"
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"
import { FieldArrayProps } from "../../../../lib/formComponents/RepeatableField"
import { SchemedValue } from "../../../../lib/metadata/Value"
import { AppState } from "../../../../model/AppState"
import { DropdownList } from "../../../../model/DropdownLists"
import SchemedPointArrayField from "../../../../lib/formComponents/SchemedPointArrayField"

interface SpatialPointFieldArrayReduxProperties {
    spatialCoordinates: DropdownList
}

type SpatialPointFieldArrayProperties = FieldArrayProps<SchemedValue> & SpatialPointFieldArrayReduxProperties

const SpatialPointFieldArray = ({ spatialCoordinates: { state, list }, ...rest }: SpatialPointFieldArrayProperties) => (
    <LoadDropdownData state={state}>
        <SchemedPointArrayField {...rest} schemeValues={list}/>
    </LoadDropdownData>
)

const mapStateToProps = (state: AppState) => ({
    spatialCoordinates: state.dropDowns.spatialCoordinates,
})

export default connect(mapStateToProps)(SpatialPointFieldArray)
