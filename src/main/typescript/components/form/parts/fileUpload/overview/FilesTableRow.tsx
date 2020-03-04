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
import { FileInfo } from "../../../../../model/FileInfo"
import { FileDeletingState } from "../../../../../model/DepositForm"

function formatSize(bytes: number): string {
    const KB = 1024
    const MB = 1024 * KB
    const GB = 1024 * MB
    const TB = 1024 * GB

    function formatSize(unitSize: number, unit: string, fixed: number = 1): string {
        return `${parseFloat(`${bytes / unitSize}`).toFixed(fixed)} ${unit}`
    }

    if (bytes > 1.1 * TB) return formatSize(TB, "TB")
    else if (bytes > 1.1 * GB) return formatSize(GB, "GB")
    else if (bytes > 1.1 * MB) return formatSize(MB, "MB")
    else if (bytes > 1.1 * KB) return formatSize(KB, "KB")
    else return formatSize(1, "B", 0)
}

interface FilesTableRowProps {
    fileInfo: FileInfo
    errorMsg: string
    deleting?: FileDeletingState

    askConfirmation: (e: React.MouseEvent<HTMLButtonElement>) => void
    cancelDeleteFile: (e: React.MouseEvent<HTMLButtonElement>) => void
    deleteFile: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const FilesTableRow = ({ fileInfo: { fullpath, sha1sum, size }, errorMsg, deleting, deleteFile, askConfirmation, cancelDeleteFile }: FilesTableRowProps) => {
    const isDeleting = deleting?.deleting

    const deleteButton =
        <button type="button"
                key="delete"
                className="close icon"
                style={{ float: "unset" }}
                disabled={isDeleting}
                onClick={askConfirmation}>
            {isDeleting
                ? <i className="fas fa-sync-alt fa-spin"/>
                : <i className="fas fa-trash-alt"/>}
        </button>
    const confirmButtons = isDeleting &&
        <div className="mt-2 confirm-button">
            <button type="button" className="btn btn-dark bg-danger mb-0 mr-1" onClick={deleteFile}>Delete file</button>
            <button type="button" className="btn btn-dark mb-0 ml-1" onClick={cancelDeleteFile}>Cancel</button>
        </div>

    return (
        <tr className={[errorMsg ? "file-row-error" : "", "row ml-0 mr-0"].join(" ").trim()}>
            {/* these column sizes need to match with the sizes in FilesTableHead */}
            <td className="col col-10 col-sm-11 col-md-5" scope="row">
                <div>{fullpath}</div>
                {confirmButtons}
                {errorMsg && <span className="invalid-feedback">{errorMsg}</span>}
            </td>
            <td className="col col-12 col-sm-12 col-md-5">{sha1sum}</td>
            <td className="col col-12 col-sm-12 col-md-1">{formatSize(size)}</td>
            <td className="col col-2 col-sm-1 col-md-1" id="actions_cell">{deleteButton}</td>
        </tr>
    )
}

export default FilesTableRow
