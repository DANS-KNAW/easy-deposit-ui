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
import { Files } from "../../../../../model/FileInfo"
import { connect } from "react-redux"
import { AppState } from "../../../../../model/AppState"
import { DepositId } from "../../../../../model/Deposits"

interface FilesOverviewProps {
    depositId: DepositId
    files: Files
}

const FilesOverview = ({ files }: FilesOverviewProps) => (
    <div className="container pl-0 pr-0">
        <table className="table table-hover file_table">
            <FilesTableHead/>
            <tbody>{Object.keys(files).map(filePath =>
                <FilesTableRow key={filePath} fileInfo={files[filePath]}/>,
            )}</tbody>
        </table>
    </div>
)

const mapStateToProps = (state: AppState) => ({
    files: state.files.files,
})

export default connect(mapStateToProps)(FilesOverview)
