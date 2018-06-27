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
export enum FileInfoConstants {
    FETCH_DATAFILES= "FETCH_DATAFILES",
    FETCH_DATAFILES_FAILED="FETCH_DATAFILES_FAILED",
    FETCH_DATAFILES_SUCCEEDED = "FETCH_DATEFILES_SUCCEEDED",
    FETCH_DATAFILES_PENDING = "FETCH_DATAFILES_PENDING",
    FETCH_DATAFILES_FULFILLED = "FETCH_DATAFILES_FULFILLED",
    FETCH_DATAFILES_REJECTED = "FETCH_DATAFILES_REJECTED",

    DELETE_DATAFILES = "DELETE_DATAFILES",
    DELETE_DATAFILES_FAILED = "DELETE_DATAFILES_FAILED",
    DELETE_DATAFILES_PENDING = "DELETE_DATAFILES_PENDING",

    UPLOAD_DATAFILE = "UPLOAD_DATAFILE",
    UPLOAD_DATAFILE_PENDING = "UPLOAD_DATAFILE_PENDING",
    UPLOAD_DATAFILE_FULFILLED = "UPLOAD_DATAFILE_FULFILLED",
    UPLOAD_DATAFILE_REJECTED = "UPLOAD_DATAFILE_REJECTED",
    UPLOAD_DATAFILE_SUCCEEDED = "UPLOAD_DATAFILE_SUCCEEDED",
    UPLOAD_DATAFILE_FAILED = "UPLOAD_DATAFILE_FAILED",
}
