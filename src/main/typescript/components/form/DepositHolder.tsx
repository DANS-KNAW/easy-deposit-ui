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
