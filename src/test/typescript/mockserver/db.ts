import * as uuid from "uuid/v4"

export interface Data {
    deposit: Deposit[]
}

export interface Deposit {
    id: string
    title: string
    state: string
    state_description: string
    date: string
}

export interface State {
    state: string
    state_description: string
}

let data: Data = {
    deposit: [
        {
            id: "93674123-1699-49c5-af91-ed31db19adc9",
            title: "Current Dataset with a very very very very very very very very very very long title",
            state: "DRAFT",
            state_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultricies arcu nec erat rhoncus, non interdum risus mattis. ",
            date: "2018-01-20T10:40:52Z",
        },
        {
            id: "1d946f5b-e53b-4f71-b1f3-7481475d07db",
            title: "Missing file",
            state: "REJECTED",
            state_description: "there are some files missing",
            date: "2018-01-12T10:40:52Z",
        },
        {
            id: "a145a1be-5463-4b10-a621-a9e511ff7f20",
            title: "First Dataset",
            state: "IN_PROGRESS",
            state_description: "",
            date: "2017-12-01T11:10:22Z",
        },
        {
            id: "5befec97-1e57-4210-b7b6-57a604aaef47",
            title: "Old Dataset",
            state: "ARCHIVED",
            state_description: "easy-dataset:id",
            date: "2017-08-09T10:10:22Z",
        },
    ],
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
    data = {...data, deposit: [...data.deposit, deposit]}
    return deposit
}

export const deleteDeposit: (id: string) => boolean = id => {
    const exists = data.deposit.find(deposit => deposit.id === id) !== undefined
    if (exists) {
        data = {...data, deposit: data.deposit.filter(deposit => deposit.id !== id) }
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
        const newDeposit = {...deposit, state: state.state, state_description: state.state_description }
        data = {...data, deposit: data.deposit.map(dep => dep === deposit ? newDeposit : dep)}
        return true
    }
    else return false
}
