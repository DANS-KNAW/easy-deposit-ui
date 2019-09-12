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
import { FC } from "react"
import Loading from "../../components/Loading"
import { DropdownListState } from "../../model/DropdownLists"

interface LoadDropdownDataProperties {
    state: DropdownListState
}

const LoadDropdownData: FC<LoadDropdownDataProperties> = ({ children, state: { fetchingList, fetchedList, fetchListError } }) => (
    <>
        {fetchingList && <Loading/>}
        {fetchListError && <p>failed to fetch data for dropdown list</p>}
        {fetchedList && children}
    </>
)

export default LoadDropdownData
