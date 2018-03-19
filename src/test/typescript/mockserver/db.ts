import * as uuid from "uuid/v4"
import { Deposit, depositData, State } from "./deposit"
import { Metadata, metadataData, newMetadata } from "./metadata"

export interface Data {
    deposit: Deposit[]
    metadata: { [id: string]: Metadata | undefined }
}

let data: Data = {
    deposit: depositData,
    metadata: metadataData,
}

export const getData: () => Data = () => data

export const getDeposit: (id: string) => Deposit | undefined = id => {
    return data.deposit.find(deposit => deposit.id === id)
}

const newDeposit: () => Deposit = () => ({
    id: uuid(),
    title: "New Deposit",
    state: "DRAFT",
    state_description: "",
    date: new Date().toISOString(),
})
export const createDeposit: () => Deposit = () => {
    const deposit = newDeposit()
    const metadata = newMetadata()
    data = { ...data, deposit: [...data.deposit, deposit], metadata: { ...data.metadata, [deposit.id]: metadata } }
    return deposit
}

export const deleteDeposit: (id: string) => boolean = id => {
    const exists = data.deposit.find(deposit => deposit.id === id) !== undefined
    if (exists) {
        data = { ...data, deposit: data.deposit.filter(deposit => deposit.id !== id) }
        return true
    }
    else {
        return false
    }
}

export const getState: (id: string) => State | undefined = id => {
    const deposit = data.deposit.find(deposit => deposit.id === id)
    return deposit
        ? { state: deposit.state, state_description: deposit.state_description }
        : undefined
}

export const setState: (id: string, state: State) => boolean = (id, state) => {
    const deposit = data.deposit.find(deposit => deposit.id === id)
    if (deposit) {
        const newDeposit = { ...deposit, state: state.state, state_description: state.state_description }
        data = { ...data, deposit: data.deposit.map(dep => dep === deposit ? newDeposit : dep) }
        return true
    }
    else return false
}

export const hasMetadata: (id: string) => boolean = id => {
    return !!Object.keys(data.metadata).find(key => key === id)
}

export const getMetadata: (id: string) => Metadata | undefined = id => {
    return data.metadata[id]
}

export const setMetadata: (id: string, metadata: Metadata) => void = (id, metadata) => {
    data = { ...data, metadata: { ...data.metadata, [id]: metadata } }
}
