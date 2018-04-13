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
import { CreatorOrContributor, Relation, SchemedDate, SchemedValue } from "../../../model/FormData"
import { Field, WrappedFieldProps } from "redux-form"
import { ReduxAction } from "../../../lib/redux"
import { connect } from "react-redux"

export interface BasicInformationFormData {
    doi?: string
    languageOfDescription?: string
    titles?: string[]
    alternativeTitles?: string[]
    descriptions?: string[]
    creators?: CreatorOrContributor[]
    contributor?: CreatorOrContributor[]
    dateCreated?: Date
    audiences?: string[]
    subjects?: string[]
    identifiers?: SchemedValue[]
    relations?: Relation[]
    languagesOfFilesIso639?: string[]
    languagesOfFiles?: string[]
    datesIso8601?: SchemedDate[] // TODO how are these different from the ones below?
    dates?: SchemedValue[]
    sources?: string[]
    instructionsForReuse?: string[]
}

interface DoiFieldProps {
    // fetchDoi: () => ReduxAction<Promise<any>>
    fetchDoi: () => void
    // fetchingDoi: boolean
    // fetchedDoi: boolean
    // fetchDoiError?: string
}

const DoiField = ({ input, meta, label }: WrappedFieldProps & DoiFieldProps) => {
    console.log("input", input)
    console.log("meta", meta)

    return (
        <>
            <label className="col-12 col-md-3 pl-0" htmlFor={input.name}>{label}</label>
            {input.value
                ? <label className="col-12 col-md-9 value-label" id={input.name}>{input.value}</label>
                : <button type="button"
                          className="btn btn-primary mb-0 mt-0"
                          onClick={this.fetchDoi}
                          disabled={false /* TODO disable while requesting DOI */}>Reserve DOI</button>}
        </>
    )
}

interface BasicInformationFormProps {
    // fetchDoi: () => ReduxAction<Promise<any>>
}

class BasicInformationForm extends Component<BasicInformationFormProps> {
    render() {
        return (
            <div className="container pl-0 pr-0">
                <div className="row form-group input-element">
                    <Field name="doi"
                           label="Digital Object Identifier"
                           fetchDoi={() => console.log("TODO: implement DOI fetching")}
                           // fetchDoi={this.props.fetchDoi}
                           component={DoiField}/>
                </div>
            </div>
        )
    }
}

export default connect(null, )(BasicInformationForm)
