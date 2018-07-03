import * as React from "react"
import { SFC } from "react"
import { Field, WrappedFieldProps } from "redux-form"
import { AccessRightValue } from "../../../../lib/metadata/AccessRight"
import asField from "../../../../lib/formComponents/FieldHOC"
import { WrappedFieldInputProps } from "redux-form/lib/Field"
import { AppState } from "../../../../model/AppState"
import { connect } from "react-redux"
import { compose } from "redux"
import { DropdownFieldInput } from "../../../../lib/formComponents/DropDownField"
import { DropdownListEntry } from "../../../../model/DropdownLists"

interface RadioButtonProps {
    choice: AccessRightValue
    choiceLabel: string
    input: WrappedFieldInputProps
}

const RadioButton: SFC<RadioButtonProps> = ({ choice, choiceLabel, input, children }) => (
    <div className="form-check col-12">
        <input className="form-check-input"
               id={choice}
               type="radio"
               {...input}
               value={choice}
               defaultChecked={input.value === choice}/>
        <label className="form-check-label" htmlFor={choice}>{choiceLabel}</label>
        {children}
    </div>
)

interface RadioChoicesProps {
    withUserGroups: boolean
}

const RadioChoices = ({ withUserGroups, input, meta, label }: WrappedFieldProps & RadioChoicesProps) => {
    return (
        <>
            <RadioButton choice={AccessRightValue.OPEN_ACCESS}
                         choiceLabel="Open Access"
                         input={input}/>

            <RadioButton choice={AccessRightValue.REQUEST_PERMISSION}
                         choiceLabel="Restricted Access"
                         input={input}/>

            {withUserGroups && <RadioButton choice={AccessRightValue.GROUP_ACCESS}
                                            choiceLabel="Group Access"
                                            input={input}/>}
        </>
    )
}

interface AccessRightsFieldProps {
    userGroups: DropdownListEntry[]
    label: string
}

const AccessRightsField = ({ userGroups, label }: AccessRightsFieldProps) => {
    const withUserGroups = userGroups.length > 0
    return (
        <>
            <label className="col-12 col-md-3 pl-0 title-label text-array-label">{label || ""}</label>
            <div className="col-12 col-md-8 pl-0 pr-0">
                <Field name="accessRights.category"
                       withUserGroups={withUserGroups}
                       component={RadioChoices}/>
                {/* TODO disable when GROUP_ACCESS is not selected */}
                {withUserGroups && <Field name="accessRights.group"
                       withEmptyDefault
                       choices={userGroups}
                       component={DropdownFieldInput}/>}
            </div>
        </>
    )
}

const mapStateToProps = (state: AppState) => ({
    userGroups: state.user.groups.map(group => ({
        key: group,
        value: group,
        displayValue: group,
    })),
})

export default compose(
    // asField,
    connect(mapStateToProps),
)(AccessRightsField)
