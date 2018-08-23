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
import { clean } from "./misc"

export interface AccessRight {
    category?: AccessRightValue
    group?: string
}

export enum AccessRightValue {
    OPEN_ACCESS = "OPEN_ACCESS",
    // OPEN_ACCESS_FOR_REGISTERED_USERS = "OPEN_ACCESS_FOR_REGISTERED_USERS",
    GROUP_ACCESS = "GROUP_ACCESS",
    REQUEST_PERMISSION = "REQUEST_PERMISSION",
    // NO_ACCESS = "NO_ACCESS",
}

function toAccessRight(value: string): AccessRightValue | undefined {
    return Object.values(AccessRightValue).find(v => v === value)
}

export const accessRightConverter: (ar: any) => AccessRight = ar => {
    const category = toAccessRight(ar.category)
    if (category)
        switch (category) {
            case AccessRightValue.GROUP_ACCESS:
                if (!!ar.group)
                    return {
                        category: category,
                        group: ar.group,
                    }
                else
                    throw `Error in metadata: access right ${AccessRightValue.GROUP_ACCESS} has no 'group' defined`
            default:
                if (!!ar.group)
                    throw `Error in metadata: access right is not ${AccessRightValue.GROUP_ACCESS} but has a 'group' defined`
                else
                    return {
                        category: category,
                    }

        }
    else
        throw `Error in metadata: no such access category: '${ar.category}'`
}

export const accessRightDeconverter: (ar: AccessRight) => any = ar => {
    switch (ar.category) {
        case AccessRightValue.GROUP_ACCESS:
            return clean({
                category: ar.category,
                group: ar.group,
            })
        default:
            return clean({
                category: ar.category,
            })
    }
}
