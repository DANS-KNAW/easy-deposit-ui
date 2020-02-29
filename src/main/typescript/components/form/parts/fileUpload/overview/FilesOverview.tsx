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
import { shallowEqual, useDispatch } from "react-redux"
import { DepositId, DepositStateLabel } from "../../../../../model/Deposits"
import { DepositState } from "../../../../../model/DepositState"
import { emptyFiles, Files } from "../../../../../model/FileInfo"
import { useSelector } from "../../../../../lib/redux"
import { FieldProps } from "../../../../../lib/formComponents/ReduxFormUtils"
import { askConfirmationToDeleteFile, cancelDeleteFile, deleteFile } from "../../../../../actions/fileOverviewActions"
import { CloseableWarning } from "../../../../Errors"
import Loading from "../../../../Loading"
import Paginationable from "../../../../Paginationable"

export interface FileFormData {
    files?: Files
}

interface FilesOverviewProps extends FieldProps {
    depositId: DepositId
    depositState: DepositState
}

const FilesOverview = ({ input, meta, depositId, depositState }: (FilesOverviewProps)) => {
    const files = input.value || emptyFiles
    const fileErrors = meta.error
    const deletingState = useSelector(state => state.files.deleting)
    const fetchState = useSelector(state => state.depositForm.fetchFiles, shallowEqual)
    const dispatch = useDispatch()

    function doDeleteFile(depositId: DepositId, filepath: string) {
        return function (e: React.MouseEvent<HTMLButtonElement>) {
            e.stopPropagation()
            const setToDraft = depositState.label === DepositStateLabel.REJECTED
            dispatch(deleteFile(depositId, filepath, setToDraft))
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
        return Object.keys(deletingState)
            .map(fileId => {
                const { deleteError } = deletingState[fileId]

                if (deleteError) {
                    const errorText = `Cannot delete file '${fileId}'. An error occurred: ${deleteError}.`

                    return <CloseableWarning key={`deleteError.${fileId}`}>{errorText}</CloseableWarning>
                }
            })
    }

    function renderTableBody(filePaths: string[], filePathsCount: number) {
        if (fetchState.fetching && filePathsCount === 0)
            return (
                <tr className="row ml-0 mr-0">
                    <td className="col col-12 text-center" scope="row" colSpan={5}><Loading/></td>
                </tr>
            )

        if (filePathsCount === 0)
            return (
                <tr className="row ml-0 mr-0">
                    <td className="col col-12" scope="row" colSpan={3}>No files uploaded</td>
                </tr>
            )

        return filePaths.map(filepath => (
            <FilesTableRow
                key={filepath}
                deleting={deletingState[filepath]}
                deleteFile={doDeleteFile(depositId, filepath)}
                fileInfo={files[filepath]}
                askConfirmation={doAskConfirmation(filepath)}
                cancelDeleteFile={doCancelDeleteFile(filepath)}/>
        ))
    }

    function renderTable(filePaths: string[], filePathsCount: number) {
        return (
            <table className="table table-striped file_table">
                <FilesTableHead/>
                <tbody>{renderTableBody(filePaths, filePathsCount)}</tbody>
            </table>
        )
    }

    return (
        <>
            {renderDeleteError()}
            <Paginationable entryDescription="files"
                            pagesShown={5}
                            helpText="uploadFiles"
                            entries={fetchState.fetched ? Object.keys(files) : []}
                            renderEntries={renderTable}/>
        </>
    )
}

export default FilesOverview
