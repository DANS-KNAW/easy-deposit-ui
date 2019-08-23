import * as React from "react"
import { DepositState } from "../../model/DepositState"
import { DepositStateLabel } from "../../model/Deposits"

function introLine(label: DepositStateLabel) {
    switch (label) {
        case DepositStateLabel.IN_PROGRESS:
            return "Your deposit is in review."
        case DepositStateLabel.SUBMITTED:
            return "Your deposit has been submitted."
        case DepositStateLabel.ARCHIVED:
            return "Your deposit already has been published."
        default:
            return "Your deposit is in review"
    }
}

interface DepositUnavailableProps {
    depositState: DepositState
}

const DepositUnavailable = ({ depositState }: DepositUnavailableProps) => (
    <>
        <p>{introLine(depositState.label)}</p>
        <p dangerouslySetInnerHTML={{ __html: depositState.description }}/>
        {/* TODO button to go back to the deposit overview */}
    </>
)

export default DepositUnavailable
