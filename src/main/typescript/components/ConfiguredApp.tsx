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
import { FC } from "react"
import { getConfigurationFetchState } from "../selectors/configuration"
import { useSelector } from "../lib/redux"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchConfiguration } from "../actions/configurationActions"
import { ReloadAlert } from "./Errors"
import Loading from "./Loading"

const ConfiguredApp: FC = ({ children }) => {
    const { fetching, fetched, fetchError } = useSelector(state => state.configuration.fetchState)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchConfiguration())
    }, [])

    if (fetchError)
        return (
            <ReloadAlert key="loadingError"
                         reload={() => dispatch(fetchConfiguration())}>
                An error occurred due to which you cannot access your deposits.
                If this persists, please <a href="mailto:info@dans.knaw.nl" target="_blank">contact us</a>.
            </ReloadAlert>
        )
    else if (fetching || !fetched) // currently fetching or fetching has not started
        return <div className="text-center"><Loading/></div>
    else
        return <>{children}</>
}

export default ConfiguredApp
