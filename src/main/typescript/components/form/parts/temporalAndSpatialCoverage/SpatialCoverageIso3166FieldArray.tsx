import * as React from "react"
import { connect } from "react-redux"
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"
import { FieldArrayProps } from "../../../../lib/formComponents/RepeatableField"
import SelectFieldArray from "../../../../lib/formComponents/SelectFieldArray"
import { SchemedValue } from "../../../../lib/metadata/Value"
import { AppState } from "../../../../model/AppState"
import { DropdownList } from "../../../../model/DropdownLists"

interface SpatialCoverageIso3166FieldArrayReduxProperties {
    spatialCoveragesIso: DropdownList
}

type SpatialCoverageIso3166FieldArrayProperties = FieldArrayProps<SchemedValue> & SpatialCoverageIso3166FieldArrayReduxProperties

const SpatialCoverageIso3166FieldArray = ({ spatialCoveragesIso: { state, list }, ...rest }: SpatialCoverageIso3166FieldArrayProperties) => (
    <LoadDropdownData state={state}>
        {/*
          * values taken from https://nl.wikipedia.org/wiki/ISO_3166-1
          * use values ISO-3166-1 alpha-3
          */}
        <SelectFieldArray {...rest} withEmptyDefault choices={list}/>
    </LoadDropdownData>
)

const mapStateToProps = (state: AppState) => ({
    spatialCoveragesIso: state.dropDowns.spatialCoveragesIso,
})

export default connect(mapStateToProps)(SpatialCoverageIso3166FieldArray)
