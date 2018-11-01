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

interface FileLoaderProps {
    file?: File | null
    preventReload?: boolean
    showCancelBtn?: boolean
    url: string
    validFileTypes?: string[]
    invalidFileTypes?: string[]
}

interface FileLoaderState {
    error?: boolean
    errorMessage?: string
    loading?: boolean
    percentage?: number
    request?: XMLHttpRequest
    uploadStatus?: string
    uploaded?: boolean
}

class FileLoader extends Component<FileLoaderProps, FileLoaderState> {
    constructor(props: FileLoaderProps) {
        super(props)
        this.state = {
            error: false,
            errorMessage: "",
            loading: false,
            percentage: 0,
            request: undefined,
            uploaded: false,
            uploadStatus: "",
        }
    }

    validateFile: (file: File) => boolean = ({type}) => {
        const { validFileTypes, invalidFileTypes } = this.props

        const invalidFile = validFileTypes && validFileTypes.indexOf(type) < 0
            || invalidFileTypes && invalidFileTypes.indexOf(type) >= 0

        if (invalidFile) {
            this.setState(prevState => ({
                ...prevState,
                error: true,
                errorMessage: "Not a valid file type!",
            }))
            return false
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

    uploadFile: (file: File | undefined, url: string | undefined) => XMLHttpRequest = (file, url) => {
        const { preventReload } = this.props

        if (preventReload)
            window.addEventListener("beforeunload", this.beforeUnloadFn)
        this.setState(prevState => ({ ...prevState, loading: true }))

        const formData = new FormData()
        file && formData.append("files", file)

        const request = new XMLHttpRequest()
        url && request.open("POST", url)

        request.addEventListener("load", e => {
            const uploadStatus = request.status === 200 ? "done" : "error"
            this.uploadFinished({ uploaded: true, uploadStatus: uploadStatus, request: undefined })
        }, false)

        request.addEventListener("error", e => {
            this.uploadFinished({ uploaded: true, uploadStatus: "failed", request: undefined })
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
        this.uploadFinished({ uploaded: true, uploadStatus: "canceled", request: undefined })
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
                uploadStatus: "",
            })
        }
    }

    componentDidUpdate(prevProps: FileLoaderProps) {
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
                uploadStatus: "",
            })
        }
    }

    render() {
        console.log("state", this.state)
        return this.props.file ? this.showLoader() : null
    }

    showLoader() {
        const { percentage, error } = this.state

        return error
            ? this.showErrorMessage()
            : (
                <div className="file_progress-wrapper">
                    <div className="file_progress" style={{ width: percentage + "%" }}>
                    <span className={"file_progress-status " + this.generateStatusClassName()}>
                        {this.loadingProcess()}
                    </span>
                    </div>
                    {this.props.showCancelBtn && this.state.uploadStatus !== "done" ? this.showCancelBtn() : ""}
                </div>
            )
    }

    showErrorMessage() {
        const { errorMessage } = this.state
        return (
            <div className='error_msg'>{errorMessage}</div>
        )
    }

    generateStatusClassName() {
        const { loading, uploaded, uploadStatus } = this.state
        if (!loading)
            return ""

        if (!uploaded)
            return "show"

        switch (uploadStatus) {
            case "done":
                return "show finished success"
            case "failed":
                return "show finished failed"
            case "error":
                return "show finished error"
            case "canceled":
                return "show finished canceled"
        }
    }

    loadingProcess() {
        const { uploaded, uploadStatus, percentage } = this.state
        return uploaded ? uploadStatus : `${percentage}%`
    }

    showCancelBtn() {
        return (
            <div className='cancel_btn-wrapper'>
                <button type='button' className='cancel_btn' onClick={this.cancelUpload}>Cancel</button>
            </div>
        )
    }
}

export default FileLoader
