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
import { useDispatch } from "react-redux"
import { DepositId } from "../../../../../model/Deposits"
import { useSelector } from "../../../../../lib/redux"
import { askConfirmationToDeleteFile, cancelDeleteFile, deleteFile } from "../../../../../actions/fileOverviewActions"
import EmptyFileTableRow from "./EmptyFileTableRow"
import { CloseableWarning } from "../../../../Errors"
import Paginationable from "../../../../Paginationable"

interface FilesOverviewProps {
    depositId: DepositId
}

const FilesOverview = ({ depositId }: (FilesOverviewProps)) => {
    const files = useSelector(state => state.files)
    const dispatch = useDispatch()

    function doDeleteFile(depositId: DepositId, filepath: string) {
        return function (e: React.MouseEvent<HTMLButtonElement>) {
            e.stopPropagation()
            dispatch(deleteFile(depositId, filepath))
        }
    }

    function doAskConfirmation(filepath: string) {
        return function (e: React.MouseEvent<HTMLButtonElement>) {
            e.stopPropagation()
            dispatch(askConfirmationToDeleteFile(filepath))
        }
    }

    function doCancelDeleteFile(filepath: string) {
        return function (e: React.MouseEvent<HTMLButtonElement>) {
            e.stopPropagation()
            dispatch(cancelDeleteFile(filepath))
        }
    }

    function renderDeleteError() {
        return Object.keys(files.deleting)
            .map(fileId => {
                const { deleteError } = files.deleting[fileId]

                if (deleteError) {
                    const errorText = `Cannot delete file '${fileId}'. An error occurred: ${deleteError}.`

                    return <CloseableWarning key={`deleteError.${fileId}`}>{errorText}</CloseableWarning>
                }
            })
    }

    function renderTable(filePaths: string[], filePathsCount: number) {
        return (
            <table className="table table-striped file_table">
                <FilesTableHead/>
                <tbody>{filePathsCount == 0
                    ? <EmptyFileTableRow/>
                    : filePaths.map(filepath =>
                        <FilesTableRow
                            key={filepath}
                            deleting={files.deleting[filepath]}
                            deleteFile={doDeleteFile(depositId, filepath)}
                            fileInfo={files.files[filepath]}
                            askConfirmation={doAskConfirmation(filepath)}
                            cancelDeleteFile={doCancelDeleteFile(filepath)}
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
                            entries={files.loading.loaded ? Object.keys(files.files) : []}
                            renderEntries={renderTable}/>
        )
    }

    return (
        <>
            {files.loading.loading && <p>loading files ...</p>}
            {renderDeleteError()}
            {files.loading.loaded && renderTableView()}
        </>
    )
}

export default FilesOverview
