import { DepositId } from "../model/Deposits"
import { push, RouterAction } from "react-router-redux"
import { depositFormRoute } from "../constants/clientRoutes"

export const enterDeposit: (depositId: DepositId) => RouterAction = depositId => {
    return push(depositFormRoute(depositId))
}
