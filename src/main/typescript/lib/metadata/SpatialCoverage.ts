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
import { emptyStringValue, Value } from "./Value"
import {isEqual} from "lodash"

enum SpatialCoverageScheme {
    iso3166 = "dcterms:ISO3166",
}

function toSpatialCoverageScheme(value: string): SpatialCoverageScheme | undefined {
    return Object.values(SpatialCoverageScheme).find(v => v === value)
}

export const spatialCoveragesConverter: (coverage: any[]) => [Value[], Value[]] = coverages => {
    return coverages.reduce(([isoCoverage, normalCoverages], coverage) => {
        const scheme = coverage.scheme && toSpatialCoverageScheme(coverage.scheme)

        if (scheme && scheme == SpatialCoverageScheme.iso3166)
            return [[...isoCoverage, { value: coverage.key }], normalCoverages]
        else if (isEqual(Object.keys(coverage), ["value"]))
            return [isoCoverage, [...normalCoverages, { value: coverage.value }]]
        else
            throw `Error in metadata: unrecognized object: ${JSON.stringify(coverage)}`
    }, [[], []])
}

export const isoSpatialCoverageDeconverter: (coverage: Value) => any = coverage => ({
    scheme: SpatialCoverageScheme.iso3166,
    key: coverage.value,
    value: "???", // TODO get correct value
})

export const spatialCoverageDeconverter: (coverage: Value) => any = coverage => ({
    value: coverage.value,
})
