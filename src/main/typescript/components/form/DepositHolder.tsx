import * as React from "react"
import * as H from "history"
import { DepositId, DepositStateLabel } from "../../model/Deposits"
import { DepositState } from "../../model/DepositState"
import DepositNotAccessible from "./DepositNotAccessible"
import DepositForm from "./DepositForm"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchAllDropdownsAndMetadata } from "../../actions/dropdownActions"
import { useSelector } from "../../lib/redux"

interface DepositHolderProps {
    depositId: DepositId
    depositState: DepositState
    history: H.History
}

const DepositHolder = ({ depositId, depositState, history }: DepositHolderProps) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllDropdownsAndMetadata(depositId))
    }, [])

    const { metadata } = useSelector(state => state.depositForm.initialState)

    switch (depositState.label) {
        case DepositStateLabel.IN_PROGRESS:
        case DepositStateLabel.SUBMITTED:
        case DepositStateLabel.ARCHIVED:
            return (
                <DepositNotAccessible depositState={depositState}
                                      metadata={metadata}/>
            )
        default:
            return (
                <DepositForm depositId={depositId}
                             depositState={depositState}
                             metadata={metadata}
                             history={history}/>
            )
    }
}

export default DepositHolder
