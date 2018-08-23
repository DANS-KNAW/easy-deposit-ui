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

interface FilesTableRowProps {
    fileInfo: FileInfo
}

const FilesTableRow = ({ fileInfo }: FilesTableRowProps) => {
    /*const deleteButton =
        <button key="delete"
                className="close icon"
                style={{ float: "unset" }}
                disabled={isDeleting}
                onClick={deleteDatafile}>
            {isDeleting
                ? <i className="fas fa-sync-alt fa-spin"/>
                : <i className="fas fa-trash-alt"/>}
        </button>*/

    const deleteButton =
        <button key="delete"
                className="close icon"
                style={{ float: "unset" }}
                disabled={true}>
            <i className="fas fa-trash-alt"/>
        </button>

    return (
        <tr className="row ml-0 mr-0">
            {/* these column sizes need to match with the sizes in FilesTableHead */}
            <td className="col col-10 order-1 col-sm-11 order-sm-1 col-md-5 order-md-1" scope="row">
                {fileInfo.dirpath + fileInfo.filename}
            </td>
            <td className="col col-12 order-4 col-sm-12 order-sm-4 col-md-6 order-md-3">
                {fileInfo.sha1sum}
            </td>
            <td className="col col-2  order-2 col-sm-1  order-sm-2 col-md-1 order-md-5" id="actions_cell">
                {deleteButton}
            </td>
        </tr>
    )
}

export default FilesTableRow
