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
import { Field } from "redux-form"
import { connect } from "react-redux"
import DoiField from "../../../lib/formComponents/DoiField"
import { FieldArrayProps, RepeatableField } from "../../../lib/formComponents/RepeatableField"
import TextFieldArray from "../../../lib/formComponents/TextFieldArray"
import TextArea from "../../../lib/formComponents/TextArea"
import { AppState } from "../../../model/AppState"
import { fetchDoi } from "../../../actions/depositFormActions"
import { ReduxAction } from "../../../lib/redux"
import { DepositId } from "../../../model/Deposits"
import { FetchDoiState } from "../../../model/DepositForm"
import SchemedTextFieldArray from "../../../lib/formComponents/SchemedTextFieldArray"
import { Doi } from "../../../../../test/typescript/mockserver/metadata"
import { emptySchemedValue, QualifiedSchemedValue, SchemedValue } from "../../../lib/metadata/Value"
import { Contributor } from "../../../lib/metadata/Contributor"
import { QualifiedDate } from "../../../lib/metadata/Date"
import { Relation } from "../../../lib/metadata/Relation"
import { emptyString } from "../../../lib/metadata/misc"
import AudienceFieldArray from "./basicInformation/AudienceFieldArray"

export interface BasicInformationFormData {
    doi?: Doi
    languageOfDescription?: string
    titles?: string[]
    alternativeTitles?: string[]
    description?: string
    creators?: Contributor[]
    contributors?: Contributor[]
    dateCreated?: Date
    audiences?: string[]
    subjects?: string[]
    alternativeIdentifiers?: SchemedValue[]
    relatedIdentifiers?: QualifiedSchemedValue[]
    relations?: Relation[]
    languagesOfFilesIso639?: string[]
    languagesOfFiles?: string[]
    datesIso8601?: QualifiedDate<Date>[]
    dates?: QualifiedDate<string>[]
    source?: string
    instructionsForReuse?: string
}

interface BasicInformationFormInputProps {
    depositId: DepositId
}

interface DoiFieldProps {
    fetchDoi: (depositId: DepositId) => ReduxAction<Promise<any>>
    fetchDoiState: FetchDoiState
}

type BasicInformationFormProps = DoiFieldProps & BasicInformationFormInputProps

const AlternativeIdentifierFieldArray = (props: FieldArrayProps<SchemedValue>) => (
    <SchemedTextFieldArray {...props} withEmptyDefault schemeValues={[
        // @formatter:off
        // TODO is this list correct/complete?
        { key: "id-type:DOI",                       value: "DOI" },
        { key: "id-type:URN",                       value: "URN" },
        { key: "id-type:MENDELEY-DATA",             value: "Mendeley data" },
        { key: "id-type:ISBN",                      value: "ISBN" },
        { key: "id-type:ISSN",                      value: "ISSN" },
        { key: "id-type:NWO-PROJECTNR",             value: "NWO project no." },
        { key: "id-type:ARCHIS-ZAAK-IDENTIFICATIE", value: "Archis zaak identificatie" },
        { key: "id-type:eDNA-project",              value: "eDNA project" },
        // @formatter:on
    ]}/>
)

const DateFieldArray = (props: FieldArrayProps<SchemedValue>) => (
    <SchemedTextFieldArray {...props} schemeValues={[
        // @formatter:off
        // first option is the default
        { key: "dcterms:date",            value: "Date" },
        { key: "dcterms:valid",           value: "Valid" },
        { key: "dcterms:issued",          value: "Issued" },
        { key: "dcterms:modified",        value: "Modified" },
        { key: "dcterms:dateAccepted",    value: "Date accepted" },
        { key: "dcterms:dateCopyrighted", value: "Date copyrighted" },
        // @formatter:on
    ]}/>
)

class BasicInformationForm extends Component<BasicInformationFormProps> {
    render() {
        return (
            <div className="container pl-0 pr-0">
                <div className="row form-group input-element">
                    <Field name="doi"
                           label="Digital Object Identifier"
                           fetchDoi={() => this.props.fetchDoi(this.props.depositId)}
                           fetchDoiState={this.props.fetchDoiState}
                           component={DoiField}/>
                </div>

                <div className="row form-group input-element">
                    <p>Language of description</p>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="titles"
                                     label="Title"
                                     empty={emptyString}
                                     fieldNames={[(name: string) => name]}
                                     component={TextFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="alternativeTitles"
                                     label="Alternative title"
                                     empty={emptyString}
                                     fieldNames={[(name: string) => name]}
                                     component={TextFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <Field name="description"
                           rows={5}
                           label="Description"
                           className="col-12 col-md-8"
                           withLabel
                           component={TextArea}/>
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
                    <RepeatableField name="audiences"
                                     label="Audience"
                                     empty={emptyString}
                                     fieldNames={[(name: string) => name]}
                                     component={AudienceFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="subjects"
                                     label="Subject"
                                     empty={emptyString}
                                     fieldNames={[(name: string) => name]}
                                     component={TextFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="alternativeIdentifiers"
                                     label="Alternative identifier"
                                     empty={emptySchemedValue}
                                     fieldNames={[
                                         (name: string) => `${name}.scheme`,
                                         (name: string) => `${name}.value`,
                                     ]}
                                     component={AlternativeIdentifierFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <p>Related identifier</p>
                </div>

                <div className="row form-group input-element">
                    <p>Relation</p>
                </div>

                <div className="row form-group input-element">
                    <p>Language of files (ISO 639)</p>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="languagesOfFiles"
                                     label="Language of files"
                                     empty={emptyString}
                                     fieldNames={[(name: string) => name]}
                                     component={TextFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <p>Date (ISO 8601)</p>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="dates"
                                     label="Date"
                                     empty={emptySchemedValue}
                                     fieldNames={[
                                         (name: string) => `${name}.qualifier`,
                                         (name: string) => `${name}.value`,
                                     ]}
                                     component={DateFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <Field name="source"
                           rows={5}
                           label="Source"
                           className="col-12 col-md-8"
                           withLabel
                           component={TextArea}/>
                </div>

                <div className="row form-group input-element">
                    <Field name="instructionsForReuse"
                           rows={5}
                           label="Instructions for reuse"
                           className="col-12 col-md-8"
                           withLabel
                           component={TextArea}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    fetchDoiState: state.depositForm.fetchDoi,
})

export default connect(mapStateToProps, { fetchDoi })(BasicInformationForm)
