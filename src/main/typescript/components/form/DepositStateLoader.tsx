import * as React from "react"
import { FC, ReactNode, useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchDepositState } from "../../actions/depositFormActions"
import { DepositId } from "../../model/Deposits"
import { useSelector } from "../../lib/redux"
import { DepositState } from "../../model/DepositState"

interface DepositStateLoaderProps {
    depositId: DepositId

    renderForm: (depositState: DepositState) => ReactNode
    renderNotFound: () => ReactNode
}

const DepositStateLoader: FC<DepositStateLoaderProps> = ({ depositId, renderForm, renderNotFound }) => {
    const { fetching, fetched, fetchError, stateNotFound } = useSelector(state => state.depositForm.fetchDepositState)
    const { depositState } = useSelector(state => state.depositForm.initialState)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchDepositState(depositId))
    }, [])

    if (fetching && !depositState)
        return (<p>State is being fetched...</p>)
    else if (stateNotFound)
        return <>{renderNotFound()}</>
    else if (fetchError)
        return (<p>State could not be fetched: {fetchError}</p>)
    // if the depositState is fetched and present
    // or the depositState is being fetched right now, but is also already present (rerender)
    else if ((fetched && depositState) || (fetching && depositState))
        return <>{renderForm(depositState)}</>
    else
        return null
}

export default DepositStateLoader
