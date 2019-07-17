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
import { FC, useEffect } from "react"
import { compose } from "redux"
import { connect, useDispatch } from "react-redux"
import { InjectedFormProps, reduxForm } from "redux-form"
import { Prompt, RouteComponentProps, withRouter } from "react-router-dom"
import Card from "./FoldableCard"
import "../../../resources/css/depositForm.css"
import "../../../resources/css/form.css"
import "../../../resources/css/helptext.css"
import "react-datepicker/dist/react-datepicker.css"
import { DepositFormMetadata } from "./parts"
import { DepositId } from "../../model/Deposits"
import { useSelector } from "../../lib/redux"
import { saveDraft, submitDeposit } from "../../actions/depositFormActions"
import { AppState } from "../../model/AppState"
import { Alert } from "../Errors"
import DepositLicenseForm from "./parts/DepositLicenseForm"
import PrivacySensitiveDataForm from "./parts/PrivacySensitiveDataForm"
import MessageForDataManagerForm from "./parts/MessageForDataManagerForm"
import TemporalAndSpatialCoverageForm from "./parts/TemporalAndSpatialCoverageForm"
import ArchaeologySpecificMetadataForm from "./parts/ArchaeologySpecificMetadataForm"
import UploadTypeForm from "./parts/UploadTypeForm"
import LicenseAndAccessForm from "./parts/LicenseAndAccessForm"
import BasicInformationForm from "./parts/BasicInformationForm"
import FileUpload from "./parts/FileUpload"
import { depositFormName } from "../../constants/depositFormConstants"
import { fetchAllDropdownsAndMetadata } from "../../actions/dropdownActions"
import { fetchFiles } from "../../actions/fileOverviewActions"
import { formValidate } from "./Validation"
import { inDevelopmentMode } from "../../lib/config"
import { isFileUploading } from "../../selectors/fileUploadSelectors"

interface LoadedProps {
    loading: boolean
    loaded: boolean
    error?: string
}

const Loaded: FC<LoadedProps> = ({ loading, loaded, error, children }) => {
    return (
        <>
            {loading && <p>Loading data...</p>}
            {error && <p><i>You cannot load data from the server.</i></p>}
            {loaded && children}
        </>
    )
}

interface RouterParams {
    depositId: DepositId // name is declared in client.tsx, in the path to the 'DepositFormPage'
}

type DepositFormProps =
    & InjectedFormProps<DepositFormMetadata>
    & RouteComponentProps<RouterParams>

const leaveMessage = "You did not save your work before leaving this page.\nAre you sure you want to go without saving?"

