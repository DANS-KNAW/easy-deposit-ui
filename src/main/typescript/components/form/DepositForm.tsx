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
import { Component, FC } from "react"
import * as H from "history"
import { compose } from "redux"
import { connect } from "react-redux"
import { InjectedFormProps, reduxForm } from "redux-form"
import { Prompt, RouteComponentProps, withRouter } from "react-router-dom"
import Card from "./FoldableCard"
import "../../../resources/css/depositForm.css"
import "../../../resources/css/form.css"
import "../../../resources/css/helptext.css"
import "react-datepicker/dist/react-datepicker.css"
import { DepositFormMetadata } from "./parts"
import { DepositId } from "../../model/Deposits"
import { ComplexThunkAction, FetchAction, PromiseAction, ReduxAction, ThunkAction } from "../../lib/redux"
import { saveDraft, submitDeposit } from "../../actions/depositFormActions"
import { AppState } from "../../model/AppState"
import { DepositFormState } from "../../model/DepositForm"
import { Alert, ReloadAlert } from "../Errors"
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
import { Files, LoadingState as FileOverviewLoadingState } from "../../model/FileInfo"
import { fetchFiles } from "../../actions/fileOverviewActions"
import { formValidate } from "./Validation"
import { inDevelopmentMode } from "../../lib/config"
import { isFileUploading } from "../../selectors/fileUploadSelectors"

interface FetchDataErrorProps {
    fetchError?: string

    reload: () => any
}

const FetchDataError = ({ fetchError, reload }: FetchDataErrorProps) => (
    fetchError
        ? <ReloadAlert key="fetchMetadataError" reload={reload}>
            An error occurred: {fetchError}. Cannot load metadata from the server.
        </ReloadAlert>
        : null
)

interface SaveDraftErrorProps {
    saveError?: string
}

const SaveDraftError = ({ saveError }: SaveDraftErrorProps) => (
    saveError
        ? <Alert key="saveDraftError">
            An error occurred: {saveError}. Cannot save the draft of this deposit.
        </Alert>
        : null
)

interface SubmitErrorProps {
    submitError?: string
}

const SubmitError = ({ submitError }: SubmitErrorProps) => (
    submitError
        ? <Alert key="submitError">
            An error occurred: {submitError}. Cannot submit this deposit.
        </Alert>
        : null
)

const ValidationError = () => <Alert key="submitError">Cannot submit this deposit. Some fields are not filled in correctly.</Alert>

interface LoadedProps {
    loading: boolean
    loaded: boolean
    error?: string
}

const Loaded: FC<LoadedProps> = ({ loading, loaded, error, children }) => {
    return (
        <>
            {loading && <p>Loading data...</p>}
            {error && <p><i>Cannot load data from the server.</i></p>}
            {loaded && children}
        </>
    )
}

interface DepositFormStoreArguments {
    formState: DepositFormState
    fileState: FileOverviewLoadingState
    fileUploadInProgress: boolean
    formValues?: DepositFormMetadata

    fetchAllDropdownsAndMetadata: (depositId: DepositId) => ComplexThunkAction
    fetchFiles: (depositId: DepositId) => ThunkAction<FetchAction<Files>>
    saveDraft: (depositId: DepositId, data: DepositFormMetadata) => ThunkAction<PromiseAction<void> | ReduxAction<string>>
    submitDeposit: (depositId: DepositId, data: DepositFormMetadata, history: H.History) => ThunkAction<PromiseAction<void> | ReduxAction<string>>
    setUndirty: (data: any) => void
}

interface RouterParams {
    depositId: DepositId // name is declared in client.tsx, in the path to the 'DepositFormPage'
}

type DepositFormProps =
    & DepositFormStoreArguments
    & InjectedFormProps<DepositFormMetadata, DepositFormStoreArguments>
    & RouteComponentProps<RouterParams>

class DepositForm extends Component<DepositFormProps> {
    fetchMetadata = () => this.props.fetchAllDropdownsAndMetadata(this.props.match.params.depositId)

    fetchFiles = () => this.props.fetchFiles(this.props.match.params.depositId)

    save = () => {
        const { formValues, saveDraft } = this.props
        // TODO remove this log once the form is fully implemented.
        console.log(`saving draft for ${this.props.match.params.depositId}`, formValues)

        formValues && saveDraft(this.props.match.params.depositId, formValues)
    }

    submit = (data: DepositFormMetadata) => {
        this.props.submitDeposit(this.props.match.params.depositId, data, this.props.history)
    }

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
    shouldBlockNavigation = () => this.props.dirty && this.props.anyTouched && !this.props.submitSucceeded

