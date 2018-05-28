import * as React from "react"
import { DropdownList } from "../../../../model/DropdownLists"
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"
import { AppState } from "../../../../model/AppState"
import { connect } from "react-redux"
import SelectField from "../../../../lib/formComponents/SelectField"
import { WrappedFieldProps } from "redux-form"
import { SelectHTMLAttributes } from "react"
import { Dispatch } from "../../../../lib/redux"

interface LicenseFieldReduxProps {
    licenses: DropdownList
}

interface LicenseFieldInputProps {
    withLabel?: boolean
    withEmptyDefault?: boolean
}

type HideReduxDispatch = { dispatch: Dispatch }

type LicenseFieldProps = WrappedFieldProps & SelectHTMLAttributes<HTMLSelectElement> & LicenseFieldInputProps

const LicenseField = ({ licenses: { state, list }, dispatch, ...rest }: LicenseFieldProps & LicenseFieldReduxProps & HideReduxDispatch) => (
    <LoadDropdownData state={state}>
        <SelectField {...rest} choices={list}/>
    </LoadDropdownData>
)

const mapStateToProps = (state: AppState) => ({
    licenses: state.dropDowns.licenses,
})

const WrappedLicenseField = connect(mapStateToProps)(LicenseField)

const LicenseFieldWrapper = (props: LicenseFieldProps) => <WrappedLicenseField {...props}/>

export default LicenseFieldWrapper