const DepositForm = (props: DepositFormProps) => {
    const { depositId } = props.match.params

    const formState = useSelector(state => state.depositForm)
    const fileState = useSelector(state => state.files.loading)
    const fileUploadInProgress = useSelector(isFileUploading)
    const formValues = useSelector(state => state.form.depositForm && state.form.depositForm.values)
    const dispatch = useDispatch()

    const doFetchMetadata = () => dispatch(fetchAllDropdownsAndMetadata(depositId))
    const doFetchFiles = () => dispatch(fetchFiles(depositId))
    const doSave = () => {
        // TODO remove this log once the form is fully implemented.
        console.log(`saving draft for ${depositId}`, formValues)

        formValues && dispatch(saveDraft(depositId, formValues))
    }
    const doSubmit: (data: DepositFormMetadata) => void = data => dispatch(submitDeposit(depositId, data, props.history))
    /*
     * TODO this is not entirely correct, but I don't know how to fix this;
     *   the following sequence should show a bug in this logic:
     *   1. create a new deposit
     *   2. edit 1 field
     *   3. save the draft
     *   4. tough a field (NO editting!)
     *   5. on top of the page, click on 'my datasets' to leave the page
     *   6. while the form was saved and nothing was editted afterwards,
     *      it still shows a warning saying the user did not save all changes
     */
    const shouldBlockNavigation = () => props.dirty && props.anyTouched && !props.submitSucceeded

    useEffect(() => {
        doFetchMetadata()
        doFetchFiles()

        return function cleanup() {
            window.onbeforeunload = null
        }
    }, [])

    useEffect(() => {
        // https://stackoverflow.com/questions/32841757/detecting-user-leaving-page-with-react-router
        if (!inDevelopmentMode && shouldBlockNavigation())
            window.onbeforeunload = () => true
        else
            window.onbeforeunload = null
    })

    const { fetching: fetchingMetadata, fetched: fetchedMetadata, fetchError: fetchedMetadataError } = formState.fetchMetadata
    const { loading: fetchingFiles, loaded: fetchedFiles, loadingError: fetchedFilesError } = fileState
    const { saving, saved, saveError } = formState.saveDraft
    const { submitting, submitError } = formState.submit

    const buttonDisabled = fetchedMetadataError != undefined || fetchingMetadata || saving || submitting || fileUploadInProgress

    return (
        <>
            <Prompt when={shouldBlockNavigation()}
                    message={leaveMessage}/>

            {/*@formatter:off*/}
            {fetchedFilesError && <Alert>An error occurred: {fetchedFilesError}. You cannot load files from the server.</Alert>}
            {fetchedMetadataError && <Alert>An error occurred: {fetchedMetadataError}. You cannot load metadata from the server.</Alert>}
            {/*@formatter:on*/}

            {/*
              * EASY-2086: the solution to disable native browser validation is to add 'noValidate' to the <form/> element
              * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-novalidate
              */}
            <form noValidate>
                <Card title="Upload your data" defaultOpened>
                    <Loaded loading={fetchingFiles} loaded={fetchedFiles} error={fetchedFilesError}>
                        <FileUpload depositId={depositId}/>
                    </Loaded>
                </Card>

                <Card title="Personal data" required defaultOpened>
                    <Loaded loading={fetchingMetadata} loaded={fetchedMetadata} error={fetchedMetadataError}>
                        <PrivacySensitiveDataForm/>
                    </Loaded>
                </Card>

                <Card title="Basic information" required defaultOpened>
                    <Loaded loading={fetchingMetadata} loaded={fetchedMetadata} error={fetchedMetadataError}>
                        <BasicInformationForm depositId={depositId}/>
                    </Loaded>
                </Card>

                <Card title="Access and licence" required defaultOpened>
                    <Loaded loading={fetchingMetadata} loaded={fetchedMetadata} error={fetchedMetadataError}>
                        <LicenseAndAccessForm/>
                    </Loaded>
                </Card>

                <Card title="Content type and file format">
                    <Loaded loading={fetchingMetadata} loaded={fetchedMetadata} error={fetchedMetadataError}>
                        <UploadTypeForm/>
                    </Loaded>
                </Card>

                <Card title="Archaeology-specific metadata">
                    <Loaded loading={fetchingMetadata} loaded={fetchedMetadata} error={fetchedMetadataError}>
                        <ArchaeologySpecificMetadataForm/>
                    </Loaded>
                </Card>

                <Card title="Temporal and spatial coverage">
                    <Loaded loading={fetchingMetadata} loaded={fetchedMetadata} error={fetchedMetadataError}>
                        <TemporalAndSpatialCoverageForm/>
                    </Loaded>
                </Card>

                <Card title="Message for the data manager">
                    <Loaded loading={fetchingMetadata} loaded={fetchedMetadata} error={fetchedMetadataError}>
                        <MessageForDataManagerForm/>
                    </Loaded>
                </Card>

                <Card title="Deposit agreement" required defaultOpened>
                    <Loaded loading={fetchingMetadata} loaded={fetchedMetadata} error={fetchedMetadataError}>
                        <DepositLicenseForm/>
                    </Loaded>
                </Card>

                {/*@formatter:off*/}
                {saveError && <Alert>An error occurred: {saveError}. You cannot save the draft of this deposit.</Alert>}
                {submitError && <Alert>An error occurred: {submitError}. You cannot submit this deposit.</Alert>}
                {props.submitFailed && props.invalid &&
                <Alert key="submitError">You cannot submit this deposit. Some fields are not filled in correctly.</Alert>}
                {/*@formatter:on*/}

                <div className="buttons">
                    <button type="button"
                            className="btn btn-dark margin-top-bottom"
                            onClick={doSave}
                            disabled={buttonDisabled}>
                        Save draft
                    </button>
                    <button type="button"
                            className="btn btn-dark margin-top-bottom"
                            onClick={props.handleSubmit(doSubmit)}
                            disabled={buttonDisabled}>
                        Submit deposit
                    </button>
                </div>

                <div>
                    {fileUploadInProgress && <p><i>Please wait until the file is uploaded</i></p>}
                    {saving && <p><i>Saving draft...</i></p>}
                    {saved && <p><i>Saved draft</i></p>}
                </div>
            </form>
        </>
    )
}

const composedHOC = compose(
    withRouter,
    connect((state: AppState) => ({
        initialValues: state.depositForm.initialState.metadata, // initial values for deposit form
        dropDowns: state.dropDowns, // used in form validation
    })),
    reduxForm({
        form: depositFormName,
        enableReinitialize: true,
        validate: formValidate,
    }),
)

export default composedHOC(DepositForm)
