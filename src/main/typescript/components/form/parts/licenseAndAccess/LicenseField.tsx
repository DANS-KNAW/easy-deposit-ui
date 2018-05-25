import * as React from "react"
import { DropdownList } from "../../../../model/DropdownLists"
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"
import { AppState } from "../../../../model/AppState"
import { connect } from "react-redux"
import SelectField, { SelectFieldProps } from "../../../../lib/formComponents/SelectField"
import { WrappedFieldProps } from "redux-form"
import { SelectHTMLAttributes } from "react"
import { Dispatch } from "../../../../lib/redux"

interface LicenseFieldReduxProps {
    licenses: DropdownList
}
type HideReduxDispatch = { dispatch: Dispatch }

type LicenseFieldProps = WrappedFieldProps & SelectHTMLAttributes<HTMLSelectElement> & SelectFieldProps

const LicenseField = ({ licenses: { state, list }, dispatch, ...rest }: LicenseFieldProps & LicenseFieldReduxProps & HideReduxDispatch) => (
    <LoadDropdownData state={state}>
        <SelectField {...rest}>
            {list.map((value, index) => <option key={`${value.key}${index}`} value={value.key}>{value.displayValue}</option>)}
        </SelectField>
    </LoadDropdownData>
)

const mapStateToProps = (state: AppState) => ({
    licenses: state.dropDowns.licenses,
})

const WrappedLicenseField = connect(mapStateToProps)(LicenseField)

const LicenseFieldWrapper = (props: LicenseFieldProps) => <WrappedLicenseField {...props}/>

export default LicenseFieldWrapper
