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
import { allfields, mandatoryOnly, Metadata, newMetadata } from "./metadata"

interface DataPerDraft {
    deposit: Deposit
    metadata?: Metadata
}

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

export const listDeposits: () => (Deposit & { id: string })[] = () => {
    return Object.keys(data).map(id => ({ id, ...data[id].deposit }))
}

export const getDeposit: (id: string) => Deposit & { id: string } | undefined = id => {
    return data[id]
        ? { id: id, ...data[id].deposit }
        : undefined
}

const newDeposit: () => Deposit = () => ({
    title: "New Deposit",
    state: "DRAFT",
    state_description: "",
    date: new Date().toISOString(),
})
export const createDeposit: () => Deposit & { id: string } = () => {
    const id = uuid()
    const deposit = newDeposit()
    const metadata = newMetadata()
    data = { ...data, [id]: { deposit, metadata } }
    return { id, ...deposit }
}

export const deleteDeposit: (id: string) => boolean = id => {
    if (data[id]) {
        data = immutable.del(data, id)
        return true
    }
    else {
        return false
    }
}

export const getState: (id: string) => State | undefined = id => {
    return data[id]
        ? { state: data[id].deposit.state, state_description: data[id].deposit.state_description }
        : undefined
}

export const setState: (id: string, state: State) => boolean = (id, state) => {
    if (data[id]) {
        data = { ...data,
            [id]: {
                ...data[id],
                deposit: { ...data[id].deposit, state: state.state, state_description: state.state_description },
            },
        }
        return true
    }
    else return false
}

export const hasMetadata: (id: string) => boolean = id => {
    return data[id]
        ? data[id].metadata !== undefined
        : false
}

export const getMetadata: (id: string) => Metadata | undefined = id => {
    return data[id]
        ? data[id].metadata
        : undefined
}

export const setMetadata: (id: string, metadata: Metadata) => void = (id, metadata) => {
    if (data[id]) {
        data = { ...data, [id]: { ...data[id], metadata } }
    }
    else return false
}
