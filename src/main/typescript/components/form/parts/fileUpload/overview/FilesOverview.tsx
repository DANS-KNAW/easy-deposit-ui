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
import { FetchAction, PromiseAction } from "../../../../../lib/redux"
import {
    askConfirmationToDeleteFile,
    cancelDeleteFile,
    deleteFile,
    fetchFiles,
} from "../../../../../actions/fileOverviewActions"
import { Action } from "redux"
import EmptyFileTableRow from "./EmptyFileTableRow"
import { CloseableWarning } from "../../../../Errors"
import Paginationable from "../../../../Paginationable"

interface FilesOverviewInputProps {
    depositId: DepositId
}

interface FilesOverviewProps extends FilesOverviewInputProps {
    files: FileOverviewState

    fetchFiles: (depositId: DepositId) => FetchAction<Files>
    deleteFile: (depositId: DepositId, filePath: string) => PromiseAction<void>
    askConfirmationToDeleteFile: (filePath: string) => Action
    cancelDeleteFile: (filePath: string) => Action
}

const FilesOverview = (props: (FilesOverviewProps)) => {
    function deleteFile(depositId: DepositId, filepath: string) {
        return function (e: React.MouseEvent<HTMLButtonElement>) {
            e.stopPropagation()
            props.deleteFile(depositId, filepath)
        }
    }
    function askConfirmation(filepath: string) {
        return function(e: React.MouseEvent<HTMLButtonElement>) {
            e.stopPropagation()
            props.askConfirmationToDeleteFile(filepath)
        }
    }
    function cancelDeleteFile(filepath: string) {
        return function(e: React.MouseEvent<HTMLButtonElement>) {
            e.stopPropagation()
            props.cancelDeleteFile(filepath)
        }
    }

    function renderDeleteError() {
        const { files: { deleting } } = props

        return Object.keys(deleting)
            .map(fileId => {
                const { deleteError } = deleting[fileId]

                if (deleteError) {
                    const errorText = `Cannot delete file '${fileId}'. An error occurred: ${deleteError}.`

                    return <CloseableWarning key={`deleteError.${fileId}`}>{errorText}</CloseableWarning>
                }
            })
    }
    function renderTable(filePaths: string[], filePathsCount: number) {
        const { files: { files, deleting }, depositId } = props

        return (
            <table className="table table-striped file_table">
                <FilesTableHead/>
                <tbody>{filePathsCount == 0
                    ? <EmptyFileTableRow/>
                    : filePaths.map(filepath =>
                        <FilesTableRow
                            key={filepath}
                            deleting={deleting[filepath]}
                            deleteFile={deleteFile(depositId, filepath)}
                            fileInfo={files[filepath]}
                            askConfirmation={askConfirmation(filepath)}
                            cancelDeleteFile={cancelDeleteFile(filepath)}
                        />,
                    )
                }</tbody>
            </table>
        )
    }
    function renderTableView() {
        return (
            <Paginationable entryDescription="files"
                            pagesShown={5}
                            entries={props.files.loading.loaded ? Object.keys(props.files.files) : []}
                            renderEntries={renderTable}/>
        )
    }

    const { files: { loading: { loading, loaded } } } = props

    return (
        <>
            {loading && <p>loading files ...</p>}
            {renderDeleteError()}
            {loaded && renderTableView()}
        </>
    )
}

const mapStateToProps = (state: AppState) => ({
    files: state.files,
})

export default connect(mapStateToProps, {
    fetchFiles,
    deleteFile,
    askConfirmationToDeleteFile,
    cancelDeleteFile,
})(FilesOverview)
