import * as React from "react"
import { DepositState } from "../../model/DepositState"
import { DepositStateLabel } from "../../model/Deposits"
import { Link } from "react-router-dom"
import { depositOverviewRoute } from "../../constants/clientRoutes"
import { DepositFormMetadata } from "./parts"

function introLine(label: DepositStateLabel, metadata?: DepositFormMetadata) {
    const title: string | undefined = metadata && metadata.titles && metadata.titles.length > 0 ? metadata.titles[0] : undefined
    const doi = metadata && metadata.doi

    const start = title && doi
        ? <span>The deposit '<i>{title}</i>' (DOI {doi})</span>
        : <span>Your deposit</span>
    switch (label) {
        case DepositStateLabel.SUBMITTED:
            return <p>{start} has been submitted.</p>
        case DepositStateLabel.ARCHIVED:
            return <p>{start} has already been published.</p>
        case DepositStateLabel.IN_PROGRESS:
        default:
            return <p>{start} is in review.</p>
    }
}

interface DepositUnavailableProps {
    depositState: DepositState
    metadata?: DepositFormMetadata
}

const DepositNotAccessible = ({ depositState, metadata }: DepositUnavailableProps) => (
    <>
        {introLine(depositState.label, metadata)}
        {depositState.description &&
        <p style={{ whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{ __html: depositState.description }}/>}
        <p>Please find your deposits <Link to={depositOverviewRoute}>here</Link>.</p>
    </>
)

export default DepositNotAccessible
