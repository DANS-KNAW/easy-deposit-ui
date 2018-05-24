import { DropdownConstants } from "../constants/dropdownConstants"
import { ReduxAction } from "../lib/redux"
import axios from "axios"
import { DropdownListEntry } from "../model/DropdownLists"

export const fetchAudienceData: () => ReduxAction<Promise<DropdownListEntry[]>> = () => ({
    type: DropdownConstants.FETCH_AUDIENCE_DROPDOWN,
    async payload() {
        const response = await axios.get(require("../../resources/constants/audiences.json"))
        return convertAudienceData(response.data)
    }
})

const convertAudienceData: (data: any) => DropdownListEntry[] = data => {
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

export const fetchAudienceDataFailed: (errorMessage: string) => ReduxAction<string> = errorMessage => ({
    type: DropdownConstants.FETCH_AUDIENCE_DROPDOWN_FAILED,
    payload: errorMessage,
})
