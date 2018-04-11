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

interface BasicInformationFormProps {
}

class BasicInformationForm extends Component<BasicInformationFormProps> {
    render() {
        return <p>Basic information form</p>
    }
}

export default BasicInformationForm
