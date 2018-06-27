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
import axios from "axios"
import { listFiles } from "../../../../../constants/serverRoutes"
import { DepositId } from "../../../../../model/Deposits"

// <temp>
export interface FileInfo {
    filename: string
    dirpath: string
    sha1sum: string
}
// </temp>

interface FilesOverviewProps {
    depositId: DepositId
}

interface FilesOverviewState {
    files: { [filepath: string]: FileInfo }
    fetchingFiles: boolean
    fetchedFiles: boolean
}

class FilesOverview extends Component<FilesOverviewProps, FilesOverviewState> {
    constructor(props: FilesOverviewProps) {
        super(props)
        this.state = {
            files: {},
            fetchingFiles: false,
            fetchedFiles: false,
        }
    }

    async componentDidMount() {
        this.setState(prevState => ({ ...prevState, fetchingFiles: true }))

        const url = await listFiles(this.props.depositId)
        const response = await axios.get(url)

        const data = response.data
            .reduce((collected: { [filepath: string]: FileInfo }, info: any) => ({
                ...collected,
                [info.dirpath + info.filename]: {
                    filename: info.filename,
                    dirpath: info.dirpath,
                    sha1sum: info.sha1sum,
                },
            }), {})

        this.setState(prevState => ({ ...prevState, files: data, fetchedFiles: true, fetchingFiles: false }))
    }

    render() {
        return (
            <>
                {this.state.fetchingFiles && <p>Fetching file listing</p>}
                {this.state.fetchedFiles && this.renderTable()}
            </>
        )
    }

    private renderTable() {
        return (
            <div className="container pl-0 pr-0">
                <table className="table table-hover file_table">
                    <FilesTableHead/>
                    <tbody>{Object.keys(this.state.files).map(filepath =>
                        <FilesTableRow key={filepath} fileInfo={this.state.files[filepath]}/>,
                    )}</tbody>
                </table>
            </div>
        )
    }
}

export default FilesOverview
