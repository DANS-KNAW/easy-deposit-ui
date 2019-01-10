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
import { AppState } from "../../../../../model/AppState"
import { uploadFileUrl } from "../../../../../selectors/serverRoutes"
import { connect } from "react-redux"
import { fetchFiles } from "../../../../../actions/fileOverviewActions"
import { DepositId } from "../../../../../model/Deposits"
import { FetchAction } from "../../../../../lib/redux"
import { Files } from "../../../../../model/FileInfo"
import { Alert } from "../../../../Errors"

interface FileUploaderInputProps {
    depositId: DepositId
}

interface FileUploaderProps {
    fileUploadUrl: string

    fetchFiles: (depositId: DepositId) => FetchAction<Files>
}

interface FileUploaderState {
    uploadingFile?: File | null
    errorMessage?: string
}

class FileUploader extends Component<FileUploaderProps & FileUploaderInputProps, FileUploaderState> {
    constructor(props: FileUploaderProps & FileUploaderInputProps) {
        super(props)
        this.state = FileUploader.initialState
    }

    static initialState: FileUploaderState = {
        uploadingFile: null,
        errorMessage: undefined,
    }

    static uploadFileState: (file?: File) => FileUploaderState = file => ({
        uploadingFile: file,
        errorMessage: undefined,
    })

    uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]
        this.setState(FileUploader.uploadFileState(file || undefined))
        e.target.value = ""
    }

    uploadFinished = () => {
        this.setState(prevState => ({ ...prevState, uploadingFile: undefined }))
        this.props.fetchFiles(this.props.depositId)
    }

    uploadCanceled = () => {
        this.setState(prevState => ({ ...prevState, uploadingFile: undefined }))
    }

    uploadFailed = (file: File) => (msg?: string) => {
        const errorMessage = `An error occurred while uploading ${file.name}${msg ? `: ${msg}` : ""}`
        this.setState(prevState => ({ ...prevState, errorMessage: errorMessage, uploadingFile: undefined }))
    }

    render() {
        return (
            <>
                <div id="upload-error-row" className="row">
                    {this.state.errorMessage && this.renderUploadError()}
                </div>
                <div id="upload-row" className="row">
                    {this.renderUploadButton()}
                    {this.renderFileLoader()}
                </div>
            </>
        )
    }

    renderUploadError() {
        const {errorMessage} = this.state
        return (
            <div className="col col-12">
                <Alert>{errorMessage}</Alert>
            </div>
        )
    }

    renderUploadButton() {
        return (
            <div className="col col-10 col-sm-11 col-md-3">
                <input type="file"
                       onChange={this.uploadFile}
                       id="file-upload"
                       disabled={!!this.state.uploadingFile}
                       className="input-file"/>
                <label className="btn btn-dark mb-0" htmlFor="file-upload">
                    {/* SVG taken from https://tympanus.net/Tutorials/CustomFileInputs/ */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
                        <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1
                                     0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7
                                     1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/>
                    </svg>
                    <span> Choose a file&hellip;</span>
                </label>
            </div>
        )
    }

    renderFileLoader() {
        return this.state.uploadingFile && (
            <div className="col col-12 col-sm-12 col-md-9">
                <FileLoader file={this.state.uploadingFile}
                            url={this.props.fileUploadUrl}
                            preventReload
                            showCancelBtn
                            onUploadFinished={this.uploadFinished}
                            onUploadCanceled={this.uploadCanceled}
                            onUploadFailed={this.uploadFailed(this.state.uploadingFile)}/>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState, ownProps: FileUploaderInputProps) => ({
    fileUploadUrl: uploadFileUrl(ownProps.depositId, "")(state),
})

export default connect(mapStateToProps, { fetchFiles })(FileUploader)
