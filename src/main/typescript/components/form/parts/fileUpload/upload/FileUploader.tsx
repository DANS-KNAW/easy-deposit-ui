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
import { ChangeEvent, useState } from "react"
import FileLoader from "./FileLoader"
import { uploadFileUrl } from "../../../../../selectors/serverRoutes"
import { useDispatch, useStore } from "react-redux"
import { fetchDepositState, fetchFiles, setStateToDraft } from "../../../../../actions/depositFormActions"
import { DepositId, DepositStateLabel } from "../../../../../model/Deposits"
import { useSelector } from "../../../../../lib/redux"
import { Alert } from "../../../../Errors"
import { setFileUploadInProgress } from "../../../../../actions/fileUploadActions"
import { isFileUploading } from "../../../../../selectors/fileUploadSelectors"
import { DepositState } from "../../../../../model/DepositState"

interface FileUploaderProps {
    depositId: DepositId
    depositState: DepositState
}

const FileUploader = ({ depositId, depositState }: FileUploaderProps) => {
    const [uploadingFile, setUploadingFile] = useState<File>()
    const [errorMessage, setErrorMessage] = useState<string>()
    const fileUploadUrl = useSelector(uploadFileUrl(depositId, ""))
    const filesOverviewLoading = useSelector(state => state.depositForm.fetchFiles.fetching)
    const fileIsUploading = useSelector(isFileUploading)
    const depositIsSaving = useSelector(state => state.depositForm.saveDraft.saving)
    const depositIsSubmitting = useSelector(state => state.depositForm.submit.submitting)
    const dispatch = useDispatch()
    const store = useStore()

    const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setFileUploadInProgress(true))
        const file = e.target.files && e.target.files[0]
        if (file !== null) setUploadingFile(file) // this syntax is used in order to support ie11 
        setErrorMessage(undefined)
        e.target.value = ""
    }

    const setDraftState = async () => {
        const shouldSetToDraft = depositState.label === DepositStateLabel.REJECTED
        if (shouldSetToDraft) {
            await setStateToDraft(depositId, store.getState)
            dispatch(fetchDepositState(depositId))
        }
    }

    const uploadFinished = () => {
        setUploadingFile(undefined)
        dispatch(fetchFiles(depositId))
        dispatch(setFileUploadInProgress(false))
    }

    const uploadCanceled = () => {
        setUploadingFile(undefined)
        dispatch(setFileUploadInProgress(false))
    }

    const uploadFailed = (file: File) => (msg?: string) => {
        setUploadingFile(undefined)
        setErrorMessage(`An error occurred while uploading ${file.name.replace(/</g,"&lt;").replace(/>/g,"&gt;")}${msg ? `: ${msg}` : ""}`)
        dispatch(setFileUploadInProgress(false))
    }

    const renderUploadError = (message: string) => (
        <div className="col col-12">
            <Alert>
                <span dangerouslySetInnerHTML={{ __html: message }}/>
            </Alert>
        </div>
    )

    const renderUploadButton = () => (
        <div className="col col-10 col-sm-11 col-md-3">
            <input type="file"
                   onChange={uploadFile}
                   id="file-upload"
                   disabled={fileIsUploading || depositIsSaving || depositIsSubmitting || filesOverviewLoading}
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

    const renderFileLoader = () => uploadingFile && (
        <div className="col col-12 col-sm-12 col-md-9">
            <FileLoader file={uploadingFile}
                        url={fileUploadUrl}
                        preventReload
                        showCancelBtn
                        doBeforeUpload={setDraftState}
                        onUploadFinished={uploadFinished}
                        onUploadCanceled={uploadCanceled}
                        onUploadFailed={uploadFailed(uploadingFile)}/>
        </div>
    )

    return (
        <>
            <div id="upload-error-row" className="row">
                {errorMessage && renderUploadError(errorMessage)}
            </div>
            <div id="upload-row" className="row">
                {renderUploadButton()}
                {renderFileLoader()}
            </div>
        </>
    )
}

export default FileUploader
