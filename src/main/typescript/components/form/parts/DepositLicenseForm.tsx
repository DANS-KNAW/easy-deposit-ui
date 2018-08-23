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
import Checkbox from "../../../lib/formComponents/Checkbox"
import Mandatory from "../../../lib/formComponents/Mandatory"

export interface DepositLicenseFormData {
    acceptLicenseAgreement?: boolean
}

// validation rules
const mustBeChecked = (value?: any) => value && value === true
    ? undefined
    : "Accept the license agreement before submitting this dataset"

const DepositLicenseForm = () => (
    <>
        <div className="row form-group input-element mb-0">
            <p>
                {/* TODO fill in the correct href in the <a> */}
                In order to deposit a dataset, you must accept and understand
                the <a href="#" target="_blank" className="text-primary">Licence agreement</a> (PDF).
            </p>
        </div>

        <div className="row form-group input-element mb-0">
            <p>
                Please note that this agreement includes that:
            </p>
        </div>

        <div className="row form-group input-element mb-0">
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

        <div className="row form-group input-element mb-0">
            <p>
                In case you have chosen <b>Creative Commons Zero Waiver</b>, please note additionally that this
                agreement, in accordance with the 'access' conditions of the Creative Commons Zero Waiver,
                includes that:
            </p>
        </div>

        <div className="row form-group input-element mb-0">
            <ul>
                <li><b>You renounce all possible rights relating to the dataset.</b></li>
            </ul>
        </div>

        <div className="row form-group input-element">
            <Field name="acceptLicenseAgreement"
                   component={Checkbox}
                   validate={[mustBeChecked]}>
                Yes, I accept and understand the terms of the License agreement<Mandatory/>
            </Field>
        </div>
    </>
)

export default DepositLicenseForm
