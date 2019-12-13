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
import TextFieldArray from "../../../lib/formComponents/TextFieldArray"
import { RepeatableField, RepeatableFieldWithDropdown } from "../../../lib/formComponents/ReduxFormUtils"
import { Field } from "redux-form"
import { Contributor, emptyRightsholder } from "../../../lib/metadata/Contributor"
import { AccessRight } from "../../../lib/metadata/AccessRight"
import { emptyString } from "../../../lib/metadata/misc"
import ContributorFieldArray from "../../../lib/formComponents/ContributorFieldArray"
import DatePickerField from "../../../lib/formComponents/DatePickerField"
import AccessRightsAndLicenseFields from "./licenseAndAccess/AccessRightsAndLicenseFields"
import { useSelector } from "../../../lib/redux"

export interface LicenseAndAccessFormData {
    rightsHolders?: Contributor[]
    publishers?: string[]
    accessRights?: AccessRight
    license?: string
    dateAvailable?: Date
}

const LicenseAndAccessForm = () => (
    <>
        <RepeatableField name="rightsHolders"
                         label="Rightsholder"
                         helpText
                         mandatory
                         empty={() => emptyRightsholder}
                         fieldNames={[
                             (name: string) => `${name}.titles`, // 0
                             (name: string) => `${name}.initials`, // 1
                             (name: string) => `${name}.insertions`, // 2
                             (name: string) => `${name}.surname`, // 3
                             (name: string) => `${name}.orcid`, // 4
                             (name: string) => `${name}.isni`, // 5
                             (name: string) => `${name}.dai`, // 6
                             (name: string) => `${name}.role`, // 7 - NOTE: not used in this instance, but still necessary for a correct implementation
                             (name: string) => `${name}.organization`, // 8
                         ]}
                         component={ContributorFieldArray}/>

        <RepeatableField name="publishers"
                         label="Publisher"
                         helpText
                         empty={() => emptyString}
                         fieldNames={[(name: string) => name]}
                         component={TextFieldArray}/>

        <AccessRightsAndLicenseFields licenseDropdown={useSelector(state => state.dropDowns.licenses)}/>

        <Field name="dateAvailable"
               label="Date available"
               helpText
               todayButton="Today"
               minDate={new Date()}
               maxDate={twoYearsFromNow()}
               component={DatePickerField}/>
    </>
)

const twoYearsFromNow = () => {
    const now = new Date()
    return new Date(now.getFullYear() + 2, now.getMonth(), now.getDate())
}

export default LicenseAndAccessForm
