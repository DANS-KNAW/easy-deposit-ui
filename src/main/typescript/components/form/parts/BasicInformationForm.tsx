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
import {
    emptyQualifiedSchemedValue,
    emptySchemedValue,
    QualifiedSchemedValue,
    SchemedValue,
} from "../../../lib/metadata/Value"
import { Contributor, emptyContributor } from "../../../lib/metadata/Contributor"
import { emptyQualifiedDate, emptyQualifiedStringDate, QualifiedDate } from "../../../lib/metadata/Date"
import { emptyRelation, Relation } from "../../../lib/metadata/Relation"
import { emptyString } from "../../../lib/metadata/misc"
import AudienceFieldArray from "./basicInformation/AudienceFieldArray"
import AlternativeIdentifierFieldArray from "./basicInformation/AlternativeIdentifierFieldArray"
import DateFieldArray from "./basicInformation/DateFieldArray"
import { DropdownList } from "../../../model/DropdownLists"
import { AppState } from "../../../model/AppState"
import { connect } from "react-redux"
import LanguageField from "./basicInformation/LanguageField"
import LanguageFieldArray from "./basicInformation/LanguageFieldArray"
import ContributorFields from "./basicInformation/ContributorFields"
import DatePickerField from "../../../lib/formComponents/DatePickerField"
import * as moment from "moment"
import IsoDateFieldArray from "./basicInformation/IsoDateFieldArray"
import RelationFieldArray from "./basicInformation/RelationFieldArray"
import RelatedIdentifierFieldArray from "./basicInformation/RelatedIdentifierFieldArray"

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
    contributorIds: DropdownList
    contributorRoles: DropdownList
    audiences: DropdownList
    identifiers: DropdownList
    relations: DropdownList
    dates: DropdownList
}

const BasicInformationForm = ({ depositId, languages, contributorIds, contributorRoles, audiences, identifiers, relations, dates }: BasicInformationFormProps) => (
    <>
        <Field name="doi"
               label="Digital Object Identifier"
               depositId={depositId}
               component={DoiField}/>

        <Field name="languageOfDescription"
               label="Language of description"
               withEmptyDefault
               component={LanguageField(languages)}/>

        <RepeatableField name="titles"
                         label="Title"
                         empty={emptyString}
                         fieldNames={[(name: string) => name]}
                         component={TextFieldArray}/>

        <RepeatableField name="alternativeTitles"
                         label="Alternative title"
                         empty={emptyString}
                         fieldNames={[(name: string) => name]}
                         component={TextFieldArray}/>

        <Field name="description"
               label="Description"
               rows={5}
               maxRows={15}
               component={TextArea}/>

        <RepeatableField name="creators"
                         label="Creator"
                         empty={emptyContributor}
                         fieldNames={[
                             (name: string) => `${name}.titles`, // 0
                             (name: string) => `${name}.initials`, // 1
                             (name: string) => `${name}.insertions`, // 2
                             (name: string) => `${name}.surname`, // 3
                             (name: string) => `${name}.ids`, // 4
                             (name: string) => `${name}.role`, // 5
                             (name: string) => `${name}.organization`, // 6
                         ]}
                         component={ContributorFields(contributorIds, contributorRoles)}/>

        <RepeatableField name="contributors"
                         label="Contributors"
                         empty={emptyContributor}
                         fieldNames={[
                             (name: string) => `${name}.titles`, // 0
                             (name: string) => `${name}.initials`, // 1
                             (name: string) => `${name}.insertions`, // 2
                             (name: string) => `${name}.surname`, // 3
                             (name: string) => `${name}.ids`, // 4
                             (name: string) => `${name}.role`, // 5
                             (name: string) => `${name}.organization`, // 6
                         ]}
                         component={ContributorFields(contributorIds, contributorRoles)}/>

        <Field name="dateCreated"
               label="Date created"
               todayButton="Today"
               showYearDropdown
               yearDropdownItemNumber={10}
               scrollableYearDropdown
               maxDate={moment()}
               component={DatePickerField}/>

        <RepeatableField name="audiences"
                         label="Audience"
                         empty={emptyString}
                         fieldNames={[(name: string) => name]}
                         component={AudienceFieldArray(audiences)}/>

        <RepeatableField name="subjects"
                         label="Subject"
                         empty={emptyString}
                         fieldNames={[(name: string) => name]}
                         component={TextFieldArray}/>

        <RepeatableField name="alternativeIdentifiers"
                         label="Alternative identifier"
                         empty={emptySchemedValue}
                         fieldNames={[
                             (name: string) => `${name}.scheme`,
                             (name: string) => `${name}.value`,
                         ]}
                         component={AlternativeIdentifierFieldArray(identifiers)}/>

        <RepeatableField name="relatedIdentifiers"
                         label="Relations"
                         empty={emptyQualifiedSchemedValue}
                         fieldNames={[
                             (name: string) => `${name}.qualifier`,
                             (name: string) => `${name}.scheme`,
                             (name: string) => `${name}.value`,
                         ]}
                         component={RelatedIdentifierFieldArray(relations, identifiers)}/>

        <RepeatableField name="relations"
                         label=""
                         empty={emptyRelation}
                         fieldNames={[
                             (name: string) => `${name}.qualifier`,
                             (name: string) => `${name}.title`,
                             (name: string) => `${name}.url`,
                         ]}
                         component={RelationFieldArray(relations)}/>

        <RepeatableField name="languagesOfFilesIso639"
                         label="Language of files (ISO 639)"
                         empty={emptyString}
                         fieldNames={[(name: string) => name]}
                         component={LanguageFieldArray(languages)}/>

        <RepeatableField name="languagesOfFiles"
                         label="Language of files"
                         empty={emptyString}
                         fieldNames={[(name: string) => name]}
                         component={TextFieldArray}/>

        <RepeatableField name="datesIso8601"
                         label="Date (ISO 8601)"
                         empty={emptyQualifiedDate}
                         fieldNames={[
                             (name: string) => `${name}.qualifier`,
                             (name: string) => `${name}.value`,
                         ]}
                         component={IsoDateFieldArray(dates)}/>

        <RepeatableField name="dates"
                         label="Date"
                         empty={emptyQualifiedStringDate}
                         fieldNames={[
                             (name: string) => `${name}.qualifier`,
                             (name: string) => `${name}.value`,
                         ]}
                         component={DateFieldArray(dates)}/>

        <Field name="source"
               label="Source"
               rows={5}
               maxRows={15}
               component={TextArea}/>

        <Field name="instructionsForReuse"
               label="Instructions for reuse"
               rows={5}
               maxRows={15}
               component={TextArea}/>
    </>
)

const mapStateToProps = (state: AppState) => ({
    languages: state.dropDowns.languages,
    contributorIds: state.dropDowns.contributorIds,
    contributorRoles: state.dropDowns.contributorRoles,
    audiences: state.dropDowns.audiences,
    identifiers: state.dropDowns.identifiers,
    relations: state.dropDowns.relations,
    dates: state.dropDowns.dates,
})

export default connect(mapStateToProps)(BasicInformationForm)
