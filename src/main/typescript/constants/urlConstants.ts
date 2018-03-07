import { baseURL } from "../lib/config"

const createURL = (path: string) => `${baseURL}/${path}`

export const listDepositsURL = createURL("deposit")
export const deleteDepositURL = (id: string) => createURL(`deposit/${id}`)
