import { AppState } from "../model/AppState"
import { getApiUrl } from "./configuration"
import { DepositId } from "../model/Deposits"

const createUrl: (path: string) => (state: AppState) => string = path => state => {
    const apiUrl = getApiUrl(state)

    return apiUrl.endsWith("/") ? `${apiUrl}${path}` : `${apiUrl}/${path}`
}

export const loginUrl = createUrl("auth/login")
export const logoutUrl = createUrl("auth/logout")

export const userUrl = createUrl("user")

export const listDepositUrl = createUrl("deposit")
export const deleteDepositUrl = (id: DepositId) => createUrl(`deposit/${id}`)

export const newDepositUrl = createUrl("deposit")

export const fetchMetadataUrl = (id: DepositId) => createUrl(`deposit/${id}/metadata`)
export const fetchDoiUrl = (id: DepositId) => createUrl(`deposit/${id}/doi`)
export const saveDraftUrl = (id: DepositId) => createUrl(`deposit/${id}/metadata`)
export const submitDepositUrl = (id: DepositId) => createUrl(`deposit/${id}/state`)

export const listFilesUrl = (id: DepositId) => createUrl(`deposit/${id}/file`)
