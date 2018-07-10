/*
 * Copyright (C) 2018 DANS - Data Archiving and Networked Services (info@dans.knaw.nl)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as React from "react"
import { compose } from "redux"
import { connect } from "react-redux"
import { Field } from "redux-form"
import { AccessRightValue } from "../../../../lib/metadata/AccessRight"
import { DropdownListEntry } from "../../../../model/DropdownLists"
import { AppState } from "../../../../model/AppState"
import asField from "../../../../lib/formComponents/FieldHOC"
import { DropdownFieldInput } from "../../../../lib/formComponents/DropDownField"
import { RadioChoicesInput } from "../../../../lib/formComponents/RadioChoices"
import { FieldProps } from "../../../../lib/formComponents/RepeatableField"

interface AccessRightsFieldProps {
    userGroups: DropdownListEntry[]
}

const AccessRightsField = ({ userGroups, input, meta, label }: FieldProps & AccessRightsFieldProps) => {
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
                       component={RadioChoicesInput}/>
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
