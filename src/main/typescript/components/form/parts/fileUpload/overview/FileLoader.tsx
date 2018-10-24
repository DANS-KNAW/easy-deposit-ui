import * as React from "react"
import { Component } from "react"
import "../../../../../../resources/css/fileLoader.css"

interface FileLoaderProps {
    file?: File | null
    url: string
    preventReload?: boolean
    showCancelBtn?: boolean
    validFileTypes?: string[]
    fileMaxSize?: number
}

interface FileLoaderState {
    loading?: boolean
    percentage?: number
    error?: boolean
    errorMessage?: string
    uploaded?: boolean
    uploadStatus?: string
}

class FileLoader extends Component<FileLoaderProps, FileLoaderState> {
    constructor(props: FileLoaderProps) {
        super(props)
        this.state = {
            loading: false,
            percentage: 0,
            error: false,
            errorMessage: "",
            uploaded: false,
            uploadStatus: "",
        }
    }

    static defaultValidFileTypes = ["image/jpeg", "image/png", "video/mp4"]
    static defaultFileMaxSize = 1024

    validateFile: (file: File) => boolean = file => {
        const validFileTypes = this.props.validFileTypes || FileLoader.defaultValidFileTypes
        if (validFileTypes.indexOf(file.type) < 0) {
            this.setState({
                error: true,
                errorMessage: "Not a valid file type!",
            })
            return false
        }

        // TODO is this <= correct?
        const fileMaxSize = this.props.fileMaxSize || FileLoader.defaultFileMaxSize
        if (file.size <= fileMaxSize) {
            this.setState({
                error: true,
                errorMessage: "File size is too big!",
            })
            return false
        }

        this.setState({
            error: false,
            errorMessage: "",
            uploaded: false,
            loading: false,
        })
        return true
    }

    uploadFile: (file: File | undefined, url: string | undefined) => XMLHttpRequest = (file, url) => {
        const { preventReload } = this.props

        if (preventReload)
            window.addEventListener("beforeunload", this.beforeUnloadFn)
        this.setState({ loading: true })

        const formData = new FormData()
        file && formData.append("files", file)

        const request = new XMLHttpRequest()
        url && request.open("POST", url)

        request.addEventListener("load", e => {
            const uploadStatus = request.status === 200 ? "done" : "error"
            this.uploadFinished({ uploaded: true, uploadStatus: uploadStatus })
        }, false)

        request.addEventListener("error", e => {
            this.uploadFinished({ uploaded: true, uploadStatus: "failed" })
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
        this.setState({ percentage })
    }

    cancelUpload = () => {
        this.uploadFile(undefined, undefined).abort()
        this.uploadFinished({ uploaded: true, uploadStatus: "canceled" })
    }

    uploadFinished: (data: FileLoaderState) => void = data => {
        this.setState({ ...data })
        if (this.props.preventReload)
            window.removeEventListener("beforeunload", this.beforeUnloadFn)
    }

    componentDidMount() {
        console.log("componentDidMount props", this.props)
        console.log("componentDidMount state", this.state)
        if (this.props.file && this.validateFile(this.props.file))
            this.uploadFile(this.props.file, this.props.url)
    }

    UNSAFE_componentWillReceiveProps(nextProps: FileLoaderProps) {
        console.log("UNSAFE_componentWillReceiveProps nextProps", nextProps)
        if (nextProps.file && this.validateFile(nextProps.file))
            this.uploadFile(nextProps.file, nextProps.url)
    }

    render() {
        console.log("render props", this.props)
        console.log("render state", this.state)
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
                    {this.props.showCancelBtn ? this.showCancelBtn() : ""}
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
