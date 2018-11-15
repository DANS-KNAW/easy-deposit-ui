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
import { Validator } from "redux-form"
import { PrivacySensitiveDataValue } from "../../lib/metadata/PrivacySensitiveData"
import { DepositFormMetadata } from "./parts"

export const mandatoryFieldValidator: Validator = (value, allValues, props, name) => {
    return !value || typeof value == "string" && value.trim() === ""
        ? `no ${name} was provided`
        : undefined
}

export const mandatoryFieldArrayValidator: Validator = (values: any[], allValues, props, name) => {
    return !values || (values && (values.length == 0 || values.filter(value => value && value.trim() !== "").length === 0))
        ? `no ${name} were provided`
        : undefined
}

export const mandatoryRadioButtonValidator: Validator = (value, allValues, props, name) => {
    return !value || typeof value === "object" && Object.keys(value).filter(key => value[key] && value[key].trim() !== "").length === 0
        ? `no ${name} was provided`
        : undefined
}

export const mandatoryPrivacySensitiveDataValidator: Validator = (value, allValues, props, name) => {
    if (!value)
        return `no ${name} was provided`
    else if (typeof value === "string" && (value.trim() === "" || value.trim() === PrivacySensitiveDataValue.UNSPECIFIED))
        return `no ${name} was provided`
    else if (typeof value === "object" && Object.keys(value).filter(key => value[key] && value[key].trim() !== "").length === 0)
        return `no ${name} was provided`
    else
        return undefined
}

export const checkboxMustBeChecked = (value?: any) => {
    return !value || value !== true
        ? "Accept the license agreement before submitting this dataset"
        : undefined
}

export const dateAvailableMustBeAfterDateCreated: Validator = (value, { dateCreated, dateAvailable }: DepositFormMetadata) => {
    return dateCreated && dateAvailable && dateAvailable < dateCreated
        ? "'Date available' cannot be a date earlier than 'Date created'"
        : undefined
}
