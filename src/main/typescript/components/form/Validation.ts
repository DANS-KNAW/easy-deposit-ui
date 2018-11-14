import { Validator } from "redux-form"

export const mandatoryFieldValidator: Validator = (value, allValues, props, name) => {
    return !value || typeof value == "string" && value.trim() === "" ? `no ${name} was provided` : undefined
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
