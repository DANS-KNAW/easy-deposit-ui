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
import { RadioChoicesInput, RadioProps } from "../../../lib/formComponents/RadioChoices"
import { PrivacySensitiveDataValue } from "../../../lib/metadata/PrivacySensitiveData"
import Mandatory from "../../../lib/formComponents/Mandatory"
import { mandatoryPrivacySensitiveDataValidator } from "../Validation"
import { FieldProps } from "../../../lib/formComponents/ReduxFormUtils"

export interface PrivacySensitiveDataFormData {
    privacySensitiveDataPresent?: PrivacySensitiveDataValue
}

const PrivacySensitiveRadioChoices = (props: FieldProps & RadioProps) => {
    const { meta } = props
    const changed = (meta as any).changed
    const hasError = meta.error && (changed || meta.submitFailed)

    return (
        <>
            <div className={`privacy-sensitive-data-field ${hasError ? "is-invalid" : ""}`}>
                <RadioChoicesInput choices={props.choices} {...props}/>
            </div>
            {hasError && <span className="invalid-feedback">{meta.error}</span>}
        </>
    )
}

const PrivacySensitiveDataForm = () => (
    <>
        <div className="row form-group input-element">
            <Mandatory style={{ paddingLeft: "unset", paddingRight: "5px" }}/>
            {/* TODO provide a proper text */}
            Hier een tekst met uitleg over de privacy sensitive data en waarom men hier verplicht een keuze moet maken.
        </div>

        <Field name="privacySensitiveDataPresent"
               choices={[
                   {
                       title: PrivacySensitiveDataValue.YES,
                       value: "YES, this dataset does contain personal data (please contact DANS)",
                   },
                   {
                       title: PrivacySensitiveDataValue.NO,
                       value: "NO, this dataset does not contain personal data",
                   },
               ]}
               component={PrivacySensitiveRadioChoices}/>
    </>
)

export default PrivacySensitiveDataForm
