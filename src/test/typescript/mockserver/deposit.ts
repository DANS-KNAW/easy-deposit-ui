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
    title: string
    state: string
    stateDescription: string
    date: string
}

export interface State {
    state: string
    stateDescription: string
}

export const depositData1: Deposit = {
    title: "Current Dataset with a very very very very very very very very very very long title",
    state: "DRAFT",
    stateDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultricies arcu nec erat rhoncus, non interdum risus mattis. ",
    date: "2018-01-20T10:40:52Z",
}
export const depositData2: Deposit = {
    title: "Missing file",
    state: "REJECTED",
    stateDescription: "there are some files missing",
    date: "2018-01-12T10:40:52Z",
}
export const depositData3: Deposit = {
    title: "First Dataset",
    state: "IN_PROGRESS",
    stateDescription: "",
    date: "2017-12-01T11:10:22Z",
}
export const depositData4: Deposit = {
    title: "Old Dataset",
    state: "ARCHIVED",
    stateDescription: "easy-dataset:id",
    date: "2017-08-09T10:10:22Z",
}
export const paginationDataset: (n: number) => Deposit = n => ({
    title: `Paginated dataset ${n}`,
    state: "ARCHIVED",
    stateDescription: "easy-dataset:id",
    date: "2017-08-09T10:10:22Z",
})
