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
