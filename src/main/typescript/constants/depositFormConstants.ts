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
export enum DepositFormConstants {
    REGISTER_FORM = "REGISTER_FORM",
    UNREGISTER_FORM = "UNREGISTER_FORM",

    FETCH_METADATA = "FETCH_METADATA",
    FETCH_METADATA_PENDING = "FETCH_METADATA_PENDING",
    FETCH_METADATA_FULFILLED = "FETCH_METADATA_FULFILLED",
    FETCH_METADATA_REJECTED = "FETCH_METADATA_REJECTED",
    FETCH_METADATA_SUCCESS = "FETCH_METADATA_SUCCESS",
    FETCH_METADATA_FAILED = "FETCH_METADATA_FAILED",

    FETCH_DOI = "FETCH_DOI",
    FETCH_DOI_PENDING = "FETCH_DOI_PENDING",
    FETCH_DOI_FULFILLED = "FETCH_DOI_FULFILLED",
    FETCH_DOI_REJECTED = "FETCH_DOI_REJECTED",
    FETCH_DOI_SUCCESS = "FETCH_DOI_SUCCESS",
    FETCH_DOI_FAILED = "FETCH_DOI_FAILED",

    SAVE_DRAFT = "SAVE_DRAFT",

    SEND_SAVE_DRAFT = "SEND_SAVE_DRAFT",
    SEND_SAVE_DRAFT_PENDING = "SEND_SAVE_DRAFT_PENDING",
    SEND_SAVE_DRAFT_FULFILLED = "SEND_SAVE_DRAFT_FULFILLED",
    SEND_SAVE_DRAFT_REJECTED = "SEND_SAVE_DRAFT_REJECTED",
    SEND_SAVE_DRAFT_FAILED = "SEND_SAVE_DRAFT_FAILED",
    SEND_SAVE_DRAFT_RESET = "SEND_SAVE_DRAFT_RESET",

    SUBMIT_DEPOSIT = "SUBMIT_DEPOSIT",

    SEND_SUBMIT_DEPOSIT = "SEND_SUBMIT_DEPOSIT",
    SEND_SUBMIT_DEPOSIT_PENDING = "SEND_SUBMIT_DEPOSIT_PENDING",
    SEND_SUBMIT_DEPOSIT_FULFILLED = "SEND_SUBMIT_DEPOSIT_FULFILLED",
    SEND_SUBMIT_DEPOSIT_REJECTED = "SEND_SUBMIT_DEPOSIT_REJECTED",
    SEND_SUBMIT_DEPOSIT_FAILED = "SEND_SUBMIT_DEPOSIT_FAILED",
}

export const depositFormName = "depositForm"
export const saveDraftResetTimeout = 5 // seconds
