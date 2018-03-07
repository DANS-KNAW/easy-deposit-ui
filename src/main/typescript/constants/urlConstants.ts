import { baseURL } from "../lib/config"
import { DatasetId } from "../model/Deposits"

const createURL = (path: string) => `${baseURL}/${path}`

export const listDepositsURL = createURL("deposit")
export const deleteDepositURL = (id: DatasetId) => createURL(`deposit/${id}`)