    static leaveMessage = "You did not save your work before leaving this page.\n" +
        "Are you sure you want to go without saving?"

    componentDidMount() {
        this.fetchMetadata()
        this.fetchFiles()
    }

    componentDidUpdate() {
        // https://stackoverflow.com/questions/32841757/detecting-user-leaving-page-with-react-router
        if (!inDevelopmentMode && this.shouldBlockNavigation())
            window.onbeforeunload = () => true
        else
            window.onbeforeunload = null
    }

    render() {
        const { fetching: fetchingMetadata, fetched: fetchedMetadata, fetchError: fetchedMetadataError } = this.props.formState.fetchMetadata
        const { loading: fetchingFiles, loaded: fetchedFiles, loadingError: fetchedFilesError } = this.props.fileState
        const { saving, saved, saveError } = this.props.formState.saveDraft
        const { submitting, submitError } = this.props.formState.submit
        const fileUploadInProgress = this.props.fileUploadInProgress

        const buttonDisabled = fetchedMetadataError != undefined || fetchingMetadata || saving || submitting || fileUploadInProgress

        return (
            <>
                <Prompt when={this.shouldBlockNavigation()}
                        message={DepositForm.leaveMessage}/>

                <FetchDataError fetchError={fetchedFilesError} reload={this.fetchFiles}/>
                <FetchDataError fetchError={fetchedMetadataError} reload={this.fetchMetadata}/>

                {/*
                  * EASY-2086: the solution to disable native browser validation is to add 'noValidate' to the <form/> element
                  * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-novalidate
                  */}
                <form noValidate>
                    <Card title="Upload your data" defaultOpened>
                        <Loaded loading={fetchingFiles} loaded={fetchedFiles} error={fetchedFilesError}>
                            <FileUpload depositId={this.props.match.params.depositId}/>
                        </Loaded>
                    </Card>

                    <Card title="Basic information" required defaultOpened>
                        <Loaded loading={fetchingMetadata} loaded={fetchedMetadata} error={fetchedMetadataError}>
                            <BasicInformationForm depositId={this.props.match.params.depositId}/>
                        </Loaded>
                    </Card>

                    <Card title="License and access" required defaultOpened>
                        <Loaded loading={fetchingMetadata} loaded={fetchedMetadata} error={fetchedMetadataError}>
                            <LicenseAndAccessForm/>
                        </Loaded>
                    </Card>

                    <Card title="Upload type">
                        <Loaded loading={fetchingMetadata} loaded={fetchedMetadata} error={fetchedMetadataError}>
                            <UploadTypeForm/>
                        </Loaded>
                    </Card>

                    <Card title="Archaeology specific metadata">
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

                    <Card title="Privacy sensitive data" required defaultOpened>
                        <Loaded loading={fetchingMetadata} loaded={fetchedMetadata} error={fetchedMetadataError}>
                            <PrivacySensitiveDataForm/>
                        </Loaded>
                    </Card>

                    <Card title="Deposit agreement" required defaultOpened>
                        <Loaded loading={fetchingMetadata} loaded={fetchedMetadata} error={fetchedMetadataError}>
                            <DepositLicenseForm/>
                        </Loaded>
                    </Card>

                    <SaveDraftError saveError={saveError}/>
                    <SubmitError submitError={submitError}/>
                    {this.props.submitFailed && this.props.invalid && <ValidationError/>}

                    <div className="buttons">
                        <button type="button"
                                className="btn btn-dark margin-top-bottom"
                                onClick={this.save}
                                disabled={buttonDisabled}>
                            Save draft
                        </button>
                        <button type="button"
                                className="btn btn-dark margin-top-bottom"
                                onClick={this.props.handleSubmit(this.submit)}
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
}

const mapStateToProps = (state: AppState) => ({
    formState: state.depositForm,
    fileState: state.files.loading,
    fileUploadInProgress: isFileUploading(state),
    initialValues: state.depositForm.initialState.metadata,
    formValues: state.form.depositForm && state.form.depositForm.values,
    dropDowns: state.dropDowns, // used in validation
})

const composedHOC = compose(
    withRouter,
    connect(
        mapStateToProps,
        {
            fetchAllDropdownsAndMetadata,
            fetchFiles,
            saveDraft,
            submitDeposit,
        }),
    reduxForm({
        form: depositFormName,
        enableReinitialize: true,
        validate: formValidate,
    }),
)

export default composedHOC(DepositForm)
