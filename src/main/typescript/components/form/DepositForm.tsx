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
import { Component, SFC } from "react"
import Card from "./FoldableCard"
import "../../../resources/css/depositForm.css"
import "../../../resources/css/form.css"
import { InjectedFormProps, reduxForm } from "redux-form"
import {
    ArchaeologySpecificMetadata,
    BasicInformation,
    Data,
    DepositFormData,
    DepositLicense,
    LicenseAndAccess,
    MessageForDataManager,
    PrivacySensitiveData,
    TemporalAndSpatialCoverage,
    UploadType,
} from "./parts"
import { DepositId } from "../../model/Deposits"
import { ReduxAction } from "../../lib/redux"
import { fetchMetadata, saveDraft, submitDeposit } from "../../actions/depositFormActions"
import { AppState } from "../../model/AppState"
import { connect } from "react-redux"
import { DepositFormState } from "../../model/DepositForm"
import { Alert, ReloadAlert } from "../../Errors"

interface FetchMetadataErrorProps {
    fetchError?: string
    reload: () => any
}

const FetchMetadataError = ({ fetchError, reload }: FetchMetadataErrorProps) => (
    fetchError
        ? <ReloadAlert key="fetchMetadataError" reload={reload()}>
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
            An error occurred: {saveError}. Cannot save the draft of this deposit. Please try again.
        </Alert>
        : null
)

interface SubmitErrorProps {
    submitError?: string
}

const SubmitError = ({ submitError }: SubmitErrorProps) => (
    submitError
        ? <Alert key="submitError">
            An error occurred: {submitError}. Cannot submit this deposit. Please try again.
        </Alert>
        : null
)

interface LoadedProps {
    loading: boolean
    loaded: boolean
    error?: string
}

const Loaded: SFC<LoadedProps> = ({ loading, loaded, error, children }) => {
    return (
        <>
            {loading && <p>loading metadata...</p>}
            {error && <p><i>Cannot load data from the server.</i></p>}
            {loaded && children}
        </>
    )
}

interface DepositFormStoreArguments {
    depositId: DepositId
    formState: DepositFormState
    formValues?: DepositFormData,
    fetchMetadata: (depositId: DepositId) => ReduxAction<Promise<any>>
    saveDraft: (depositId: DepositId, data: DepositFormData) => ReduxAction<{depositId: DepositId, data: DepositFormData}>
    submitDeposit: (depositId: DepositId, data: DepositFormData) => ReduxAction<{depositId: DepositId, data: DepositFormData}>,
}

type DepositFormProps = DepositFormStoreArguments & InjectedFormProps<DepositFormData, DepositFormStoreArguments>

class DepositForm extends Component<DepositFormProps> {
    fetchMetadata = () => this.props.fetchMetadata(this.props.depositId)

    save = () => {
        const { depositId, formValues, saveDraft } = this.props
        alert(`saving draft for ${depositId}:\n\n${JSON.stringify(formValues, null, 2)}`)
        console.log(`saving draft for ${depositId}`, formValues)

        formValues && saveDraft(depositId, formValues)
    }

    submit = (data: DepositFormData) => {
        this.props.submitDeposit(this.props.depositId, data)
    }

    componentDidMount() {
        this.fetchMetadata()
    }

    render() {
        const { fetching: fetchingMetadata, fetched: fetchedMetadata, fetchError: fetchedMetadataError } = this.props.formState.fetchMetadata
        const { saving, saved, saveError } = this.props.formState.saveDraft
        const { submitting, submitError } = this.props.formState.submit

        return (
            <>
                <FetchMetadataError fetchError={fetchedMetadataError} reload={this.fetchMetadata}/>
                <form>
                    <Card title="Upload your data" defaultOpened>
                        {/* TODO wrap in Loading once we have this piece of state implemented */}
                        <Data/>
                    </Card>

                    <Card title="Basic information" required defaultOpened>
                        <Loaded loading={fetchingMetadata} loaded={fetchedMetadata} error={fetchedMetadataError}>
                            <BasicInformation/>
                        </Loaded>
                    </Card>

                    <Card title="License and access" required defaultOpened>
                        <Loaded loading={fetchingMetadata} loaded={fetchedMetadata} error={fetchedMetadataError}>
                            <LicenseAndAccess/>
                        </Loaded>
                    </Card>

                    <Card title="Upload type">
                        <Loaded loading={fetchingMetadata} loaded={fetchedMetadata} error={fetchedMetadataError}>
                            <UploadType/>
                        </Loaded>
                    </Card>

                    <Card title="Archaeology specific metadata">
                        <Loaded loading={fetchingMetadata} loaded={fetchedMetadata} error={fetchedMetadataError}>
                            <ArchaeologySpecificMetadata/>
                        </Loaded>
                    </Card>

                    <Card title="Temporal and spatial coverage">
                        <Loaded loading={fetchingMetadata} loaded={fetchedMetadata} error={fetchedMetadataError}>
                            <TemporalAndSpatialCoverage/>
                        </Loaded>
                    </Card>

                    <Card title="Message for the data manager">
                        <Loaded loading={fetchingMetadata} loaded={fetchedMetadata} error={fetchedMetadataError}>
                            <MessageForDataManager/>
                        </Loaded>
                    </Card>

                    <Card title="Privacy sensitive data" required defaultOpened>
                        <Loaded loading={fetchingMetadata} loaded={fetchedMetadata} error={fetchedMetadataError}>
                            <PrivacySensitiveData/>
                        </Loaded>
                    </Card>

                    <Card title="Deposit license" required defaultOpened>
                        <Loaded loading={fetchingMetadata} loaded={fetchedMetadata} error={fetchedMetadataError}>
                            <DepositLicense/>
                        </Loaded>
                    </Card>

                    <SaveDraftError saveError={saveError}/>
                    <SubmitError submitError={submitError}/>

                    <div className="buttons">
                        <button type="button"
                                className="btn btn-primary mb-0"
                                onClick={this.save}
                                disabled={fetchedMetadataError != undefined || fetchingMetadata || saving || submitting}>
                            Save draft
                        </button>
                        <button type="button"
                                className="btn btn-primary mb-0"
                                onClick={this.props.handleSubmit(this.submit)}
                                disabled={fetchedMetadataError != undefined || fetchingMetadata || saving || submitting}>
                            Submit deposit
                        </button>
                    </div>

                    <div>
                        {saving && <p><i>Saving draft...</i></p>}
                        {saved && <p><i>Saved draft</i></p>}
                    </div>
                </form>
            </>
        )
    }
}

const depositForm = reduxForm<DepositFormData>({ form: "depositForm", enableReinitialize: true })(DepositForm)

const mapStateToProps = (state: AppState) => ({
    depositId: state.depositForm.depositId,
    formState: state.depositForm,
    initialValues: { ...state.depositForm.initialState.data, ...state.depositForm.initialState.metadata },
    formValues: state.form.depositForm && state.form.depositForm.values,
})

export default connect<{}>(mapStateToProps, {
    fetchMetadata,
    saveDraft,
    submitDeposit,
})(depositForm)
