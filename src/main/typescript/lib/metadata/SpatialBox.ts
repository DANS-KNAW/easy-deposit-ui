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
import { Schemed } from "./Value"
import { clean } from "./misc"

export interface Box extends Schemed {
    north?: number
    east?: number
    south?: number
    west?: number
}

export const emptyBox: Box = { scheme: "", north: undefined, east: undefined, south: undefined, west: undefined }

export const boxConverter: (b: any) => Box = b => {
    if (Number.isNaN(Number(b.north)) || Number.isNaN(Number(b.east)) || Number.isNaN(Number(b.south)) || Number.isNaN(Number(b.west)))
        throw `Error in metadata: Point ${JSON.stringify(b)} consists of something else than a Number`
    else
        return ({
            scheme: b.scheme,
            north: Number(b.north),
            east: Number(b.east),
            south: Number(b.south),
            west: Number(b.west),
        })
}

export const boxDeconverter: (b: Box) => any = b => clean({
    scheme: b.scheme,
    north: b.north && b.north.toString(),
    east: b.east && b.east.toString(),
    south: b.south && b.south.toString(),
    west: b.west && b.west.toString(),
})
