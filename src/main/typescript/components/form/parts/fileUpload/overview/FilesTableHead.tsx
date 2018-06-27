import * as React from "react"

const FilesTableHead = () => (
    <thead>
    <tr className="row ml-0 mr-0">
        {/* these column sizes need to match with the sizes in FilesTableRow */}
        <th className="col-10 col-sm-11 col-md-5" scope="col">File</th>
        <th className="col-12 col-sm-12 col-md-6" scope="col">Checksum</th>
        <th className="col-2  col-sm-1  col-md-1" scope="col" id="actions_cell"/>
    </tr>
    </thead>
)

export default FilesTableHead
