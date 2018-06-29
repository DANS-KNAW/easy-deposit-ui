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
import { DropdownListEntry } from "../../model/DropdownLists"

export interface Box {
    scheme?: string
    north?: string
    east?: string
    south?: string
    west?: string
}

export const emptyBox: Box = {
    scheme: "",
    north: undefined,
    east: undefined,
    south: undefined,
    west: undefined,
}

export const boxConverter: (schemeValues: DropdownListEntry[]) => (b: any) => Box = schemeValues => b => {
    const validInput = b.north && Number.isNaN(Number(b.north))
        || b.east && Number.isNaN(Number(b.east))
        || b.south && Number.isNaN(Number(b.south))
        || b.west && Number.isNaN(Number(b.west))

    if (validInput)
        throw `Error in metadata: Box ${JSON.stringify(b)} consists of something else than a Number`
    else if (b.scheme && !schemeValues.find(({ key }) => key === b.scheme))
        throw `Error in metadata: unknown coordinate system: '${b.scheme}'`
    else
        return {
            scheme: b.scheme,
            north: b.north,
            east: b.east,
            south: b.south,
            west: b.west,
        }
}

export const boxDeconverter: (b: Box) => any = b => clean({
    scheme: b.scheme,
    north: b.north && Number(b.north),
    east: b.east && Number(b.east),
    south: b.south && Number(b.south),
    west: b.west && Number(b.west),
})
