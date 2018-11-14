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
import { Field } from "redux-form"
import { AccessRightValue } from "../../../../lib/metadata/AccessRight"
import asField, { InnerComponentProps } from "../../../../lib/formComponents/FieldHOC"
import { RadioChoicesInput } from "../../../../lib/formComponents/RadioChoices"
import { FieldProps } from "../../../../lib/formComponents/ReduxFormUtils"

const AccessRightsField = ({ input, className }: FieldProps & InnerComponentProps ) => {

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

    return (
        <div className={`form-row accessrights-field ${className || ""}`}>
            <div className="col col-md-4 category-field">
                <Field name={`${input.name}.category`}
                       divClassName="radio-button"
                       choices={choices}
                       component={RadioChoicesInput}/>
            </div>
        </div>
    )
}

export default asField(AccessRightsField)
