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
import FilesTableHead from "./FilesTableHead"
import FilesTableRow from "./FilesTableRow"
import "../../../../../../resources/css/filesOverviewTable.css"
import { FileOverviewState, Files } from "../../../../../model/FileInfo"
import { connect } from "react-redux"
import { AppState } from "../../../../../model/AppState"
import { DepositId } from "../../../../../model/Deposits"
import { ChangeEvent, Component } from "react"
import { FetchAction, PromiseAction, ThunkAction } from "../../../../../lib/redux"
import { askConfirmation, cancelDeleteFile, deleteFile, fetchFiles } from "../../../../../actions/fileOverviewActions"
import { Action } from "redux"
import FileLoader from "react-file-loader"

interface FilesOverviewProps {
    depositId: DepositId
    files: FileOverviewState

    fetchFiles: (depositId: DepositId) => ThunkAction<FetchAction<Files>>
    deleteFile: (depositId: DepositId, filePath: string) => ThunkAction<PromiseAction<void>>
    askConfirmation: (filePath: string) => Action
    cancelDeleteFile: (filePath: string) => Action
}

interface FilesOverviewLocalState {
    uploadingFile?: object
}

class FilesOverview extends Component<FilesOverviewProps, FilesOverviewLocalState> {

    constructor(props: FilesOverviewProps) {
        super(props)
        this.state = {
            uploadingFile: undefined,
        }

    }

    render() {
        const { files: { loading: { loading, loaded } } } = this.props

        return (
            <>
                {loading && <p>loading files ...</p>}
                {loaded && this.renderTable()}
            </>
        )
    }

    deleteFile = (depositId: DepositId, filepath: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        this.props.deleteFile(depositId, filepath)
    }
    askConfirmation = (filepath: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        this.props.askConfirmation(filepath)
    }
    cancelDeleteFile = (filepath: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        this.props.cancelDeleteFile(filepath)
    }

    uploadFile (e: ChangeEvent<HTMLInputElement>) {
        this.setState(prevState => ({ ...prevState, uploadingFile: e.target.files[0]}))
    }

    private renderTable() {
        const { files: { files, deleting }, depositId } = this.props

        return (

            <div style={{width: '500px', margin: '0 auto'}}>
                <h2 style={{textAlign: 'center'}}>Demo Of File Loader</h2>
                <input type='file' onChange={(e) => this.uploadFile(e)} />
                <FileLoader
                    showCancelBtn
                    file={this.state.uploadingFile || null}
                    requestSuccessParam='status'
                    requestSuccessVal='ok'
                    url='#' />

                <table className="table table-striped file_table">
                    <FilesTableHead/>
                    <tbody>{Object.keys(files).map(filepath =>
                        <FilesTableRow
                            key={filepath}
                            deleting={deleting[filepath]}
                            deleteFile={this.deleteFile(depositId, filepath)}
                            fileInfo={files[filepath]}
                            askConfirmation = {this.askConfirmation(filepath)}
                            cancelDeleteFile={this.cancelDeleteFile(filepath)}
                        />,
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

export default connect(mapStateToProps, { fetchFiles, deleteFile, askConfirmation, cancelDeleteFile })(FilesOverview)
