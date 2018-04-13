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
import { Field, WrappedFieldProps } from "redux-form"

export interface DepositLicenseFormData {
    acceptLicenseAgreement?: boolean
}

// validation rules
const mustBeChecked = (value?: any) => value && value === true
    ? undefined
    : "Accept the license agreement before submitting this dataset"

const RenderCheckbox = ({ input, meta, label }: WrappedFieldProps & { foo?: number }) => {
    const changed = (meta as any).changed
    const hasError = meta.error && (changed || meta.submitFailed)

    return (
        <>
            {hasError && <span className="validation-error">{meta.error}</span>}
            <div className="form-check col-12">
                <input className="form-check-input" id={input.name} type="checkbox"
                       {...input} defaultChecked={input.value}/>
                <label className="form-check-label" htmlFor={input.name}>{label}</label>
            </div>
        </>
    )
}

const DepositLicenseForm = () => (
    <div className="container pl-0 pr-0">
        <div className="row form-group input-element">
            <p>
                {/* TODO fill in the correct href in the <a> */}
                In order to deposit a dataset, you must accept and understand
                the <a className="text-primary" href="#" target="_blank">Licence agreement</a> (PDF).
            </p>
        </div>

        <div className="row form-group input-element">
            <p>
                Please note that this agreement includes that:
            </p>
        </div>

        <div className="row form-group input-element">
            <ul>
                <li>You grant DANS a non-exclusive licence to store and make available to third parties the
                    above mentioned digital dataset, in accordance with the 'access' conditions you
                    indicated.
                </li>
                <li>You declare that you are the holder of rights to the dataset and/or entitled to act in
                    the present matter with the permission of other parties that hold rights.
                </li>
            </ul>
        </div>

        <div className="row form-group input-element">
            <p>
                In case you have chosen <b>Creative Commons Zero Waiver</b>, please note additionally that this
                agreement, in accordance with the 'access' conditions of the Creative Commons Zero Waiver,
                includes that:
            </p>
        </div>

        <div className="row form-group input-element">
            <ul>
                <li><b>You renounce all possible rights relating to the dataset.</b></li>
            </ul>
        </div>

        <div className="row form-group input-element">
            <Field name="acceptLicenseAgreement"
                   label="Yes, I accept and understand the terms of the Licence agreement"
                   component={RenderCheckbox}
                   validate={[mustBeChecked]}/>
        </div>
    </div>
)

export default DepositLicenseForm
