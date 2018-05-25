import { DropdownConstants } from "../constants/dropdownConstants"
import { ReduxAction } from "../lib/redux"
import axios from "axios"
import { DropdownListEntry } from "../model/DropdownLists"

const createFetchAction: (type: DropdownConstants, filename: string) => ReduxAction<Promise<DropdownListEntry[]>> = (type, filename) => ({
    type: type,
    async payload() {
        const response = await axios.get(require(`../../resources/constants/${filename}`))
        return convertDropdownData(response.data)
    }
})

const convertDropdownData: (data: any) => DropdownListEntry[] = data => {
    return Object.keys(data)
        .map(key => {
            const obj = data[key]

            return {
                key: key,
                value: obj.title,
                displayValue: obj.viewName
            }
        })
}

const createFailedAction: (type: DropdownConstants) => (errorMessage: string) => ReduxAction<string> = type => errorMessage => ({
    type: type,
    payload: errorMessage,
})

export const fetchAudienceData: () => ReduxAction<Promise<DropdownListEntry[]>> = () =>
    createFetchAction(DropdownConstants.FETCH_AUDIENCE_DROPDOWN, "audiences.json")

export const fetchAudienceDataFailed: (errorMessage: string) => ReduxAction<string> =
    createFailedAction(DropdownConstants.FETCH_AUDIENCE_DROPDOWN_FAILED)
