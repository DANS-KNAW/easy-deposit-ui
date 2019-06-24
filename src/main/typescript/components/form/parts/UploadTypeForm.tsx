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
import RadioChoices, { RadioChoice } from "../../../lib/formComponents/RadioChoices"
import { Field } from "redux-form"
import { emptyString } from "../../../lib/metadata/misc"
import DcmiTypesFieldArray from "./uploadType/DcmiTypesFieldArray"
import ImtFormatsFieldArray from "./uploadType/ImtFormatsFieldArray"
import { useSelector } from "../../../lib/redux"

export interface UploadTypeFormData {
    typesDCMI?: string[]
    types?: string[]
    formatsMediaType?: string[]
    formats?: string[]
    extraClarinMetadataPresent?: boolean
}

// validation rules
const oneSelected = (value?: any) => value !== undefined ? undefined : "you need to select one of these choices"

const clarinChoices: RadioChoice[] = [
    {
        name: "no CLARIN metadata",
        title: false,
        value: "This dataset does not contain CLARIN metadata, i.e., no CMDI files",
    },
    {
        name: "contains CLARIN metadata",
        title: true,
        value: "This dataset contains CLARIN metadata, i.e., CMDI file(s)",
    },
]

const UploadTypeForm = () => (
    <>
        <RepeatableFieldWithDropdown name="typesDCMI"
                                     label="Content type"
                                     helpText
                                     empty={() => emptyString}
                                     fieldNames={[(name: string) => name]}
                                     dropdowns={{ types: useSelector(state => state.dropDowns.dcmiTypes) }}
                                     component={DcmiTypesFieldArray}/>

        <RepeatableField name="types"
                         label="Types"
                         showNoLabel
                         helpText
                         empty={() => emptyString}
                         fieldNames={[(name: string) => name]}
                         component={TextFieldArray}/>

        <RepeatableFieldWithDropdown name="formatsMediaType"
                                     label="Format (media type)"
                                     helpText
                                     empty={() => emptyString}
                                     fieldNames={[(name: string) => name]}
                                     dropdowns={{ formats: useSelector(state => state.dropDowns.imtFormats) }}
                                     component={ImtFormatsFieldArray}/>

        <RepeatableField name="formats"
                         label="Format"
                         showNoLabel
                         helpText
                         empty={() => emptyString}
                         fieldNames={[(name: string) => name]}
                         component={TextFieldArray}/>

        <Field name="extraClarinMetadataPresent"
               label="Contains CLARIN metadata"
               helpText
               choices={clarinChoices}
               component={RadioChoices}
               validate={[oneSelected]}/>
    </>
)

export default UploadTypeForm
