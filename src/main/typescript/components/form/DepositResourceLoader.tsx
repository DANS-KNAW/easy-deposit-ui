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
import { ReloadAlert } from "../Errors"
import Loading from "../Loading"
import { dropDownFetchState } from "../../selectors/dropdown"
import { fetchAllDropdowns } from "../../actions/dropdownActions"

interface DepositResourceLoaderProps {
    depositId: DepositId

    renderForm: (depositState: DepositState) => ReactNode
    renderNotFound: () => ReactNode
}

const DepositResourceLoader: FC<DepositResourceLoaderProps> = ({ depositId, renderForm, renderNotFound }) => {
    const depositStateFetchState = useSelector(state => state.depositForm.fetchDepositState)
    const dropdownsFetchState = useSelector(dropDownFetchState)
    const depositState = useSelector(state => state.depositForm.initialState.depositState)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchDepositState(depositId))
        dispatch(fetchAllDropdowns)
    }, [])

    if (depositStateFetchState.fetching || dropdownsFetchState.fetching)
        return (
            <Loading/>
        )
    else if (depositStateFetchState.stateNotFound)
        return <>{renderNotFound()}</>
    else if (depositStateFetchState.fetchError || dropdownsFetchState.fetchError) {
        const errorMsg = (depositStateFetchState.fetchError ? depositStateFetchState.fetchError + "\n" : "") +
            (dropdownsFetchState.fetchError || "")
        return (
            <ReloadAlert key="loadingError"
                         reload={() => dispatch(fetchDepositState(depositId))}>
                An error occurred: {errorMsg}. Cannot load this deposit right now.
                If this persists, please <a href="mailto:info@dans.knaw.nl" target="_blank">contact us</a>.
            </ReloadAlert>
        )
    }
    else if (depositStateFetchState.fetched && dropdownsFetchState.fetched && depositState)
        return <>{renderForm(depositState)}</>
    else
        return null
}

export default DepositResourceLoader
