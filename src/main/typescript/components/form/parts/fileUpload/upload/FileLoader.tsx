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
import { Prompt } from "react-router"
import { inDevelopmentMode } from "../../../../../lib/config"

enum UploadStatus {
    DONE = "done",
    CANCELLED = "cancelled",
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
    onUploadFinished?: () => void
    onUploadCanceled?: () => void
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

/*
 * this class was taken and modified from https://github.com/Ggayane/react-file-loader/
 * the original library seemed abandoned, did not support newer versions of React,
 * did not have TypeScript definitions and used React's deprecated life cycle methods (see React v16.3)
 */
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
        if (this.props.preventReload)
            window.addEventListener("beforeunload", this.beforeUnloadFn)

        this.setState(prevState => ({ ...prevState, loading: true }))

        const formData = new FormData()
        formData.append("files", file)

        const request = new XMLHttpRequest()
        url && request.open("POST", url)

        request.addEventListener("load", () => {
            const uploadStatus = this.handleResponse(request)
            this.uploadFinished({ ...uploadStatus, uploaded: true, request: undefined })
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

    handleResponse: (request: XMLHttpRequest) => Partial<FileLoaderState> = (request) => {
        if (request.status == 201) {
            this.props.onUploadFinished && this.props.onUploadFinished()
            return { uploadStatus: UploadStatus.DONE }
        }
        else {
            return { uploadStatus: UploadStatus.ERROR, error: true, errorMessage: request.response }
        }
    }

    uploadFinished: (data: Partial<FileLoaderState>) => void = data => {
        this.setState(prevState => ({ ...prevState, ...data }))
        if (this.props.preventReload)
            window.removeEventListener("beforeunload", this.beforeUnloadFn)
    }

    cancelUpload = () => {
        if (this.state.request)
            this.state.request.abort()
        this.uploadFinished({ uploaded: true, uploadStatus: UploadStatus.CANCELLED, request: undefined })
        this.props.onUploadCanceled && this.props.onUploadCanceled()
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

        if (!inDevelopmentMode && this.shouldBlockNavigation())
            window.onbeforeunload = () => true
        else
            window.onbeforeunload = null
    }

    componentWillUnmount() {
        if (this.state.request)
            this.state.request.abort()
    }

    statusClassName = () => {
        const { loading, uploaded, uploadStatus } = this.state
        const defaultClassName = "file-upload-status"

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
            case UploadStatus.CANCELLED:
                return `${defaultClassName} show finished cancelled`
        }
    }

    shouldBlockNavigation = () => this.state.request !== undefined

    static leaveMessage = "A file is being uploaded right now. Please don't leave the page yet."

    render() {
        const { file, showCancelBtn } = this.props
        const { percentage, uploaded, uploadStatus, error, errorMessage } = this.state

        if (file) {
            return (
                <>
                    <Prompt when={this.shouldBlockNavigation()}
                            message={FileLoader.leaveMessage}/>

                    <div className="file-upload-progress-bar">
                        <div className="file-upload-completed-progress-bar" style={{ width: percentage + "%" }}>
                            <span className={this.statusClassName()}>{uploaded ? uploadStatus : `${percentage}%`}</span>
                        </div>
                        {error && <div className='file-upload-error-msg'>{errorMessage}</div>}
                        {showCancelBtn && !error && !uploadStatus && (
                            <div className='file-upload-cancel-wrapper'>
                                <button type='button' className='btn-dark' onClick={this.cancelUpload}>Cancel</button>
                            </div>
                        )}
                    </div>
                </>
            )
        }
        else
            return null
    }
}

export default FileLoader
