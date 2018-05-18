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

enum TemporalCoverageScheme {
    abrPeriode = "abr:ABRperiode",
}

function toTemporalCoverageScheme(value: string): TemporalCoverageScheme | undefined {
    return Object.values(TemporalCoverageScheme).find(v => v === value)
}

export const temporalCoveragesConverter: (coverage: any[]) => [Value[], Value[]] = coverages => {
    return coverages.reduce(([abrCoverage, normalCoverages], coverage) => {
        const scheme = coverage.scheme && toTemporalCoverageScheme(coverage.scheme)
        const value = coverage.value

        if (scheme && scheme == TemporalCoverageScheme.abrPeriode)
            return [[...abrCoverage, { value: coverage.key }], normalCoverages]
        else if (isEqual(Object.keys(coverage), ["value"]))
            return [abrCoverage, [...normalCoverages, { value: coverage.value }]]
        else
            throw `Error in metadata: unrecognized object: ${JSON.stringify(coverage)}`
    }, [[emptyStringValue], [emptyStringValue]])
}

export const abrTemporalCoverageDeconverter: (coverage: Value) => any = coverage => ({
    scheme: TemporalCoverageScheme.abrPeriode,
    key: coverage.value,
    value: "???", // TODO get correct value
})

export const temporalCoverageDeconverter: (coverage: Value) => any = coverage => ({
    value: coverage.value,
})
