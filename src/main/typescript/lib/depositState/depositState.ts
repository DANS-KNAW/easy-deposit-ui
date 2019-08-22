import { DepositState } from "../../model/DepositState"
import { toDepositStateLabel } from "../../model/Deposits"

export function depositStateConverter(input: any): DepositState {
    const label = input.state && toDepositStateLabel(input.state)
    const description = input.description

    if (label)
        return ({
            label: label,
            description: description || "",
        })
    else
        throw `Error in deposit state: no such deposit state: '${input.state}'`
}
