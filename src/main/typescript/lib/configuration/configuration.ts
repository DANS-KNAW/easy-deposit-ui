import { Configuration } from "../../model/Configuration"

export const configurationConverter: (input: any) => Configuration = input => {
    const apiUrl = input.apiUrl

    if (!!apiUrl)
        return {
            apiUrl: apiUrl,
        }
    else
        throw `configuration did not contain apiUrl`
}
