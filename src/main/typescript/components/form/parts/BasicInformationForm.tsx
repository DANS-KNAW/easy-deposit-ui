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
import { Field } from "redux-form"
import DoiField from "./basicInformation/DoiField"
import { RepeatableField } from "../../../lib/formComponents/RepeatableField"
import TextFieldArray from "../../../lib/formComponents/TextFieldArray"
import TextArea from "../../../lib/formComponents/TextArea"
import { DepositId } from "../../../model/Deposits"
import { Doi } from "../../../../../test/typescript/mockserver/metadata"
import { emptySchemedValue, QualifiedSchemedValue, SchemedValue } from "../../../lib/metadata/Value"
import { Contributor } from "../../../lib/metadata/Contributor"
import { QualifiedDate } from "../../../lib/metadata/Date"
import { Relation } from "../../../lib/metadata/Relation"
import { emptyString } from "../../../lib/metadata/misc"
import AudienceFieldArray from "./basicInformation/AudienceFieldArray"
import IdentifierFieldArray from "./basicInformation/IdentifierFieldArray"
import DateFieldArray from "./basicInformation/DateFieldArray"
import { DropdownList } from "../../../model/DropdownLists"
import { AppState } from "../../../model/AppState"
import { connect } from "react-redux"
import LanguageField from "./basicInformation/LanguageField"
import LanguageFieldArray from "./basicInformation/LanguageFieldArray"
import TextAreaEntry from "../../../lib/formComponents/TextAreaEntry"

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

interface BasicInformationFormProps {
    depositId: DepositId

    languages: DropdownList
    audiences: DropdownList
    identifiers: DropdownList
    dates: DropdownList
}

const BasicInformationForm = ({ depositId, languages, audiences, identifiers, dates }: BasicInformationFormProps) => (
    <div className="container pl-0 pr-0">
        <div className="row form-group input-element">
            <Field name="doi"
                   label="Digital Object Identifier"
                   depositId={depositId}
                   component={DoiField}/>
        </div>

        <div className="row form-group input-element">
            <Field name="languageOfDescription"
                   label="Language of description"
                   withEmptyDefault
                   component={LanguageField(languages)}/>
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
                   maxRows={15}
                   label="Description"
                   component={TextAreaEntry}/>
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
                             component={AudienceFieldArray(audiences)}/>
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
                             component={IdentifierFieldArray(identifiers)}/>
        </div>

        <div className="row form-group input-element">
            <p>Related identifier</p>
        </div>

        <div className="row form-group input-element">
            <p>Relation</p>
        </div>

        <div className="row form-group input-element">
            <RepeatableField name="languagesOfFilesIso639"
                             label="Language of files (ISO 639)"
                             empty={emptyString}
                             fieldNames={[(name: string) => name]}
                             component={LanguageFieldArray(languages)}/>
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
                             component={DateFieldArray(dates)}/>
        </div>

        <div className="row form-group input-element">
            <Field name="source"
                   rows={5}
                   maxRows={15}
                   label="Source"
                   component={TextAreaEntry}/>
        </div>

        <div className="row form-group input-element">
            <Field name="instructionsForReuse"
                   rows={5}
                   maxRows={15}
                   label="Instructions for reuse"
                   component={TextAreaEntry}/>
        </div>
    </div>
)

const mapStateToProps = (state: AppState) => ({
    languages: state.dropDowns.languages,
    audiences: state.dropDowns.audiences,
    identifiers: state.dropDowns.identifiers,
    dates: state.dropDowns.dates,
})

export default connect(mapStateToProps)(BasicInformationForm)
