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
import { RepeatableField, RepeatableFieldWithDropdown } from "../../../lib/formComponents/ReduxFormUtils"
import TextFieldArray from "../../../lib/formComponents/TextFieldArray"
import TextArea from "../../../lib/formComponents/TextArea"
import { DepositId } from "../../../model/Deposits"
import { Doi } from "../../../lib/metadata/Identifier"
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
import LanguageField from "./basicInformation/LanguageField"
import LanguageFieldArray from "./basicInformation/LanguageFieldArray"
import ContributorFields from "./basicInformation/ContributorFields"
import DatePickerField from "../../../lib/formComponents/DatePickerField"
import IsoDateFieldArray from "./basicInformation/IsoDateFieldArray"
import RelationFieldArray from "./basicInformation/RelationFieldArray"
import RelatedIdentifierFieldArray from "./basicInformation/RelatedIdentifierFieldArray"
import { useSelector } from "../../../lib/redux"

export interface BasicInformationFormData {
    doi?: Doi
    languageOfDescription?: string
    titles?: string[]
    alternativeTitles?: string[]
    description?: string
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
}

const BasicInformationForm = ({ depositId }: BasicInformationFormProps) => {
    const {languages, contributorRoles, audiences, identifiers, relations, dates} = useSelector(state => state.dropDowns)

    return (
        <>
            <Field name="doi"
                   label="Digital Object Identifier"
                   mandatory
                   helpText
                   depositId={depositId}
                   component={DoiField}/>

            <RepeatableField name="titles"
                             label="Title"
                             mandatory
                             helpText
                             empty={() => emptyString}
                             fieldNames={[(name: string) => name]}
                             component={TextFieldArray}/>

            <RepeatableField name="alternativeTitles"
                             label="Alternative title"
                             helpText
                             empty={() => emptyString}
                             fieldNames={[(name: string) => name]}
                             component={TextFieldArray}/>

            <Field name="description"
                   label="Description"
                   helpText
                   mandatory
                   rows={5}
                   maxRows={15}
                   component={TextArea}/>

            <Field name="languageOfDescription"
                   label="Language of description"
                   mandatory
                   withEmptyDefault
                   dropdown={languages}
                   component={LanguageField}/>

            <RepeatableFieldWithDropdown name="contributors"
                                         label="People & organisations"
                                         helpText
                                         mandatory
                                         empty={() => emptyContributor}
                                         fieldNames={[
                                             (name: string) => `${name}.titles`, // 0
                                             (name: string) => `${name}.initials`, // 1
                                             (name: string) => `${name}.insertions`, // 2
                                             (name: string) => `${name}.surname`, // 3
                                             (name: string) => `${name}.orcid`, // 4
                                             (name: string) => `${name}.isni`, // 5
                                             (name: string) => `${name}.dai`, // 6
                                             (name: string) => `${name}.role`, // 7
                                             (name: string) => `${name}.organization`, // 8
                                         ]}
                                         dropdowns={{ roles: contributorRoles }}
                                         component={ContributorFields}/>

            <Field name="dateCreated"
                   label="Dataset created"
                   mandatory
                   helpText
                   todayButton="Today"
                   showYearDropdown
                   yearDropdownItemNumber={100}
                   scrollableYearDropdown
                   maxDate={new Date()}
                   component={DatePickerField}/>

            <RepeatableFieldWithDropdown name="audiences"
                                         label="Audience"
                                         mandatory
                                         helpText
                                         empty={() => emptyString}
                                         fieldNames={[(name: string) => name]}
                                         dropdowns={{ audiences: audiences }}
                                         component={AudienceFieldArray}/>

            <RepeatableField name="subjects"
                             label="Subject"
                             helpText
                             empty={() => emptyString}
                             fieldNames={[(name: string) => name]}
                             component={TextFieldArray}/>

            <RepeatableFieldWithDropdown name="alternativeIdentifiers"
                                         label="Alternative identifier"
                                         helpText
                                         empty={() => emptySchemedValue}
                                         fieldNames={[
                                             (name: string) => `${name}.scheme`,
                                             (name: string) => `${name}.value`,
                                         ]}
                                         dropdowns={{ schemes: identifiers }}
                                         component={AlternativeIdentifierFieldArray}/>

            <RepeatableFieldWithDropdown name="relatedIdentifiers"
                                         label="Related identifier"
                                         helpText
                                         empty={() => emptyQualifiedSchemedValue(relations.list)}
                                         fieldNames={[
                                             (name: string) => `${name}.qualifier`,
                                             (name: string) => `${name}.scheme`,
                                             (name: string) => `${name}.value`,
                                         ]}
                                         dropdowns={{
                                             schemes: identifiers,
                                             qualifiers: relations,
                                         }}
                                         component={RelatedIdentifierFieldArray}/>

            <RepeatableFieldWithDropdown name="relations"
                                         label="Relations"
                                         showNoLabel
                                         empty={() => emptyRelation(relations.list)}
                                         fieldNames={[
                                             (name: string) => `${name}.qualifier`,
                                             (name: string) => `${name}.title`,
                                             (name: string) => `${name}.url`,
                                         ]}
                                         dropdowns={{ qualifiers: relations }}
                                         component={RelationFieldArray}/>

            <RepeatableFieldWithDropdown name="languagesOfFilesIso639"
                                         label="Language of files"
                                         helpText="languagesOfFiles"
                                         empty={() => emptyString}
                                         fieldNames={[(name: string) => name]}
                                         dropdowns={{ languages: languages }}
                                         component={LanguageFieldArray}/>

            <RepeatableField name="languagesOfFiles"
                             label="Only if you can’t use the dropdown field above"
                             showNoLabel
                             empty={() => emptyString}
                             fieldNames={[(name: string) => name]}
                             component={TextFieldArray}/>

            <RepeatableFieldWithDropdown name="datesIso8601"
                                         label="Date"
                                         helpText="dates"
                                         empty={() => emptyQualifiedDate(dates.list)}
                                         fieldNames={[
                                             (name: string) => `${name}.qualifier`,
                                             (name: string) => `${name}.value`,
                                         ]}
                                         dropdowns={{ dates: dates }}
                                         component={IsoDateFieldArray}/>

            <RepeatableFieldWithDropdown name="dates"
                                         label="Only if you can’t use the date selector above"
                                         showNoLabel
                                         empty={() => emptyQualifiedStringDate(dates.list)}
                                         fieldNames={[
                                             (name: string) => `${name}.qualifier`,
                                             (name: string) => `${name}.value`,
                                         ]}
                                         dropdowns={{ dates: dates }}
                                         component={DateFieldArray}/>

            <Field name="source"
                   label="Source"
                   helpText
                   rows={5}
                   maxRows={15}
                   component={TextArea}/>

            {/* TODO this field must be removed from the UI.
                 To avoid making things more complicated before the release, it is just 'hidden' for now. */}
            {/*<Field name="instructionsForReuse"
                   label="Instructions for reuse"
                   helpText
                   rows={5}
                   maxRows={15}
                   component={TextArea}/>*/}
        </>
    )
}

export default BasicInformationForm
