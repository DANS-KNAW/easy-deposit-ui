/*
 * Copyright (C) 2018 DANS - Data Archiving and Networked Services (info@dans.knaw.nl)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
