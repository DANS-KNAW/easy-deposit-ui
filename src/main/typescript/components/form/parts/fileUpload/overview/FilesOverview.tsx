import * as React from "react"
import FilesTableHead from "./FilesTableHead"
import FilesTableRow from "./FilesTableRow"
import "../../../../../../resources/css/filesOverviewTable.css"

// <temp>
export interface FileInfo {
    filename: string
    dirpath: string
    sha1sum: string
}

const files: { [filepath: string]: FileInfo } = {
    "/leesplankje/firstrow/aap.txt": {
        filename: "aap.txt",
        dirpath: "/leesplankje/firstrow/",
        sha1sum: "ab3aa0555f31a8d7809fae4b03a95195edb01f5c",
    },
    "/leesplankje/firstrow/noot.txt": {
        filename: "noot.txt",
        dirpath: "/leesplankje/firstrow/",
        sha1sum: "de3aa0555f31a8d7809fae4b03a95195edb09f1e",
    },
    "/leesplankje/secondrow/teun.txt": {
        filename: "teun.txt",
        dirpath: "/leesplankje/secondrow/",
        sha1sum: "ef4bb1666042b9e891a0bf5c14ba6206fec1a02f",
    },
}
// </temp>

interface FilesOverviewProps {

}

const FilesOverview = (props: FilesOverviewProps) => (
    <div className="container pl-0 pr-0">
        <table className="table table-hover file_table">
            <FilesTableHead/>
            <tbody>{Object.keys(files).map(filepath =>
                <FilesTableRow key={filepath} fileInfo={files[filepath]}/>,
            )}</tbody>
        </table>
    </div>
)

export default FilesOverview
