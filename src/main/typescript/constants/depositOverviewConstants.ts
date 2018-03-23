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
export enum DepositOverviewConstants {
    FETCH_DEPOSITS = "FETCH_DEPOSITS",
    FETCH_DEPOSITS_PENDING = "FETCH_DEPOSITS_PENDING",
    FETCH_DEPOSITS_FULFILLED = "FETCH_DEPOSITS_FULFILLED",
    FETCH_DEPOSITS_REJECTED = "FETCH_DEPOSITS_REJECTED",
    FETCH_DEPOSITS_SUCCESS = "FETCH_DEPOSITS_SUCCESS",
    FETCH_DEPOSITS_FAILED = "FETCH_DEPOSITS_FAILED",

    CLEAN_DEPOSITS = "CLEAN_DEPOSITS",

    DELETE_DEPOSIT = "DELETE_DEPOSIT",
    DELETE_DEPOSIT_PENDING = "DELETE_DEPOSIT_PENDING",
    DELETE_DEPOSIT_FULFILLED = "DELETE_DEPOSIT_FULFILLED",
    DELETE_DEPOSIT_REJECTED = "DELETE_DEPOSIT_REJECTED",
    DELETE_DEPOSIT_FAILED = "DELETE_DEPOSIT_FAILED",
}
