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
import { PrivacySensitiveDataValue } from "../../../model/FormData"
import { Field, WrappedFieldProps } from "redux-form"

export interface PrivacySensitiveDataFormData {
    privacySensitiveDataPresent?: PrivacySensitiveDataValue
}

// validation rules
const oneSelected = (value?: any) => value ? undefined : "you need to select one of these choices"

interface RadioChoice {
    title: PrivacySensitiveDataValue
    value: string
}

interface RadioProps {
    choices: RadioChoice[]
}

const RadioChoices = ({ input, meta, choices }: WrappedFieldProps & RadioProps) => {
    const changed = (meta as any).changed
    const hasError = meta.error && (changed || meta.submitFailed)

    return (
        <>
            {hasError && <span className="validation-error">{meta.error}</span>}
            {choices.map(({ title, value }) =>
                <div className="form-check col-12" key={title}> {/* TODO unique key */}
                    {/*
                      * Note to future developers: the order of the attributes in <input> is important!
                      * {...input} must come before value={title} and neither of them may be omitted.
                      */}
                    <input className="form-check-input" id={title} type="radio"
                           {...input} value={title} defaultChecked={input.value == title}/>
                    <label className="form-check-label" htmlFor={title}>{value}</label>
                </div>,
            )}
        </>
    )
}

const PrivacySensitiveDataForm = () => (
    <div className="container pl-0 pr-0">
        <div className="row form-group input-element">
            {/* TODO provide a proper text */}
            <p>Hier een tekst met uitleg over de privacy sensitive data en waarom men hier verplicht een keuze moet
                maken.</p>
        </div>

        <div className="row form-group input-element">
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
                   component={RadioChoices}
                   validate={[oneSelected]}/>
        </div>
    </div>
)

export default PrivacySensitiveDataForm
