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
import { DeleteState, FileInfo } from "../../../../../model/FileInfo"

interface FilesTableRowProps {
    fileInfo: FileInfo
    deleting: DeleteState
    askConfirmation: (e: React.MouseEvent<HTMLButtonElement>) => void
    cancelDeleteFile: (e: React.MouseEvent<HTMLButtonElement>) => void
    deleteFile: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const FilesTableRow = ({ fileInfo, deleting, deleteFile, askConfirmation, cancelDeleteFile }: FilesTableRowProps) => {
    const isDeleting = deleting && deleting.deleting


    const deleteButton =
        <button key="delete"
                className="close icon"
                style={{ float: "unset" }}
                disabled={isDeleting}
                onClick={askConfirmation}>
            {isDeleting
                ? <i className="fas fa-sync-alt fa-spin"/>
                : <i className="fas fa-trash-alt"/>}
        </button>
    const confirmButtons = deleting && deleting.deleting
        ? <div>
            <button type="button" className="btn btn-dark bg-danger mb-0 mr-1" onClick={deleteFile}>Delete File</button>
            <button type="button" className="btn btn-dark mb-0 ml-1" onClick={cancelDeleteFile}>Cancel</button>
          </div>
        : ""

    return (
        <tr className="row ml-0 mr-0">
            {/* these column sizes need to match with the sizes in FilesTableHead and FileLoaderRow */}
            <td className="col col-10 col-sm-11 col-md-5" scope="row">
                {fileInfo.dirpath + fileInfo.filename}
                {confirmButtons}
            </td>
            <td className="col col-12 col-sm-12 col-md-6">{fileInfo.sha1sum}</td>
            <td className="col col-2 col-sm-1 col-md-1" id="actions_cell">{deleteButton}</td>
        </tr>
    )
}

export default FilesTableRow
