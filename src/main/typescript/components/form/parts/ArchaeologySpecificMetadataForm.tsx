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
import TextFieldArray from "../../../lib/formComponents/TextFieldArray"
import { RepeatableField, RepeatableFieldWithDropdown } from "../../../lib/formComponents/ReduxFormUtils"
import { emptyString } from "../../../lib/metadata/misc"
import AbrComplexSubjectFieldArray from "./archaeologySpecificMetadata/AbrComplexSubjectFieldArray"
import AbrPeriodeTemporalsFieldArray from "./archaeologySpecificMetadata/AbrPeriodeTemporalsFieldArray"
import { useSelector } from "../../../lib/redux"

export interface ArchaeologySpecificMetadataFormData {
    archisNrs?: string[]
    subjectsAbrComplex?: string[]
    temporalCoveragesAbr?: string[]
}

const ArchaeologySpecificMetadataForm = () => (
    <>
        <RepeatableField name="archisNrs"
                         label="Archis zaakidentificatie"
                         helpText
                         empty={() => emptyString}
                         fieldNames={[(name: string) => name]}
                         component={TextFieldArray}/>

        <RepeatableFieldWithDropdown name="subjectsAbrComplex"
                                     label="Subject (ABR complex)"
                                     helpText
                                     empty={() => emptyString}
                                     fieldNames={[(name: string) => name]}
                                     dropdowns={{ subjects: useSelector(state => state.dropDowns.abrComplexSubjects) }}
                                     component={AbrComplexSubjectFieldArray}/>

        <RepeatableFieldWithDropdown name="temporalCoveragesAbr"
                                     label="Temporal (ABR period)"
                                     helpText
                                     empty={() => emptyString}
                                     fieldNames={[(name: string) => name]}
                                     dropdowns={{ periods: useSelector(state => state.dropDowns.abrPeriodeTemporals) }}
                                     component={AbrPeriodeTemporalsFieldArray}/>
    </>
)

export default ArchaeologySpecificMetadataForm
