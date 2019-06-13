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
import { ReloadAlert } from "../../../Errors"
import { useSelector } from "../../../../lib/redux"
import { useDispatch } from "react-redux"
import { fetchDoi } from "../../../../actions/depositFormActions"
import { FieldProps } from "../../../../lib/formComponents/ReduxFormUtils"
import Mandatory from "../../../../lib/formComponents/Mandatory"
import HelpButton from "../../../../lib/formComponents/HelpButton"
import HelpText from "../../../../lib/formComponents/HelpText"

interface DoiFieldProps extends FieldProps {
    depositId: string
}

const DoiField = ({ input, meta, label, depositId, mandatory, helpText }: DoiFieldProps) => {
    const changed = (meta as any).changed
    const hasError = meta.error && (changed || meta.submitFailed)
    const { fetchingDoi, fetchDoiError } = useSelector(state => state.depositForm.fetchDoi)
    const dispatch = useDispatch()
    const doFetchDoi = (depositId: string) => dispatch(fetchDoi(depositId))

    return (
        <div className="row form-group input-element mb-4">
            <label className="col-12 col-md-3 pl-0 title-label">
                {label}
                {mandatory && <Mandatory/>}
                {helpText && <HelpButton textFor={typeof helpText == "string" ? helpText : input.name}/>}
            </label>
            <div className="col-12 col-md-8 pl-0 pr-2">
                {helpText && <HelpText textFor={input.name}/>}
                {input.value
                    ? <label className={`value-label ${hasError ? "is-invalid" : ""}`.trim()}
                             id={input.name}>{input.value}</label>
                    : fetchDoiError
                        ? <ReloadAlert key="fetchMetadataError" reload={() => doFetchDoi(depositId)}>
                            An error occurred: {fetchDoiError}. Cannot create a new DOI.
                        </ReloadAlert>
                        : <button type="button"
                                  className={`btn value-button ${hasError ? "btn-danger is-invalid" : "btn-dark"}`.trim()}
                                  onClick={() => doFetchDoi(depositId)}
                                  disabled={fetchingDoi}>Reserve DOI</button>
                }
                {hasError && <span className="invalid-feedback">{meta.error}</span>}
            </div>
        </div>
    )
}

export default DoiField
