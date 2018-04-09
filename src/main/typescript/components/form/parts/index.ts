import DataForm, { DataFormData } from "./DataForm"
import BasicInformationForm, { BasicInformationFormData } from "./BasicInformationForm"
import LicenseAndAccessForm, { LicenseAndAccessFormData } from "./LicenseAndAccessForm"
import UploadTypeForm, { UploadTypeFormData } from "./UploadTypeForm"
import ArchaeologySpecificMetadataForm, { ArchaeologySpecificMetadataFormData } from "./ArchaeologySpecificMetadataForm"
import LanguageAndLiteratureSpecificMetadataForm, { LanguageAndLiteratureSpecificMetadataFormData } from "./LanguageAndLiteratureSpecificMetadataForm"
import TemporalAndSpatialCoverageForm, { TemporalAndSpatialCoverageFormData } from "./TemporalAndSpatialCoverageForm"
import MessageForDataManagerForm, { MessageForDataManagerFormData } from "./MessageForDataManagerForm"
import PrivacySensitiveDataForm, { PrivacySensitiveDataFormData } from "./PrivacySensitiveDataForm"
import DepositLicenseForm, { DepositLicenseFormData } from "./DepositLicenseForm"
import { reduxForm } from "redux-form"
import { DepositId } from "../../../model/Deposits"

export type DepositFormData = DataFormData
    & BasicInformationFormData
    & LicenseAndAccessFormData
    & UploadTypeFormData
    & ArchaeologySpecificMetadataFormData
    & LanguageAndLiteratureSpecificMetadataFormData
    & TemporalAndSpatialCoverageFormData
    & MessageForDataManagerFormData
    & PrivacySensitiveDataFormData
    & DepositLicenseFormData

export const Data = DataForm
export const BasicInformation = BasicInformationForm
export const LicenseAndAccess = LicenseAndAccessForm
export const UploadType = UploadTypeForm
export const ArchaeologySpecificMetadata = ArchaeologySpecificMetadataForm
export const LanguageAndLiteratureSpecificMetadata = LanguageAndLiteratureSpecificMetadataForm
export const TemporalAndSpatialCoverage = TemporalAndSpatialCoverageForm
export const MessageForDataManager = MessageForDataManagerForm
export const PrivacySensitiveData = PrivacySensitiveDataForm
export const DepositLicense = DepositLicenseForm
