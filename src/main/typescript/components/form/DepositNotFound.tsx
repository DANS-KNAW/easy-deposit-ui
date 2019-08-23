import * as React from "react"
import { Link } from "react-router-dom"
import { depositOverviewRoute } from "../../constants/clientRoutes"

const DepositNotFound = () => (
    <p>
        This deposit could not be found.
        Please find your deposits <Link to={depositOverviewRoute}>here</Link>.
    </p>
)

export default DepositNotFound
