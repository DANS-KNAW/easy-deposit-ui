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
export interface Deposit {
    id: string
    title: string
    state: string
    state_description: string
    date: string
}

export interface State {
    state: string
    state_description: string
}

export const depositData: Deposit[] = [
    {
        id: "93674123-1699-49c5-af91-ed31db19adc9",
        title: "Current Dataset with a very very very very very very very very very very long title",
        state: "DRAFT",
        state_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultricies arcu nec erat rhoncus, non interdum risus mattis. ",
        date: "2018-01-20T10:40:52Z",
    },
    {
        id: "1d946f5b-e53b-4f71-b1f3-7481475d07db",
        title: "Missing file",
        state: "REJECTED",
        state_description: "there are some files missing",
        date: "2018-01-12T10:40:52Z",
    },
    {
        id: "a145a1be-5463-4b10-a621-a9e511ff7f20",
        title: "First Dataset",
        state: "IN_PROGRESS",
        state_description: "",
        date: "2017-12-01T11:10:22Z",
    },
    {
        id: "5befec97-1e57-4210-b7b6-57a604aaef47",
        title: "Old Dataset",
        state: "ARCHIVED",
        state_description: "easy-dataset:id",
        date: "2017-08-09T10:10:22Z",
    },
]
