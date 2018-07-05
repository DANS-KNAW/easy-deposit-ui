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
import { Component } from "react"
import FilesTableHead from "./FilesTableHead"
import FilesTableRow from "./FilesTableRow"
import "../../../../../../resources/css/filesOverviewTable.css"
import { DepositId } from "../../../../../model/Deposits"
import { FileOverviewState } from "../../../../../model/FileInfo"
import { ReduxAction } from "../../../../../lib/redux"
import { connect } from "react-redux"
import { fetchFiles } from "../../../../../actions/fileOverviewActions"
import { AppState } from "../../../../../model/AppState"
import { Action } from "redux"
import { cleanDeposits } from "../../../../../actions/depositOverviewActions"

interface FilesOverviewProps {
    depositId: DepositId
    files: FileOverviewState

    fetchFiles: (depositId: DepositId, dirPath: string) => ReduxAction<Promise<void>>
}

class FilesOverview extends Component<FilesOverviewProps, FileOverviewState> {
    constructor(props: FilesOverviewProps) {
        super(props)
    }

    async componentDidMount() {
        this.props.fetchFiles(this.props.depositId, "")
    }

    render() {
        const { files: { loading: { loading, loaded } } } = this.props

        return (
            <>
                {loading && <p>Fetching file listing</p>}
                {loaded && this.renderTable()}
            </>
        )
    }

    private renderTable() {
        const { files: { files } } = this.props
        return (
            <div className="container pl-0 pr-0">
                <table className="table table-hover file_table">
                    <FilesTableHead/>
                    <tbody>{Object.keys(files).map(filePath =>
                        <FilesTableRow key={filePath} fileInfo={files[filePath]}/>,
                    )}</tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    depositId: state.depositForm.depositId,
    files: state.files,
})

export default connect(mapStateToProps, { fetchFiles, cleanDeposits })(FilesOverview)
