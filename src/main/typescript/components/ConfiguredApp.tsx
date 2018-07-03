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
import {Action } from "redux"
import {Component} from "react";
import {Configuration, ConfigurationState} from "../model/Configuration";
import {fetchConfiguration} from "../actions/configurationActions";
import {AppState} from "../model/AppState";
import {connect} from "react-redux";
import {ReduxAction} from "../lib/redux";

interface ConfiguredAppProps {
    configurationState: ConfigurationState
    fetchConfiguration: () => ReduxAction<Promise<Configuration>>
}

class ConfiguredApp extends Component<ConfiguredAppProps> {
    constructor(props: ConfiguredAppProps) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchConfiguration()
    }

    render() {
        const {children, configurationState: {fetchingConfig, fetchedConfig, fetchConfigError}} = this.props
        return (
            <>
                {fetchingConfig && <p>Loading configuration...</p>}
                {fetchedConfig && children}
                {fetchConfigError && <p>Application configuration could not be loaded: {fetchConfigError}</p>}
            </>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    configurationState: state.configState,
})


export default connect(mapStateToProps, {fetchConfiguration})(ConfiguredApp)