import { DropdownListEntry } from "../../model/DropdownLists"

export const licenseConverter: (licenses: DropdownListEntry[]) => (l: any) => string = licenses => l => {
    const validLicense = licenses.find(({key}) => key === l)

    if (validLicense)
        return l
    else
        throw `Error in metadata: no such license: '${l}'`
}

export const licenseDeconverter: (l: string) => any = l => l
