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
import { useEffect, useRef, useState } from "react"
import "../../../../../../resources/css/fileLoader.css"
import { Prompt } from "react-router"
import { inDevelopmentMode } from "../../../../../lib/config"

enum UploadStatus {
    PROCESSING = "processing",
    DONE = "done",
    CANCELLED = "cancelled",
    ERROR = "error",
    FAILED = "failed",
}

interface FileLoaderProps {
    file: File
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
    onUploadFailed?: (msg?: string) => void
}

const leaveMessage = "A file is being uploaded right now. Please don't leave the page yet."

/*
 * this class was taken and modified from https://github.com/Ggayane/react-file-loader/
 * the original library seemed abandoned, did not support newer versions of React,
 * did not have TypeScript definitions and used React's deprecated life cycle methods (see React v16.3)
 */
const FileLoader = (props: FileLoaderProps) => {
    const [percentage, setPercentage] = useState(0)
    const requestRef = useRef<XMLHttpRequest>()
    const [uploaded, setUploaded] = useState(false)
    const [uploadStatus, setUploadStatus] = useState<UploadStatus | undefined>(undefined)

    const setRequest = (request?: XMLHttpRequest) => {
        requestRef.current = request
    }

    const validateFile: (file: File) => boolean = ({ type }) => {
        const { validFileTypes } = props

        if (validFileTypes) {
            // functions to ensure lazy evaluation
            const typeOnWhitelist = () => validFileTypes.whitelist ? validFileTypes.whitelist.indexOf(type) >= 0 : true
            const typeOnBlacklist = () => validFileTypes.blacklist ? validFileTypes.blacklist.indexOf(type) >= 0 : false

            if (!typeOnWhitelist() || typeOnBlacklist()) {
                props.onUploadFailed && props.onUploadFailed(validFileTypes.errorMessage)
                return false
            }
        }

        setUploaded(false)
        return true
    }

    const uploadFile: (file: File, url: string) => XMLHttpRequest = (file, url) => {
        if (props.preventReload)
            window.addEventListener("beforeunload", beforeUnloadFn)

        const formData = new FormData()
        formData.append("files", file)

        const request = new XMLHttpRequest()
        url && request.open("POST", url)

        request.addEventListener("load", () => handleResponse(request), false)

        request.addEventListener("error", handleFailedUpload, false)

        request.upload.addEventListener("progress", e => {
            const percentage = parseInt(`${(e.loaded / e.total) * 100}`, 10)
            setPercentage(percentage)
            if (percentage === 100)
                setUploadStatus(UploadStatus.PROCESSING)
        }, false)

        request.send(formData)

        return request
    }

    const beforeUnloadFn = (e: BeforeUnloadEvent) => {
        e.preventDefault()
        return e.returnValue = "Are you sure you want to leave?"
    }

    const removeBeforeUpload = () => {
        if (props.preventReload)
            window.removeEventListener("beforeunload", beforeUnloadFn)
    }

    const handleResponse: (request: XMLHttpRequest) => void = request => {
        if (request.status == 201) {
            setRequest(undefined)
            setUploaded(true)
            setUploadStatus(UploadStatus.DONE)
            props.onUploadFinished && props.onUploadFinished()
        }
        else {
            setPercentage(100)
            setRequest(undefined)
            setUploaded(true)
            setUploadStatus(UploadStatus.ERROR)
            props.onUploadFailed && props.onUploadFailed(request.response)
        }

        removeBeforeUpload()
    }

    const handleFailedUpload = () => {
        setPercentage(100)
        setRequest(undefined)
        setUploaded(true)
        setUploadStatus(UploadStatus.FAILED)
        props.onUploadFailed && props.onUploadFailed()

        removeBeforeUpload()
    }

    const cancelUpload = () => {
        requestRef.current && requestRef.current.abort()

        setRequest(undefined)
        setUploaded(true)
        setUploadStatus(UploadStatus.CANCELLED)
        props.onUploadCanceled && props.onUploadCanceled()

        removeBeforeUpload()
    }

    const shouldBlockNavigation = () => requestRef.current !== undefined

    useEffect(() => {
        if (!requestRef.current && props.file && validateFile(props.file)) {
            setRequest(uploadFile(props.file, props.url))
        }

        return function cleanup() {
            if (requestRef.current) {
                requestRef.current.abort()
                setRequest(undefined)
                props.onUploadCanceled && props.onUploadCanceled()
                removeBeforeUpload()
            }
        }
    }, [])

    useEffect(() => {
        if (!inDevelopmentMode && shouldBlockNavigation())
            window.onbeforeunload = () => true
        else
            window.onbeforeunload = null
    }, [requestRef.current])

    const statusClassName = () => {
        const defaultClassName = "file-upload-status"

        if (!uploaded)
            return `${defaultClassName} show`

        switch (uploadStatus) {
            case UploadStatus.PROCESSING:
                return `${defaultClassName} show finished processing`
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

    return (
        <>
            <Prompt when={shouldBlockNavigation()}
                    message={leaveMessage}/>

            <div className="file-upload-progress-bar">
                <div className="file-upload-completed-progress-bar" style={{ width: percentage + "%" }}>
                    <span
                        className={statusClassName()}>{uploaded || uploadStatus === UploadStatus.PROCESSING ? uploadStatus : `${percentage}%`}</span>
                </div>
                {props.showCancelBtn && !uploadStatus && (
                    <div className='file-upload-cancel-wrapper'>
                        <button type='button' className='btn-dark' onClick={cancelUpload}>Cancel</button>
                    </div>
                )}
            </div>
        </>
    )
}

export default FileLoader
