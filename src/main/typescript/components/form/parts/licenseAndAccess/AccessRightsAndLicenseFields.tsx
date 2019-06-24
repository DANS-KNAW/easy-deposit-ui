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
import { change } from "redux-form"
import LicenseField from "./LicenseField"
import AccessRightsField from "./AccessRightsField"
import { FieldProps } from "../../../../lib/formComponents/ReduxFormUtils"
import { InnerComponentProps } from "../../../../lib/formComponents/FieldHOC"
import { DropdownList } from "../../../../model/DropdownLists"
import { AccessRightValue } from "../../../../lib/metadata/AccessRight"
import { depositFormName } from "../../../../constants/depositFormConstants"
import { Dispatch } from "redux"
import { dansLicense, emptyLicense } from "../../../../lib/metadata/License"

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
    accessRights: FieldProps & InnerComponentProps
    license: FieldProps & InnerComponentProps
    dropDown: { licenses: DropdownList }
}

class AccessRightsAndLicenseFields extends React.Component<AccessRightsAndLicenseFieldsProps> {
    onAccessRightChange = (dispatch: Dispatch<any>, license: string, licenseName: string) => () => {
        license !== emptyLicense && dispatch(change(depositFormName, licenseName, emptyLicense))
    }

    render() {
        const { names: [accessRightName, licenseName], accessRights, license, dropDown: { licenses: licensesDropdowns } } = this.props
        const accessRightsCategory = accessRights.input.value.category
        const licenseChoices = accessRightsCategory == AccessRightValue.OPEN_ACCESS
            ? licensesDropdowns
            : accessRightsCategory == AccessRightValue.REQUEST_PERMISSION
                ? dansLicenseDropdownList
                : noLicenses

        return (
            <div>
                <AccessRightsField name={accessRightName}
                                   label="Access rights"
                                   mandatory
                                   helpText
                                   onAccessRightChange={this.onAccessRightChange(accessRights.meta.dispatch, license.input.value, licenseName)}
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
}

export default AccessRightsAndLicenseFields
