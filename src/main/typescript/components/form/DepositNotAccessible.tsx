import * as React from "react"
import { DepositState } from "../../model/DepositState"
import { DepositStateLabel } from "../../model/Deposits"
import { Link } from "react-router-dom"
import { depositOverviewRoute } from "../../constants/clientRoutes"

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

const DepositNotAccessible = ({ depositState }: DepositUnavailableProps) => (
    <>
        <p>{introLine(depositState.label)}</p>
        {depositState.description && <p style={{whiteSpace: "pre-wrap"}} dangerouslySetInnerHTML={{ __html: depositState.description }}/>}
        <p>Please find your deposits <Link to={depositOverviewRoute}>here</Link>.</p>
    </>
)

export default DepositNotAccessible
