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
export enum AuthenticationConstants {
    AUTH_LOGIN = "AUTH_LOGIN",
    AUTH_LOGIN_PENDING = "AUTH_LOGIN_PENDING",
    AUTH_LOGIN_REJECTED = "AUTH_LOGIN_REJECTED",
    AUTH_LOGIN_FULFILLED = "AUTH_LOGIN_FULFILLED",

    AUTH_LOGOUT = "AUTH_LOGOUT",
    AUTH_LOGOUT_FULFILLED = "AUTH_LOGOUT_FULFILLED",
    AUTH_LOGOUT_REJECTED = "AUTH_LOGOUT_REJECTED",
}

export const loginFormName = "easyLogin"
