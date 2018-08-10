import * as React from "react"
import { SFC } from "react"
import { AppState } from "../model/AppState"
import { connect } from "react-redux"
import FetchState from "../model/FetchState"
import { getConfigurationFetchState } from "../selectors/configuration"

interface ConfiguredAppProps {
    configurationState: FetchState
}

const ConfiguredApp: SFC<ConfiguredAppProps> = ({ children, configurationState: { fetching, fetched, fetchError } }) => (
    <>
        {fetching && <p>Loading configuration...</p>}
        {fetched && children}
        {fetchError && <p>Application configuration could not be loaded: {fetchError}</p>}
    </>
)

const mapStateToProps = (state: AppState) => ({
    configurationState: getConfigurationFetchState(state),
})

export default connect(mapStateToProps)(ConfiguredApp)
