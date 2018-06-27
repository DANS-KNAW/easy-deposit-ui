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

import { ReduxAction } from "../../../../lib/redux"
import { Component } from "react"
import { connect } from "react-redux"
import { AppState } from "../../../../model/AppState"
import { FilePath, DatafileOverviewState } from "../../../../model/Datafiles"
import { deleteDatafiles, fetchDatafiles} from "../../../../actions/fileInfoActions"
import { ReloadAlert, CloseableWarning, Alert } from "../../../../Errors"
import * as React from "react"
import { DepositId } from "../../../../model/Deposits"
import DatafileTableHead from "./DatafileTableHead"
import DatafileTableRow from "./DatafileTableRow"

export interface DataFormData {
    // TODO not yet implemented in mock server side
}

interface DatafilesOverviewProps {
    datafiles: DatafileOverviewState
    depositId: DepositId
    fetchDatafiles: (depositId: DepositId, dirpath: string) =>  ReduxAction<Promise<any>>
    deleteDatafiles: (depositId: DepositId, filepath: FilePath) => ReduxAction<Promise<void>>
}

class DatafilesOverview extends Component<DatafilesOverviewProps> {
    constructor(props: DatafilesOverviewProps) {
        super(props)
    }
    fetchFiles = () => this.props.fetchDatafiles(this.props.depositId, "root")

    componentDidMount() {
        this.props.fetchDatafiles(this.props.depositId, "root")
    }

    render() {
        const { datafiles: { loadingState: { loading, loaded } } } = this.props

        return (
            <>
                {this.renderAlerts()}
                {loading && <p>loading data...</p>}
                {loaded && this.renderTable()}
            </>
        )
    }

    private renderAlerts() {
        return [
            this.renderLoadingError(),
            this.renderDeleteError(),
        ]
    }

    private renderLoadingError() {
        const { datafiles: { loadingState: { loadingError } } } = this.props

        return loadingError &&
            <ReloadAlert key="loadingError"
                         reload={this.fetchFiles}>
                An error occurred: {loadingError}. Cannot load data from the server.
            </ReloadAlert>
    }

    private renderDeleteError() {
        const { datafiles: { deleting, datafiles } } = this.props

        return Object.keys(deleting)
            .map(filepath => {
                const { deleteError } = deleting[filepath]

                if (deleteError) {
                    const datafile = datafiles[filepath]
                    const errorText = datafile
                        ? `Cannot delete file '${datafile.filename}'. An error occurred: ${deleteError}.`
                        : `Cannot delete a file. An error occurred: ${deleteError}.`

                    return <CloseableWarning>{errorText}</CloseableWarning>
                }
            })
    }

    private renderTable() {
        const { datafiles: { datafiles, deleting }, deleteDatafiles } = this.props
        const depId = this.props.depositId


        return (
            <table className="table table-hover">
                <DatafileTableHead/>
                <tbody>{Object.keys(datafiles).map((filepath) =>
                    <DatafileTableRow key={filepath}
                                     datafile={datafiles[filepath]}
                                     deleting={deleting[filepath]}
                                     deleteDatafile={() => deleteDatafiles(depId, filepath)}/>,
                )}</tbody>
            </table>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    datafiles: state.datafiles,
})

export default connect(mapStateToProps, { fetchDatafiles, deleteDatafiles })(DatafilesOverview)

