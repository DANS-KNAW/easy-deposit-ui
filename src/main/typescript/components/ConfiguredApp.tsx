import * as React from "react"
import { SFC } from "react"
import { Configuration, ConfigurationState } from "../model/Configuration"
import { fetchConfiguration } from "../actions/configurationActions"
import { AppState } from "../model/AppState"
import { connect } from "react-redux"
import { FetchAction } from "../lib/redux"

interface ConfiguredAppProps {
    configurationState: ConfigurationState

    fetchConfiguration: () => FetchAction<Configuration>
}

const ConfiguredApp: SFC<ConfiguredAppProps> = ({ children, configurationState: { fetchingConfig, fetchedConfig, fetchConfigError } }) => (
    <>
        {fetchingConfig && <p>Loading configuration...</p>}
        {fetchedConfig && children}
        {fetchConfigError && <p>Application configuration could not be loaded: {fetchConfigError}</p>}
    </>
)

const mapStateToProps = (state: AppState) => ({
    configurationState: state.configuration,
})

export default connect(mapStateToProps, { fetchConfiguration })(ConfiguredApp)
