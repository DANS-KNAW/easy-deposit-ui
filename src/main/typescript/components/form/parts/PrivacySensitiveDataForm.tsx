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
import { change, Field, Fields } from "redux-form"
import { depositFormName } from "../../../constants/depositFormConstants"
import { InnerComponentProps } from "../../../lib/formComponents/FieldHOC"
import HelpButton from "../../../lib/formComponents/HelpButton"
import HelpText from "../../../lib/formComponents/HelpText"
import Mandatory from "../../../lib/formComponents/Mandatory"
import { RadioChoicesInput } from "../../../lib/formComponents/RadioChoices"
import { FieldProps } from "../../../lib/formComponents/ReduxFormUtils"
import { AccessRightValue } from "../../../lib/metadata/AccessRight"
import { PrivacySensitiveDataValue } from "../../../lib/metadata/PrivacySensitiveData"
import { dansLicense } from "../../../lib/metadata/License"

export interface PrivacySensitiveDataFormData {
    privacySensitiveDataPresent?: PrivacySensitiveDataValue
}

interface PrivacySensitiveDataFormProps {
    names: string[]
    privacySensitiveDataPresent: FieldProps & InnerComponentProps
    accessRights: FieldProps & InnerComponentProps
    license: FieldProps & InnerComponentProps
}

const PrivacySensitiveDataForm = ({ names, privacySensitiveDataPresent, accessRights, license }: PrivacySensitiveDataFormProps) => {
    const [privacySensitiveDataPresentName, accessRightsName, licenseName] = names

    const { meta: psdpMeta } = privacySensitiveDataPresent
    const psdpChanged = (psdpMeta as any).changed
    const psdpHasError = psdpMeta.error && (psdpChanged || psdpMeta.submitFailed)

    const choices = [
        {
            title: PrivacySensitiveDataValue.YES,
            value: "YES, this dataset does contain personal data (please contact DANS)",
        },
        {
            title: PrivacySensitiveDataValue.NO,
            value: "NO, this dataset does not contain personal data",
        },
    ]

    const onPrivacySensitiveChoiceChange = (e: any) => {
        switch (e.target.value) {
            case PrivacySensitiveDataValue.YES: {
                accessRights.meta.dispatch(change(depositFormName, accessRightsName, { category: AccessRightValue.REQUEST_PERMISSION }))
                license.meta.dispatch(change(depositFormName, licenseName, dansLicense.key))
                break
            }
            case PrivacySensitiveDataValue.NO: {
                accessRights.meta.dispatch(change(depositFormName, accessRightsName, { category: AccessRightValue.OPEN_ACCESS }))
                break
            }
        }
    }

    return (
        <>
            <HelpText textFor={privacySensitiveDataPresentName}/>
            <div className="row form-group input-element">
                <label className="title-label">
                    Does your data or metadata contain personal data? Yes/No
                    <Mandatory/>
                    <HelpButton textFor={privacySensitiveDataPresentName}/>
                </label>
            </div>

            <div className={`privacy-sensitive-data-field input-element ${psdpHasError ? "is-invalid" : ""}`}>
                <Field name={privacySensitiveDataPresentName}
                       choices={choices}
                       onChange={onPrivacySensitiveChoiceChange}
                       component={RadioChoicesInput}/>
            </div>
            {psdpHasError && <span className="invalid-feedback">{psdpMeta.error}</span>}
        </>
    )
}

export default () => (
    <Fields names={["privacySensitiveDataPresent", "accessRights", "license"]}
            component={PrivacySensitiveDataForm}/>
)
