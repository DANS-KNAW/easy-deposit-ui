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
import { RepeatableField } from "../../../lib/formComponents/RepeatableField"
import { Field } from "redux-form"
import { Contributor, emptyContributor } from "../../../lib/metadata/Contributor"
import { AccessRight } from "../../../lib/metadata/AccessRight"
import { emptyString } from "../../../lib/metadata/misc"
import LicenseField from "./licenseAndAccess/LicenseField"
import { AppState } from "../../../model/AppState"
import { connect } from "react-redux"
import { DropdownList } from "../../../model/DropdownLists"
import RightsholderFields from "./licenseAndAccess/RightsholderFields"
import DatePickerField from "../../../lib/formComponents/DatePickerField"
import * as moment from "moment"

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
    <div className="container pl-0 pr-0">
        <div className="row form-group input-element">
            <RepeatableField name="rightsHolders"
                             label="Rightsholders"
                             empty={emptyContributor}
                             fieldNames={[
                                 (name: string) => `${name}.titles`, // 0
                                 (name: string) => `${name}.initials`, // 1
                                 (name: string) => `${name}.insertions`, // 2
                                 (name: string) => `${name}.surname`, // 3
                                 (name: string) => `${name}.ids`, // 4
                                 (name: string) => `${name}.role`, // 5 - NOTE: not used in this instance, but still necessary for a correct implementation
                                 (name: string) => `${name}.organization`, // 6
                             ]}
                             component={RightsholderFields(contributorIds)}/>
        </div>

        <div className="row form-group input-element">
            <RepeatableField name="publishers"
                             label="Publishers"
                             empty={emptyString}
                             fieldNames={[(name: string) => name]}
                             component={TextFieldArray}/>
        </div>

        <div className="row form-group input-element">
            <p>Access rights</p>
        </div>

        <div className="row form-group input-element">
            <Field name="license"
                   label="License"
                   withEmptyDefault
                   component={LicenseField(licenses)}/>
        </div>

        <div className="row form-group input-element">
            <Field name="dateAvailable"
                   label="Date available"
                   todayButton="Today"
                   minDate={moment()}
                   maxDate={moment().add(2, "years")} // TODO check if this is correct! - embargo max 2 years
                   component={DatePickerField}/>
        </div>
    </div>
)

const mapStateToProps = (state: AppState) => ({
    contributorIds: state.dropDowns.contributorIds,
    licenses: state.dropDowns.licenses,
})

export default connect(mapStateToProps)(LicenseAndAccessForm)
