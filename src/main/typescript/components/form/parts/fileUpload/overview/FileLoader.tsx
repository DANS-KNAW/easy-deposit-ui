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
import "../../../../../../resources/css/fileLoader.css"

enum UploadStatus {
    DONE = "done",
    CANCELED = "canceled",
    ERROR = "error",
    FAILED = "failed",
}

interface FileLoaderProps<Response> {
    file?: File | null
    preventReload?: boolean
    showCancelBtn?: boolean
    url: string
    validFileTypes?: {
        whitelist?: string[],
        blacklist?: string[],
        errorMessage: string,
    }
    onUploadFinished?: {
        responseParser: (raw: any) => Response
        uploadFinishedCallback: (file: File, response: Response) => void
    }
}

interface FileLoaderState {
    error?: boolean
    errorMessage?: string
    loading?: boolean
    percentage?: number
    request?: XMLHttpRequest
    uploaded?: boolean
    uploadStatus?: UploadStatus
}

class FileLoader<Response> extends Component<FileLoaderProps<Response>, FileLoaderState> {
    constructor(props: FileLoaderProps<Response>) {
        super(props)
        this.state = {
            error: false,
            errorMessage: "",
            loading: false,
            percentage: 0,
            request: undefined,
            uploaded: false,
            uploadStatus: undefined,
        }
    }

    validateFile: (file: File) => boolean = ({ type }) => {
        const { validFileTypes } = this.props

        if (validFileTypes) {
            // functions to ensure lazy evaluation
            const typeOnWhitelist = () => validFileTypes.whitelist ? validFileTypes.whitelist.indexOf(type) >= 0 : true
            const typeOnBlacklist = () => validFileTypes.blacklist ? validFileTypes.blacklist.indexOf(type) >= 0 : false

            if (!typeOnWhitelist() || typeOnBlacklist()) {
                this.setState(prevState => ({
                    ...prevState,
                    error: true,
                    errorMessage: validFileTypes.errorMessage,
                }))
                return false
            }
        }

        this.setState(prevState => ({
            ...prevState,
            error: false,
            errorMessage: "",
            uploaded: false,
            loading: false,
        }))
        return true
    }

    uploadFile: (file: File, url: string) => XMLHttpRequest = (file, url) => {
        const { preventReload, onUploadFinished } = this.props

        if (preventReload)
            window.addEventListener("beforeunload", this.beforeUnloadFn)
        this.setState(prevState => ({ ...prevState, loading: true }))

        const formData = new FormData()
        formData.append("files", file)

        const request = new XMLHttpRequest()
        url && request.open("POST", url)

        request.addEventListener("load", () => {
            const uploadStatus = request.status === 200 ? UploadStatus.DONE : UploadStatus.ERROR

            if (onUploadFinished) {
                const response = onUploadFinished.responseParser(request.response)
                onUploadFinished.uploadFinishedCallback(file, response)
            }
            this.uploadFinished({ uploaded: true, uploadStatus: uploadStatus, request: undefined })
        }, false)

        request.addEventListener("error", () => {
            this.uploadFinished({ uploaded: true, uploadStatus: UploadStatus.FAILED, request: undefined })
        }, false)

        request.upload.addEventListener("progress", e => {
            const percentage = parseInt(`${(e.loaded / e.total) * 100}`, 10)
            this.setUploadedPercentage(percentage)
        }, false)

        request.send(formData)

        return request
    }

    beforeUnloadFn = (e: BeforeUnloadEvent) => {
        e.preventDefault()
        return e.returnValue = "Are you sure you want to leave?"
    }

    setUploadedPercentage = (percentage: number) => {
        this.setState(prevState => ({ ...prevState, percentage }))
    }

    uploadFinished: (data: FileLoaderState) => void = data => {
        this.setState(prevState => ({ ...prevState, ...data }))
        if (this.props.preventReload)
            window.removeEventListener("beforeunload", this.beforeUnloadFn)
    }

    cancelUpload = () => {
        if (this.state.request)
            this.state.request.abort()
        this.uploadFinished({ uploaded: true, uploadStatus: UploadStatus.CANCELED, request: undefined })
    }

    componentDidMount() {
        if (!this.state.request
            && this.props.file
            && this.validateFile(this.props.file)) {
            const request = this.uploadFile(this.props.file, this.props.url)
            this.setState({
                error: false,
                errorMessage: "",
                loading: true,
                percentage: 0,
                request: request,
                uploaded: false,
                uploadStatus: undefined,
            })
        }
    }

    componentDidUpdate(prevProps: FileLoaderProps<Response>) {
        if (!this.state.request
            && this.props.file
            && prevProps.file != this.props.file
            && this.validateFile(this.props.file)) {
            const request = this.uploadFile(this.props.file, this.props.url)
            this.setState({
                error: false,
                errorMessage: "",
                loading: true,
                percentage: 0,
                request: request,
                uploaded: false,
                uploadStatus: undefined,
            })
        }
    }

    generateStatusClassName = () => {
        const { loading, uploaded, uploadStatus } = this.state
        const defaultClassName = "file_progress-status"

        if (!loading)
            return defaultClassName

        if (!uploaded)
            return `${defaultClassName} show`

        switch (uploadStatus) {
            case UploadStatus.DONE:
                return `${defaultClassName} show finished success`
            case UploadStatus.FAILED:
                return `${defaultClassName} show finished failed`
            case UploadStatus.ERROR:
                return `${defaultClassName} show finished error`
            case UploadStatus.CANCELED:
                return `${defaultClassName} show finished canceled`
        }
    }

    render() {
        console.log("state", this.state)

        const { file, showCancelBtn } = this.props
        const { percentage, uploaded, uploadStatus, error, errorMessage } = this.state

        if (file)
            if (error)
                return <div className='error_msg'>{errorMessage}</div>
            else {
                const progressStatus = uploaded ? uploadStatus : `${percentage}%`
                const cancel = showCancelBtn && uploadStatus !== UploadStatus.DONE
                    ? (
                        <div className='cancel_btn-wrapper'>
                            <button type='button' className='cancel_btn' onClick={this.cancelUpload}>Cancel</button>
                        </div>
                    )
                    : ""

                return (
                    <div className="file_progress-wrapper">
                        <div className="file_progress" style={{ width: percentage + "%" }}>
                            <span className={this.generateStatusClassName()}>{progressStatus}</span>
                        </div>
                        {cancel}
                    </div>
                )
            }
        else
            return null
    }
}

export default FileLoader