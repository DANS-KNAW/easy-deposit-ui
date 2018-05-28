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
import { isEqual } from "lodash"
import { clean } from "./misc"
import { DropdownListEntry } from "../../model/DropdownLists"

enum TemporalCoverageScheme {
    abrPeriode = "abr:ABRperiode",
}

function toTemporalCoverageScheme(value: string): TemporalCoverageScheme | undefined {
    return Object.values(TemporalCoverageScheme).find(v => v === value)
}

export const temporalCoveragesConverter: (abrPeriodeTemporals: DropdownListEntry[]) => (coverage: any[]) => [string[], string[]] = abrPeriodeTemporals => coverages => {
    return coverages.reduce(([abrCoverage, normalCoverages], coverage) => {
        const scheme = coverage.scheme && toTemporalCoverageScheme(coverage.scheme)

        if (scheme && scheme === TemporalCoverageScheme.abrPeriode)
            if (abrPeriodeTemporals.find(({ key }) => key === coverage.key))
                return [[...abrCoverage, coverage.key], normalCoverages]
            else
                throw `Error in metadata: no such ABR temporal periode found: '${coverage.key}'`
        else if (isEqual(Object.keys(coverage), ["value"]))
            return [abrCoverage, [...normalCoverages, coverage.value]]
        else
            throw `Error in metadata: unrecognized object: ${JSON.stringify(coverage)}`
    }, [[], []])
}

export const abrTemporalCoverageDeconverter: (abrPeriodeTemporals: DropdownListEntry[]) => (coverage: string) => any = abrPeriodeTemporals => coverage => {
    const entry: DropdownListEntry | undefined = abrPeriodeTemporals.find(({ key }) => key === coverage)

    if (coverage)
        if (entry)
            return {
                scheme: TemporalCoverageScheme.abrPeriode,
                key: coverage,
                value: entry.value,
            }
        else
            throw `Error in metadata: no valid ABR periode temporal found for key '${coverage}'`
    else
        return {}
}

export const temporalCoverageDeconverter: (coverage: string) => any = coverage => clean({
    value: coverage,
})
