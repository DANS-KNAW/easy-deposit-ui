import { AppState } from "../model/AppState"
import { HelpTextState } from "../model/HelpTexts"

export const isHelpTextVisible: (fieldName: string) => (state: AppState) => boolean = fieldName => state => {
    const helpText = state.helpTexts[fieldName]
    return helpText ? helpText.visible : false
}

export const isHelpTextDisplayable: (fieldName: string) => (state: AppState) => boolean = fieldName => state => {
    const helpText = state.helpTexts[fieldName]
    return helpText ? !helpText.fetchError : false
}

export const getHelpTextState: (fieldName: string) => (state: AppState) => HelpTextState = fieldName => state => {
    const helpText: HelpTextState = state.helpTexts[fieldName]

    return helpText || {
            visible: false,
            fetching: false,
            fetched: false,
            text: "",
            fetchError: undefined,
        }
}
