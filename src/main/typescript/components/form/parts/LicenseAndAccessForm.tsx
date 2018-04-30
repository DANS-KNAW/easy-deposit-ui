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
import { Component } from "react"
import { AccessRight, emptyStringValue, Value } from "../../../model/FormData"
import TextFieldArray from "../../../lib/formComponents/TextFieldArray"
import { RepeatableField } from "../../../lib/formComponents/RepeatableField"
import { Field } from "redux-form"
import SelectField from "../../../lib/formComponents/SelectField"

export interface LicenseAndAccessFormData {
    rightsHolders?: Value[]
    publishers?: Value[]
    accessRights?: AccessRight
    license?: string
    dateAvailable?: Date
}

interface LicenseAndAccessFormProps {
}

// TODO fetch from server
// TODO expand values into better descriptions
const licenses = [
    // @formatter:off
    { key: "",                                                            value: "Choose..." },
    { key: "http://creativecommons.org/publicdomain/zero/1.0",            value: "CC0-1.0" },
    { key: "http://creativecommons.org/licenses/by-nc/3.0",               value: "BY-NC-3.0" },
    { key: "http://creativecommons.org/licenses/by-nc-sa/3.0",            value: "BY-NC-SA-3.0" },
    { key: "http://creativecommons.org/licenses/by/4.0",                  value: "CC-BY-4.0" },
    { key: "http://creativecommons.org/licenses/by-sa/4.0/",              value: "CC-BY-SA-4.0" },
    { key: "http://creativecommons.org/licenses/by-nc/4.0/",              value: "CC-BY-NC-4.0" },
    { key: "http://creativecommons.org/licenses/by-nd/4.0/",              value: "CC-BY-ND-4.0" },
    { key: "http://creativecommons.org/licenses/by-nc-nd/4.0/",           value: "CC-BY-NC-ND-4.0" },
    { key: "http://creativecommons.org/licenses/by-nc-sa/4.0/",           value: "CC-BY-NC-SA-4.0" },
    { key: "http://opensource.org/licenses/BSD-2-Clause",                 value: "BSD-2-Clause" },
    { key: "http://opensource.org/licenses/BSD-3-Clause",                 value: "BSD-3-Clause" },
    { key: "http://opensource.org/licenses/MIT",                          value: "MIT" },
    { key: "http://www.apache.org/licenses/LICENSE-2.0",                  value: "Apache-2.0" },
    { key: "http://www.cecill.info/licences/Licence_CeCILL_V2-en.html",   value: "CeCILL_V2" },
    { key: "http://www.cecill.info/licences/Licence_CeCILL-B_V1-en.html", value: "CeCILL-B_V1" },
    { key: "http://www.gnu.org/licenses/gpl-3.0.en.html",                 value: "GPL-3.0" },
    { key: "http://www.gnu.org/licenses/lgpl-3.0.txt",                    value: "LGPL-3.0" },
    { key: "http://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html",    value: "GPL-2.0" },
    { key: "http://www.mozilla.org/en-US/MPL/2.0/FAQ/",                   value: "MPL-2.0" },
    { key: "http://www.ohwr.org/attachments/735/CERNOHLv1_1.txt",         value: "CERN-OHL-1.1" },
    { key: "http://www.ohwr.org/attachments/2388/cern_ohl_v_1_2.txt",     value: "CERN-OHL-1.2" },
    { key: "http://www.ohwr.org/projects/cernohl/wiki",                   value: "CERN-OHL-1.2" },
    { key: "http://www.tapr.org/ohl.html",                                value: "TAPR-OHL-1.0" },
    { key: "http://www.tapr.org/TAPR_Open_Hardware_License_v1.0.txt",     value: "TAPR-OHL-1.0" },
    // @formatter:on
]

class LicenseAndAccessForm extends Component<LicenseAndAccessFormProps> {
    render() {
        return (
            <div className="container pl-0 pr-0">
                <div className="row form-group input-element">
                    <RepeatableField name="rightsHolders"
                                     label="Rightsholders"
                                     empty={emptyStringValue}
                                     fieldNames={[(name: string) => `${name}.value`]}
                                     component={TextFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="publishers"
                                     label="Publishers"
                                     empty={emptyStringValue}
                                     fieldNames={[(name: string) => `${name}.value`]}
                                     component={TextFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <p>Access rights</p>
                </div>

                <div className="row form-group input-element">
                    <Field name="license"
                           label="License"
                           className="col-12 col-md-8"
                           withLabel
                           component={SelectField}>
                        {licenses.map((value, index) => (
                            <option key={`${value.key}${index}`} value={value.key}>{value.value}</option>
                        ))}
                    </Field>
                </div>

                <div className="row form-group input-element">
                    <p>Date available</p>
                </div>
            </div>
        )
    }
}

export default LicenseAndAccessForm
