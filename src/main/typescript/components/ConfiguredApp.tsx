import * as React from "react"
import { Component } from "react"
import { Configuration, ConfigurationState } from "../model/Configuration"
import { fetchConfiguration } from "../actions/configurationActions"
import { AppState } from "../model/AppState"
import { connect } from "react-redux"
import { PromiseAction } from "../lib/redux"

interface ConfiguredAppProps {
    configurationState: ConfigurationState

    fetchConfiguration: () => PromiseAction<Promise<Configuration>>
}

class ConfiguredApp extends Component<ConfiguredAppProps> {
    componentDidMount() {
        this.props.fetchConfiguration()
    }

    render() {
        const { children, configurationState: { fetchingConfig, fetchedConfig, fetchConfigError } } = this.props
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
    configurationState: state.configuration,
})

export default connect(mapStateToProps, { fetchConfiguration })(ConfiguredApp)
