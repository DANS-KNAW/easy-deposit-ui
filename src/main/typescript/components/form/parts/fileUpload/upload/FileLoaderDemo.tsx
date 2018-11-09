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
import { ChangeEvent, Component } from "react"
import FileLoader from "./FileLoader"
import { DepositId } from "../../../../../model/Deposits"
import { FetchAction, ThunkAction } from "../../../../../lib/redux"
import { Files } from "../../../../../model/FileInfo"
import { AppState } from "../../../../../model/AppState"
import { uploadFileUrl } from "../../../../../selectors/serverRoutes"
import { connect } from "react-redux"
import { fetchFiles } from "../../../../../actions/fileOverviewActions"

interface FileLoaderDemoProps {
    depositId: DepositId
    fileUploadUrl: (filePath: string) => string

    fetchFiles: (depositId: DepositId) => ThunkAction<FetchAction<Files>>
}

interface FileLoaderDemoState {
    uploadingFile?: File | null
}

class FileLoaderDemo extends Component<FileLoaderDemoProps, FileLoaderDemoState> {
    constructor(props: FileLoaderDemoProps) {
        super(props)
        this.state = {
            uploadingFile: null,
        }
    }

    uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]
        this.setState(prevState => ({ ...prevState, uploadingFile: file }))
    }

    uploadFinished = (file: File) => {
        console.log("file uploaded", file)
        this.setState(prevState => ({ ...prevState, uploadingFile: undefined }))
        this.props.fetchFiles(this.props.depositId)
    }

    render() {
        return (
            <>
                <h2 style={{ textAlign: "center" }}>Demo Of File Loader</h2>
                <input type="file" onChange={this.uploadFile}/>
                <FileLoader
                    file={this.state.uploadingFile || null}
                    url={this.state.uploadingFile ? this.props.fileUploadUrl(this.state.uploadingFile.name) : "#"}
                    preventReload
                    showCancelBtn
                    validFileTypes={{
                        // blacklist: ["image/jpeg", "image/png", "video/mp4"],
                        whitelist: ["image/jpeg", "image/png", "video/mp4"],
                        errorMessage: "This type of file is not allowed.",
                    }}
                    onUploadFinished={this.uploadFinished}
                />
            </>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    depositId: state.depositForm.depositId,
    fileUploadUrl: (filePath: string) => uploadFileUrl(state.depositForm.depositId!, filePath)(state),
})

export default connect(mapStateToProps, { fetchFiles })(FileLoaderDemo)
