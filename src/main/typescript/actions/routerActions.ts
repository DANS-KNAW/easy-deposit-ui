import { DepositId } from "../model/Deposits"
import { push, RouterAction } from "react-router-redux"
import { depositFormRoute } from "../constants/clientRoutes"

export const enterDeposit: (editable: Boolean, depositId: DepositId) => RouterAction | null = (editable, depositId) => {
    return editable ? push(depositFormRoute(depositId)) : null
}
