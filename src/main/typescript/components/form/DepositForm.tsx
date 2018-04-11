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
import "../../../resources/css/depositForm"
import { InjectedFormProps, reduxForm } from "redux-form"
import {
    ArchaeologySpecificMetadata,
    BasicInformation,
    Data,
    DepositFormData,
    DepositLicense,
    LanguageAndLiteratureSpecificMetadata,
    LicenseAndAccess,
    MessageForDataManager,
    PrivacySensitiveData,
    TemporalAndSpatialCoverage,
    UploadType,
} from "./parts"
import { DepositId } from "../../model/Deposits"
import { Dispatch, ReduxAction } from "../../lib/redux"
import { fetchMetadata, saveDraft, submitDeposit } from "../../actions/depositFormActions"
import { AppState } from "../../model/AppState"
import { connect } from "react-redux"
import { DepositFormState } from "../../model/DepositForm"

interface LoadedProps {
    loading: boolean
    loaded: boolean
}

const Loaded: SFC<LoadedProps> = ({ loading, loaded, children }) => {
    return (
        <>
            {loading && <p>loading metadata...</p>}
            {loaded && children}
        </>
    )
}

interface DepositFormStoreArguments {
    depositId: DepositId
    formState: DepositFormState
    fetchMetadata: (depositId: DepositId) => ReduxAction<Promise<any>>
}

type DepositFormProps = DepositFormStoreArguments & InjectedFormProps<DepositFormData, DepositFormStoreArguments>

class DepositForm extends Component<DepositFormProps> {
    save = async (data: DepositFormData, dispatch: Dispatch, props: DepositFormStoreArguments) => {
        const { depositId } = props
        alert(`saving draft for ${depositId}:\n\n${JSON.stringify(data, null, 2)}`)

        dispatch(saveDraft(depositId, data))
    }

    submit = async (data: DepositFormData, dispatch: Dispatch, props: DepositFormStoreArguments) => {
        dispatch(submitDeposit(props.depositId, data))
    }

    componentDidMount() {
        this.props.fetchMetadata(this.props.depositId)
    }

    render() {
        const { formState: { fetchMetadata: { fetching: fetchingMetadata, fetched: fetchedMetadata } } } = this.props

        return (
            <form>
                <Card title="Upload your data" defaultOpened>
                    {/* TODO wrap in Loading once we have this piece of state implemented */}
                    <Data/>
                </Card>

                <Card title="Basic information" required defaultOpened>
                    <Loaded loading={fetchingMetadata} loaded={fetchedMetadata}>
                        <BasicInformation/>
                    </Loaded>
                </Card>

                <Card title="License and access" required defaultOpened>
                    <Loaded loading={fetchingMetadata} loaded={fetchedMetadata}>
                        <LicenseAndAccess/>
                    </Loaded>
                </Card>

                <Card title="Upload type">
                    <Loaded loading={fetchingMetadata} loaded={fetchedMetadata}>
                        <UploadType/>
                    </Loaded>
                </Card>

                <Card title="Archaeology specific metadata">
                    <Loaded loading={fetchingMetadata} loaded={fetchedMetadata}>
                        <ArchaeologySpecificMetadata/>
                    </Loaded>
                </Card>

                <Card title="Language & literature specific metadata">
                    <Loaded loading={fetchingMetadata} loaded={fetchedMetadata}>
                        <LanguageAndLiteratureSpecificMetadata/>
                    </Loaded>
                </Card>

                <Card title="Temporal and spatial coverage">
                    <Loaded loading={fetchingMetadata} loaded={fetchedMetadata}>
                        <TemporalAndSpatialCoverage/>
                    </Loaded>
                </Card>

                <Card title="Message for the data manager">
                    <Loaded loading={fetchingMetadata} loaded={fetchedMetadata}>
                        <MessageForDataManager/>
                    </Loaded>
                </Card>

                <Card title="Privacy sensitive data" required defaultOpened>
                    <Loaded loading={fetchingMetadata} loaded={fetchedMetadata}>
                        <PrivacySensitiveData/>
                    </Loaded>
                </Card>

                <Card title="Deposit license" required defaultOpened>
                    <Loaded loading={fetchingMetadata} loaded={fetchedMetadata}>
                        <DepositLicense/>
                    </Loaded>
                </Card>

                <div className="buttons">
                    <button type="button"
                            className="btn btn-primary mb-0"
                            onClick={this.props.handleSubmit(this.save)}>
                        Save draft
                    </button>
                    <button type="button"
                            className="btn btn-primary mb-0"
                            onClick={this.props.handleSubmit(this.submit)}>
                        Submit deposit
                    </button>
                </div>
            </form>
        )
    }
}

const depositForm = reduxForm<DepositFormData>({ form: "depositForm", enableReinitialize: true })(DepositForm)

const mapStateToProps = (state: AppState) => ({
    depositId: state.depositForm.depositId,
    formState: state.depositForm,
    initialValues: { ...state.depositForm.initialState.data, ...state.depositForm.initialState.metadata },
})

export default connect<{}>(mapStateToProps, { fetchMetadata })(depositForm)
