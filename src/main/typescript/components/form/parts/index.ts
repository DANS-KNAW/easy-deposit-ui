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
import DataForm, { DataFormData } from "./DataForm"
import BasicInformationForm, { BasicInformationFormData } from "./BasicInformationForm"
import LicenseAndAccessForm, { LicenseAndAccessFormData } from "./LicenseAndAccessForm"
import UploadTypeForm, { UploadTypeFormData } from "./UploadTypeForm"
import ArchaeologySpecificMetadataForm, { ArchaeologySpecificMetadataFormData } from "./ArchaeologySpecificMetadataForm"
import TemporalAndSpatialCoverageForm, { TemporalAndSpatialCoverageFormData } from "./TemporalAndSpatialCoverageForm"
import MessageForDataManagerForm, { MessageForDataManagerFormData } from "./MessageForDataManagerForm"
import PrivacySensitiveDataForm, { PrivacySensitiveDataFormData } from "./PrivacySensitiveDataForm"
import DepositLicenseForm, { DepositLicenseFormData } from "./DepositLicenseForm"

export type DepositFormMetadata =
    & BasicInformationFormData
    & LicenseAndAccessFormData
    & UploadTypeFormData
    & ArchaeologySpecificMetadataFormData
    & TemporalAndSpatialCoverageFormData
    & MessageForDataManagerFormData
    & PrivacySensitiveDataFormData
    & DepositLicenseFormData

export type DepositFormData = DataFormData & DepositFormMetadata

export const Data = DataForm
export const BasicInformation = BasicInformationForm
export const LicenseAndAccess = LicenseAndAccessForm
export const UploadType = UploadTypeForm
export const ArchaeologySpecificMetadata = ArchaeologySpecificMetadataForm
export const TemporalAndSpatialCoverage = TemporalAndSpatialCoverageForm
export const MessageForDataManager = MessageForDataManagerForm
export const PrivacySensitiveData = PrivacySensitiveDataForm
export const DepositLicense = DepositLicenseForm
