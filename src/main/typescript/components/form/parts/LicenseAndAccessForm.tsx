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
import { Field, Fields } from "redux-form"
import { Contributor, emptyContributor } from "../../../lib/metadata/Contributor"
import { AccessRight } from "../../../lib/metadata/AccessRight"
import { emptyString } from "../../../lib/metadata/misc"
import { AppState } from "../../../model/AppState"
import { connect } from "react-redux"
import { DropdownList } from "../../../model/DropdownLists"
import RightsholderFields from "./licenseAndAccess/RightsholderFields"
import DatePickerField from "../../../lib/formComponents/DatePickerField"
import AccessRightsAndLicenseFields from "./licenseAndAccess/AccessRightsAndLicenseFields"

export interface LicenseAndAccessFormData {
    rightsHolders?: Contributor[]
    publishers?: string[]
    accessRights?: AccessRight
    license?: string
    dateAvailable?: Date
}

interface LicenseAndAccessFormProps {
    contributorIds: DropdownList
    licenses: DropdownList
}

const LicenseAndAccessForm = ({ licenses, contributorIds }: LicenseAndAccessFormProps) => (
    <>
        <RepeatableFieldWithDropdown name="rightsHolders"
                                     label="Rightsholders"
                                     helpText
                                     empty={() => emptyContributor}
                                     fieldNames={[
                                         (name: string) => `${name}.titles`, // 0
                                         (name: string) => `${name}.initials`, // 1
                                         (name: string) => `${name}.insertions`, // 2
                                         (name: string) => `${name}.surname`, // 3
                                         (name: string) => `${name}.ids`, // 4
                                         (name: string) => `${name}.role`, // 5 - NOTE: not used in this instance, but still necessary for a correct implementation
                                         (name: string) => `${name}.organization`, // 6
                                     ]}
                                     dropdowns={{ ids: contributorIds }}
                                     component={RightsholderFields}/>

        <RepeatableField name="publishers"
                         label="Publishers"
                         helpText
                         empty={() => emptyString}
                         fieldNames={[(name: string) => name]}
                         component={TextFieldArray}/>

        <Fields names={["accessRights", "license"]}
                dropDown={{ licenses: licenses }}
                component={AccessRightsAndLicenseFields}/>

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

const mapStateToProps = (state: AppState) => ({
    contributorIds: state.dropDowns.contributorIds,
    licenses: state.dropDowns.licenses,
})

export default connect(mapStateToProps)(LicenseAndAccessForm)
