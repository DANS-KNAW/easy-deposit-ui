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
import { change, Fields } from "redux-form"
import LicenseField from "./LicenseField"
import AccessRightsField from "./AccessRightsField"
import { depositFormName } from "../../../../constants/depositFormConstants"
import { InnerComponentProps } from "../../../../lib/formComponents/FieldHOC"
import { FieldProps } from "../../../../lib/formComponents/ReduxFormUtils"
import { AccessRightValue } from "../../../../lib/metadata/AccessRight"
import { dansLicense, emptyLicense } from "../../../../lib/metadata/License"
import { PrivacySensitiveDataValue } from "../../../../lib/metadata/PrivacySensitiveData"
import { DropdownList } from "../../../../model/DropdownLists"

const dansLicenseDropdownList: DropdownList = {
    list: [dansLicense],
    state: {
        fetchingList: false,
        fetchedList: true,
    },
}

const noLicenses: DropdownList = {
    list: [],
    state: {
        fetchingList: false,
        fetchedList: true,
    },
}

interface AccessRightsAndLicenseFieldsProps {
    names: string[]
    privacySensitiveDataPresent: FieldProps & InnerComponentProps
    accessRights: FieldProps & InnerComponentProps
    license: FieldProps & InnerComponentProps
    licenseDropdown: DropdownList
}

const AccessRightsAndLicenseFields = ({ names, privacySensitiveDataPresent, accessRights, license, licenseDropdown }: AccessRightsAndLicenseFieldsProps) => {
    const [, accessRightName, licenseName] = names
    const accessRightsCategory = accessRights.input.value.category
    const licenseChoices = accessRightsCategory == AccessRightValue.OPEN_ACCESS
        ? licenseDropdown
        : accessRightsCategory == AccessRightValue.REQUEST_PERMISSION
            ? dansLicenseDropdownList
            : noLicenses

    const choices = [
        {
            title: AccessRightValue.OPEN_ACCESS,
            value: "Open Access",
            disabled: () => privacySensitiveDataPresent.input.value === PrivacySensitiveDataValue.YES,
        },
        {
            title: AccessRightValue.REQUEST_PERMISSION,
            value: "Restricted Access",
        },
    ]

    const onAccessRightChange = (e: any) => {
        switch (e.target.value) {
            case AccessRightValue.OPEN_ACCESS: {
                license.input.value !== emptyLicense && license.meta.dispatch(change(depositFormName, licenseName, emptyLicense))
                break
            }
            case AccessRightValue.REQUEST_PERMISSION: {
                license.meta.dispatch(change(depositFormName, licenseName, dansLicense.key))
                break
            }
        }
    }

    return (
        <div>
            <AccessRightsField name={accessRightName}
                               label="Access rights"
                               mandatory
                               helpText
                               choices={choices}
                               onAccessRightChange={onAccessRightChange}
                               {...accessRights}/>

            <LicenseField name={licenseName}
                          label="Licence"
                          mandatory
                          helpText
                          withEmptyDefault
                          dropdown={licenseChoices}
                          {...license}/>
        </div>
    )
}

export default (props: {licenseDropdown: DropdownList}) => (
    <Fields names={["privacySensitiveDataPresent", "accessRights", "license"]}
            licenseDropdown={props.licenseDropdown}
            component={AccessRightsAndLicenseFields}/>
)
