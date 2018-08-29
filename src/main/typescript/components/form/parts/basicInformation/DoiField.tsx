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
import { FetchDoiState } from "../../../../model/DepositForm"
import { ReloadAlert } from "../../../Errors"
import { FetchAction, ThunkAction } from "../../../../lib/redux"
import { DepositId } from "../../../../model/Deposits"
import { connect } from "react-redux"
import { AppState } from "../../../../model/AppState"
import { fetchDoi } from "../../../../actions/depositFormActions"
import { FieldProps } from "../../../../lib/formComponents/ReduxFormUtils"
import { Doi } from "../../../../lib/metadata/Identifier"

interface DoiFieldInputArguments {
    depositId: string
}

interface DoiFieldStoreArguments {
    fetchDoiState: FetchDoiState
}

interface DoiFieldStoreFunctions {
    fetchDoi: (depositId: DepositId) => ThunkAction<FetchAction<Doi>>
}

type DoiFieldProps = FieldProps & DoiFieldInputArguments & DoiFieldStoreArguments & DoiFieldStoreFunctions

const DoiField = ({ input, meta, label, depositId, fetchDoi, fetchDoiState: { fetchingDoi, fetchDoiError } }: DoiFieldProps) => (
    <div className="row form-group input-element mb-4">
        <label className="col-12 col-md-3 pl-0 title-label">{label}</label>
        {input.value
            ? <label className="col-12 col-md-8 value-label" id={input.name}>{input.value}</label>
            : fetchDoiError
                ? <ReloadAlert key="fetchMetadataError" reload={() => fetchDoi(depositId)}>
                    An error occurred: {fetchDoiError}. Cannot create a new DOI.
                </ReloadAlert>
                : <button type="button"
                          className="btn btn-dark mb-0 mt-0 value-button"
                          onClick={() => fetchDoi(depositId)}
                          disabled={fetchingDoi}>Reserve DOI</button>
        }
    </div>
)

const mapStateToProps = (state: AppState) => ({
    fetchDoiState: state.depositForm.fetchDoi,
})

const ConnectedDoiField = connect<DoiFieldStoreArguments, DoiFieldStoreFunctions, DoiFieldInputArguments>(mapStateToProps, { fetchDoi })(DoiField)

const DoiFieldWrapper = ({depositId, ...rest}: FieldProps & DoiFieldInputArguments) => (
    <ConnectedDoiField depositId={depositId} {...rest}/>
)

export default DoiFieldWrapper
