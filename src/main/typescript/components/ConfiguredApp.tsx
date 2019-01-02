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
import { AppState } from "../model/AppState"
import { connect } from "react-redux"
import FetchState from "../model/FetchState"
import { getConfigurationFetchState } from "../selectors/configuration"

interface ConfiguredAppProps {
    configurationState: FetchState
}

const ConfiguredApp: FC<ConfiguredAppProps> = ({ children, configurationState: { fetching, fetched, fetchError } }) => (
    <>
        {/* TODO we need something better here than a loading text */}
        {fetching && <p>Loading configuration...</p>}
        {fetched && children}
        {fetchError && <p>Application configuration could not be loaded: {fetchError}</p>}
    </>
)

const mapStateToProps = (state: AppState) => ({
    configurationState: getConfigurationFetchState(state),
})

export default connect(mapStateToProps)(ConfiguredApp)
