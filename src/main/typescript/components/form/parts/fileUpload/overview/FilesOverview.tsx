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
