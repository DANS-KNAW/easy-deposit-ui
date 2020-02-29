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
export enum FileOverviewConstants {
    FETCH_FILES = "FETCH_FILES",
    FETCH_FILES_PENDING = "FETCH_FILES_PENDING",
    FETCH_FILES_REJECTED = "FETCH_FILES_REJECTED",
    FETCH_FILES_FULFILLED = "FETCH_FILES_FULFILLED",
    FETCH_FILES_SUCCESS = "FETCH_FILES_SUCCESS",

    CLEAN_FILES = "CLEAN_FILES",

    DELETE_FILE_CONFIRMATION = "DELETE_FILE_CONFIRMATION",
    DELETE_FILE_CANCELLED = "DELETE_FILE_CANCELLED",
    DELETE_FILE = "DELETE_FILE",
    DELETE_FILE_PENDING = "DELETE_FILE_PENDING",
    DELETE_FILE_FULFILLED = "DELETE_FILE_FULFILLED",
    DELETE_FILE_REJECTED = "DELETE_FILE_REJECTED",
}
