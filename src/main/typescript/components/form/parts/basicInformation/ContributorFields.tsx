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
import { ContributorIdDropdownListEntry, DropdownList } from "../../../../model/DropdownLists"
import { FieldArrayPropsWithDropdown } from "../../../../lib/formComponents/ReduxFormUtils"
import { Contributor } from "../../../../lib/metadata/Contributor"
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"
import ContributorFieldArray from "../../../../lib/formComponents/ContributorFieldArray"

type ContributorFieldsProps = FieldArrayPropsWithDropdown<Contributor, DropdownList<ContributorIdDropdownListEntry>>

const ContributorFields = ({dropdowns: {ids, roles}, ...props}: ContributorFieldsProps) => (
    <LoadDropdownData state={ids.state}>
        <LoadDropdownData state={roles.state}>
            <ContributorFieldArray {...props} idValues={ids.list} roleValues={roles.list}/>
        </LoadDropdownData>
    </LoadDropdownData>
)

export default ContributorFields
