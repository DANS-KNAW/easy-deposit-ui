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
import {
    CreatorOrContributor, emptySchemedValue,
    emptyStringValue,
    Relation,
    SchemedDate,
    SchemedValue,
    Value,
} from "../../../model/FormData"
import { Field, WrappedFieldArrayProps } from "redux-form"
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
import SchemedTextFieldArray from "../../../lib/formComponents/SchemedTextField"

export interface BasicInformationFormData {
    doi?: string
    languageOfDescription?: string
    titles?: Value[]
    alternativeTitles?: Value[]
    description?: string
    creators?: CreatorOrContributor[]
    contributors?: CreatorOrContributor[]
    dateCreated?: Date
    audiences?: Value[]
    subjects?: Value[]
    identifiers?: SchemedValue[]
    relations?: Relation[]
    languagesOfFilesIso639?: Value[]
    languagesOfFiles?: Value[]
    datesIso8601?: SchemedDate[] // TODO how are these different from the ones below?
    dates?: SchemedValue[]
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

const IdentifierFieldArray = (props: FieldArrayProps<SchemedValue>) => (
    <SchemedTextFieldArray {...props} schemeValues={[
        { key: "DOI", value: "DOI" },
        { key: "URN", value: "URN" },
        { key: "MENDELEY-DATA", value: "Mendeley data" },
        { key: "ISBN", value: "ISBN" },
        { key: "ISSN", value: "ISSN" },
        { key: "NWO-PROJECTNR", value: "NWO project no." },
        { key: "ARCHIS-ZAAK-IDENTIFICATIE", value: "Archis zaak identificatie" },
        { key: "eDNA-project", value: "eDNA project" },
        // TODO add others
    ]}/>
)

const DateFieldArray = (props: FieldArrayProps<SchemedValue>) => (
    <SchemedTextFieldArray {...props} schemeValues={[
        { key: "Valid", value: "Valid" },
        { key: "Issued", value: "Issued" },
        { key: "Modified", value: "Modified" },
        { key: "Date accepted", value: "Date accepted" },
        { key: "Date copyrighted", value: "Date copyrighted" },
        // TODO add others
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
                                     empty={emptyStringValue}
                                     fieldNames={[(name: string) => `${name}.value`]}
                                     component={TextFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="alternativeTitles"
                                     label="Alternative title"
                                     empty={emptyStringValue}
                                     fieldNames={[(name: string) => `${name}.value`]}
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
                    <p>Audience</p>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="subjects"
                                     label="Subject"
                                     empty={emptyStringValue}
                                     fieldNames={[(name: string) => `${name}.value`]}
                                     component={TextFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="identifiers"
                                     label="Identifier"
                                     empty={emptySchemedValue}
                                     fieldNames={[
                                         (name: string) => `${name}.scheme`,
                                         (name: string) => `${name}.value`,
                                     ]}
                                     component={IdentifierFieldArray}/>
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
                                     empty={emptyStringValue}
                                     fieldNames={[(name: string) => `${name}.value`]}
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
                                         (name: string) => `${name}.scheme`,
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
