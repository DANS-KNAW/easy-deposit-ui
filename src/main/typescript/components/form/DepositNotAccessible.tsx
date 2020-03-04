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
import { useEffect } from "react"
import { DepositState } from "../../model/DepositState"
import { DepositId, DepositStateLabel } from "../../model/Deposits"
import { Info, ReloadAlert } from "../Errors"
import { useSelector } from "../../lib/redux"
import { shallowEqual, useDispatch } from "react-redux"
import { fetchMetadata } from "../../actions/depositFormActions"
import Loading from "../Loading"

interface DepositUnavailableProps {
    depositId: DepositId
    depositState: DepositState
}

const DepositNotAccessible = ({ depositId, depositState }: DepositUnavailableProps) => {
    const metadata = useSelector(state => state.depositForm.initialState.metadata, shallowEqual)
    const { fetching, fetched, fetchError } = useSelector(state => state.depositForm.fetchMetadata, shallowEqual)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMetadata(depositId))
    }, [])

    if (fetching)
        return <Loading/>
    else if (fetchError)
        return (
            <ReloadAlert key="loadingError"
                         reload={() => dispatch(fetchMetadata(depositId))}>
                An error occurred: {fetchError}. Cannot load this deposit right now.
                If this persists, please <a href="mailto:info@dans.knaw.nl" target="_blank">contact us</a>.
            </ReloadAlert>
        )
    else if (fetched && metadata) {
        const title: string | undefined = metadata.titles && metadata.titles.length > 0 ? metadata.titles[0] : undefined
        const doi = metadata.doi

        const start = title && doi
            ? <span>The deposit '<i>{title}</i>' (DOI {doi})</span>
            : <span>Your deposit</span>
        const end = depositState.description &&
            <span style={{ whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{ __html: depositState.description }}/>
        switch (depositState.label) {
            case DepositStateLabel.SUBMITTED:
                return <Info>{start} has been submitted. {end}</Info>
            case DepositStateLabel.ARCHIVED:
                return <Info>{start} has already been archived. {end}</Info>
            case DepositStateLabel.IN_PROGRESS:
            default:
                return <Info>{start} is in review. {end}</Info>
        }
    }
    else
        return null
}

export default DepositNotAccessible
