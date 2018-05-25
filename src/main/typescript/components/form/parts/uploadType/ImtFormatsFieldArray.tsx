import * as React from "react"
import { connect } from "react-redux"
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"
import { FieldArrayProps } from "../../../../lib/formComponents/RepeatableField"
import SelectFieldArray from "../../../../lib/formComponents/SelectFieldArray"
import { SchemedValue } from "../../../../lib/metadata/Value"
import { AppState } from "../../../../model/AppState"
import { DropdownList } from "../../../../model/DropdownLists"

interface ImtFormatsFieldArrayReduxProperties {
    imtFormats: DropdownList
}

type ImtFormatsFieldArrayProperties = FieldArrayProps<SchemedValue> & ImtFormatsFieldArrayReduxProperties

const ImtFormatsFieldArray = ({ imtFormats: { state, list }, ...rest }: ImtFormatsFieldArrayProperties) => (
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
    imtFormats: state.dropDowns.imtFormats,
})

export default connect(mapStateToProps)(ImtFormatsFieldArray)
