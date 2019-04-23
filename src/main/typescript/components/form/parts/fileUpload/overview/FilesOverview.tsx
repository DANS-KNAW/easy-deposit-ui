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
import { FileOverviewState, Files } from "../../../../../model/FileInfo"
import { connect } from "react-redux"
import { AppState } from "../../../../../model/AppState"
import { DepositId } from "../../../../../model/Deposits"
import { FetchAction, PromiseAction } from "../../../../../lib/redux"
import {
    askConfirmationToDeleteFile,
    cancelDeleteFile,
    deleteFile,
    fetchFiles,
} from "../../../../../actions/fileOverviewActions"
import { Action } from "redux"
import { uploadFileUrl } from "../../../../../selectors/serverRoutes"
import EmptyFileTableRow from "./EmptyFileTableRow"
import { CloseableWarning } from "../../../../Errors"
import Paginationable from "../../../../Paginationable"

interface FilesOverviewInputProps {
    depositId: DepositId
}

interface FilesOverviewProps {
    files: FileOverviewState
    fileUploadUrl: (filePath: string) => string

    fetchFiles: (depositId: DepositId) => FetchAction<Files>
    deleteFile: (depositId: DepositId, filePath: string) => PromiseAction<void>
    askConfirmationToDeleteFile: (filePath: string) => Action
    cancelDeleteFile: (filePath: string) => Action
}

class FilesOverview extends Component<FilesOverviewProps & FilesOverviewInputProps> {
    render() {
        const { files: { loading: { loading, loaded } } } = this.props

        return (
            <>
                {loading && <p>loading files ...</p>}
                {this.renderDeleteError()}
                {loaded && this.renderTableView()}
            </>
        )
    }

    deleteFile = (depositId: DepositId, filepath: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        this.props.deleteFile(depositId, filepath)
    }
    askConfirmation = (filepath: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        this.props.askConfirmationToDeleteFile(filepath)
    }
    cancelDeleteFile = (filepath: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        this.props.cancelDeleteFile(filepath)
    }

    private renderDeleteError() {
        const { files: { deleting } } = this.props

        return Object.keys(deleting)
            .map(fileId => {
                const { deleteError } = deleting[fileId]

                if (deleteError) {
                    const errorText = `Cannot delete file '${fileId}'. An error occurred: ${deleteError}.`

                    return <CloseableWarning key={`deleteError.${fileId}`}>{errorText}</CloseableWarning>
                }
            })
    }

    private renderTable = (filePaths: string[], filePathsCount: number) => {
        const { files: { files, deleting }, depositId } = this.props

        return (
            <table className="table table-striped file_table">
                <FilesTableHead/>
                <tbody>{filePathsCount == 0
                    ? <EmptyFileTableRow/>
                    : filePaths.map(filepath =>
                        <FilesTableRow
                            key={filepath}
                            deleting={deleting[filepath]}
                            deleteFile={this.deleteFile(depositId, filepath)}
                            fileInfo={files[filepath]}
                            askConfirmation={this.askConfirmation(filepath)}
                            cancelDeleteFile={this.cancelDeleteFile(filepath)}
                        />,
                    )
                }</tbody>
            </table>
        )
    }

    private renderTableView = () => (
        <Paginationable pagesShown={5}
                        entries={this.props.files.loading.loaded ? Object.keys(this.props.files.files) : []}
                        renderEntries={this.renderTable}/>
    )
}

const mapStateToProps = (state: AppState, ownProps: FilesOverviewInputProps) => ({
    files: state.files,
    fileUploadUrl: (filePath: string) => uploadFileUrl(ownProps.depositId, filePath)(state),
})

export default connect(mapStateToProps, {
    fetchFiles,
    deleteFile,
    askConfirmationToDeleteFile,
    cancelDeleteFile,
})(FilesOverview)
