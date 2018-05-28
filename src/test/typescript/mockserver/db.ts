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
import * as uuid from "uuid/v4"
import immutable from "object-path-immutable"
import { Deposit, depositData1, depositData2, depositData3, depositData4, State } from "./deposit"
import { allfields, Doi, DansIdentifierSchemeValues, mandatoryOnly, Metadata, newMetadata } from "./metadata"
import { User, User001 } from "./user"
import { Directory001, FileInfo } from "./fileinfo"

interface DataPerDraft {
    deposit: Deposit
    metadata?: Metadata
}

export type DepositId = string
export type Data = { [id: string]: DataPerDraft }

let data: Data = {
    "93674123-1699-49c5-af91-ed31db19adc9": {
        deposit: depositData1,
        metadata: allfields,
    },
    "1d946f5b-e53b-4f71-b1f3-7481475d07db": {
        deposit: depositData2,
        metadata: mandatoryOnly,
    },
    "a145a1be-5463-4b10-a621-a9e511ff7f20": {
        deposit: depositData3,
    },
    "5befec97-1e57-4210-b7b6-57a604aaef47": {
        deposit: depositData4,
    },
}

export const listDeposits: () => (Deposit & { id: DepositId })[] = () => {
    return Object.keys(data).map(id => ({ id, ...data[id].deposit }))
}

export const getDeposit: (id: DepositId) => Deposit & { id: DepositId } | undefined = id => {
    return data[id]
        ? { id: id, ...data[id].deposit }
        : undefined
}

const newDeposit: () => Deposit = () => ({
    title: "New Deposit",
    state: "DRAFT",
    stateDescription: "",
    date: new Date().toISOString(),
})
export const createDeposit: () => Deposit & { id: DepositId } = () => {
    const id = uuid()
    const deposit = newDeposit()
    const metadata = newMetadata()
    data = { ...data, [id]: { deposit, metadata } }
    return { id, ...deposit }
}

export const deleteDeposit: (id: DepositId) => boolean = id => {
    if (data[id]) {
        data = immutable.del(data, id)
        return true
    }
    else {
        return false
    }
}

export const getState: (id: DepositId) => State | undefined = id => {
    return data[id]
        ? { state: data[id].deposit.state, stateDescription: data[id].deposit.stateDescription }
        : undefined
}

export const setState: (id: DepositId, state: State) => boolean = (id, state) => {
    if (data[id]) {
        data = {
            ...data,
            [id]: {
                ...data[id],
                deposit: { ...data[id].deposit, state: state.state, stateDescription: state.stateDescription },
            },
        }
        return true
    }
    else return false
}

export const hasMetadata: (id: DepositId) => boolean = id => {
    return data[id]
        ? data[id].metadata !== undefined
        : false
}

export const getMetadata: (id: DepositId) => Metadata | undefined = id => {
    return data[id]
        ? data[id].metadata
        : undefined
}

export const setMetadata: (id: DepositId, metadata: Metadata) => void = (id, metadata) => {
    if (data[id]) {
        data = { ...data, [id]: { ...data[id], metadata } }
    }
    else return false
}

export const getDoi: (id: DepositId) => Doi | undefined = id => {
    if (data[id]) {
        const metadata = data[id].metadata
        if (metadata && metadata.identifiers) {
            const sv = metadata.identifiers.find(sv => sv.scheme === DansIdentifierSchemeValues.DOI)
            if (sv)
                return sv.value
            else {
                const doi = generateNewDoi()

                data = {
                    ...data,
                    [id]: {
                        ...data[id],
                        metadata: {
                            ...metadata,
                            identifiers: [...metadata.identifiers, { scheme: DansIdentifierSchemeValues.DOI, value: doi }],
                        },
                    },
                }

                return doi
            }
        }
        else if (metadata && !metadata.identifiers) {
            const doi = generateNewDoi()

            data = {
                ...data,
                [id]: {
                    ...data[id],
                    metadata: {
                        ...metadata,
                        identifiers: [{ scheme: DansIdentifierSchemeValues.DOI, value: doi }],
                    },
                },
            }

            return doi
        }
    }
    else
        return undefined
}

const generateNewDoi = () => `doi:10.17632/DANS.${uuid().substr(0, 10)}.1`

export const getUser: () => User = () => {
    return User001
}
export const getDirectoryListing: () =>  FileInfo[] = () => {
    return Directory001
}
