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
import { DropdownListEntry } from "../../model/DropdownLists"
import { emptyString } from "./misc"

enum LicenseScheme {
    uri = "dcterms:URI"
}

function toLicenseScheme(value: string): LicenseScheme | undefined {
    return Object.values(LicenseScheme).find(v => v === value)
}

export const emptyLicense = emptyString

export const dansLicense: DropdownListEntry = {
    key: "http://dans.knaw.nl/en/about/organisation-and-policy/legal-information/DANSGeneralconditionsofuseUKDEF.pdf",
    value: "DANS LICENCE",
    displayValue: "DANS LICENCE",
}

export const licenseConverter: (licenses: DropdownListEntry[]) => (license: any) => string = licenses => license => {

    const scheme = license.scheme && toLicenseScheme(license.scheme)

    if (scheme && scheme === LicenseScheme.uri && license.value) {
        const validLicense = dansLicense.key === license.value || licenses.find(({ key }) => key === license.value)

        if (validLicense)
            return license.value
        else
            throw `Error in metadata: no such license: '${license.value}'`
    }
    else
        throw `Error in metadata: unrecognized object: ${JSON.stringify(license)}`
}

export const licenseDeconverter: (licenses: DropdownListEntry[]) => (licenseValue: string) => any = licenses => licenseValue => {
    const validLicense = dansLicense.key === licenseValue || licenses.find(({ key }) => key === licenseValue)

    if (validLicense)
        return {
            scheme: LicenseScheme.uri,
            value: licenseValue
        }
    else
        throw `Error in metadata: no such license: '${licenseValue}'`
}
