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
import { isEmpty, pickBy, keys, isNumber, isString, isArray, isObject } from "lodash"

export function normalizeEmpty<T>(arr: T[] | undefined, defaultValue: () => T): T[] {
    if (!arr || isEmpty(arr))
        return [defaultValue()]
    else
        return arr
}

export function clean<T extends object>(obj: T): Partial<T> {
    return pickBy(obj, v => {
        if (isString(v))
            return v !== ""
        else if (isNumber(v))
            return v !== 0
        else if (isObject(v))
            return keys(v).length !== 0
        else if (isArray(v))
            return !isEmpty(v)
    })
}

export function nonEmptyObject<T>(obj: T): boolean {
    return !!obj && !isEmpty(obj)
}

export const emptyString: string = ""

export const isEmptyString: (s: String) => boolean = s => s.length === 0
