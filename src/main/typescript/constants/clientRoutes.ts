import { DepositId } from "../model/Deposits"

export const homeRoute = "/"
export const registerRoute = "/register" // this route doesn't exist, but to be complete, I add it here as well
export const loginRoute = "/login"
export const depositFormRoute = (id: DepositId) => `/deposit-form/${id}`
export const depositOverviewRoute = "/deposit-overview"
