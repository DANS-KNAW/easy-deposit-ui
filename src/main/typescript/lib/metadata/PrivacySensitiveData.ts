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
export enum PrivacySensitiveDataValue {
    YES = "yes",
    NO = "no",
    UNSPECIFIED = "unspecified"
}

export function toPrivacySensitiveData(value: string): PrivacySensitiveDataValue | undefined {
    return Object.values(PrivacySensitiveDataValue).find(v => v === value)
}

export const privacySensitiveDataConverter: (psd: any) => PrivacySensitiveDataValue = psd => {
    const res = toPrivacySensitiveData(psd)
    if (res)
        return res
    else
        throw `Error in metadata: no such privacy sensitive data value: '${psd}'`
}

export const privacySensitiveDataDeconverter: (psd: PrivacySensitiveDataValue) => any = psd => psd.toString()
