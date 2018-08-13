import { Configuration } from "../../model/Configuration"

function hasConfiguration(obj: any): obj is { apiUrl: string } {
    return !!obj && typeof obj === "object" &&
        "apiUrl" in obj
}

export const configurationConverter: (input: unknown) => Configuration = input => {
    if (hasConfiguration(input))
        return {
            apiUrl: input.apiUrl,
        }
    else
        throw `configuration did not contain apiUrl`

}
