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
declare const __DEVELOPMENT__: boolean
declare const __CLIENT_ROUTE__: string
declare const __VERSION__: string
declare const __BUILD_DATE__: string

export const inDevelopmentMode: boolean = __DEVELOPMENT__
export const contextRoot = __CLIENT_ROUTE__
export const projectVersion = __VERSION__
export const buildDate = __BUILD_DATE__
