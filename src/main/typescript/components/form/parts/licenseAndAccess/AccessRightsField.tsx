import * as React from "react"
import { compose } from "redux"
import { connect } from "react-redux"
import { Field, WrappedFieldProps } from "redux-form"
import { AccessRightValue } from "../../../../lib/metadata/AccessRight"
import { DropdownListEntry } from "../../../../model/DropdownLists"
import { AppState } from "../../../../model/AppState"
import asField from "../../../../lib/formComponents/FieldHOC"
import { DropdownFieldInput } from "../../../../lib/formComponents/DropDownField"
import {RadioChoicesInput as LibRadioChoices} from "../../../../lib/formComponents/RadioChoices"

interface AccessRightsFieldProps {
    userGroups: DropdownListEntry[]
}

const AccessRightsField = ({ userGroups, input, meta, label }: WrappedFieldProps & AccessRightsFieldProps) => {
    const withUserGroups = userGroups.length > 0

    const choices = [
        {
            title: AccessRightValue.OPEN_ACCESS,
            value: "Open Access",
        },
        {
            title: AccessRightValue.REQUEST_PERMISSION,
            value: "Restricted Access",
        },
    ]
    if (withUserGroups)
        choices.push({
            title: AccessRightValue.GROUP_ACCESS,
            value: "Group Access",
        })

    return (
        <div className="form-row accessrights-field">
            <div className="col col-md-4 category-field">
                <Field name={`${input.name}.category`}
                       divClassName="radio-button"
                       choices={choices}
                       component={LibRadioChoices}/>
            </div>
            {withUserGroups && <div className="col col-md-4 group-field">
                <Field name={`${input.name}.group`}
                       choices={userGroups}
                       withEmptyDefault={userGroups.length != 1}
                       emptyDefault="Choose a group..."
                       disabled={input.value.category !== AccessRightValue.GROUP_ACCESS}
                       component={DropdownFieldInput}/>
            </div>}
        </div>
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
    asField,
    connect(mapStateToProps),
)(AccessRightsField)
