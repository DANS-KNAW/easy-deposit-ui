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
import { Field, WrappedFieldProps } from "redux-form"
import { ReduxAction } from "../../../lib/redux"
import { CreatorOrContributor, Relation, SchemedDate, SchemedValue, Value } from "../../../model/FormData"
import { connect } from "react-redux"

export interface BasicInformationFormData {
    doi?: string
    languageOfDescription?: string
    titles?: Value[]
    alternativeTitles?: Value[]
    descriptions?: Value[]
    creators?: CreatorOrContributor[]
    contributor?: CreatorOrContributor[]
    dateCreated?: Date
    audiences?: Value[]
    subjects?: Value[]
    identifiers?: SchemedValue[]
    relations?: Relation[]
    languagesOfFilesIso639?: Value[]
    languagesOfFiles?: Value[]
    datesIso8601?: SchemedDate[] // TODO how are these different from the ones below?
    dates?: SchemedValue[]
    sources?: Value[]
    instructionsForReuse?: Value[]
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
            <label className="col-12 col-md-3 pl-0 title-label" htmlFor={input.name}>{label}</label>
            {input.value
                ? <label className="col-12 col-md-9 value-label" id={input.name}>{input.value}</label>
                : <button type="button"
                          className="btn btn-primary mb-0 mt-0 value-button"
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
                           fetchDoi={() => console.log("TODO: implement DOI fetching")} /* TODO implement DOI fetching */
                        // fetchDoi={this.props.fetchDoi}
                           component={DoiField}/>
                </div>

                <div className="row form-group input-element">
                    <p>Language of description</p>
                </div>

                <div className="row form-group input-element">
                    <p>Title</p>
                </div>

                <div className="row form-group input-element">
                    <p>Alternative title</p>
                </div>

                <div className="row form-group input-element">
                    <p>Description</p>
                </div>

                <div className="row form-group input-element">
                    <p>Creator</p>
                </div>

                <div className="row form-group input-element">
                    <p>Contributor</p>
                </div>

                <div className="row form-group input-element">
                    <p>Date created</p>
                </div>

                <div className="row form-group input-element">
                    <p>Audience</p>
                </div>

                <div className="row form-group input-element">
                    <p>Subject</p>
                </div>

                <div className="row form-group input-element">
                    <p>Identifier</p>
                </div>

                <div className="row form-group input-element">
                    <p>Relation</p>
                </div>

                <div className="row form-group input-element">
                    <p>Language of files (ISO 639)</p>
                </div>

                <div className="row form-group input-element">
                    <p>Language of files</p>
                </div>

                <div className="row form-group input-element">
                    <p>Date (ISO 8601)</p>
                </div>

                <div className="row form-group input-element">
                    <p>Date</p>
                </div>

                <div className="row form-group input-element">
                    <p>Source</p>
                </div>

                <div className="row form-group input-element">
                    <p>Instructions for reuse</p>
                </div>
            </div>
        )
    }
}

export default connect(null, )(BasicInformationForm)
