import { Middleware } from "redux"
import { createMiddleware } from "../lib/redux"
import { DepositFormConstants } from "../constants/depositFormConstants"
import { push } from "react-router-redux"
import { depositOverviewRoute } from "../constants/clientRoutes"

const submitReroute: Middleware = createMiddleware(({dispatch}, next, action) => {
    next(action)

    if (action.type === DepositFormConstants.SUBMIT_DEPOSIT_FULFILLED) {
        dispatch(push(depositOverviewRoute))
    }
})

export const depositFormMiddleware = [submitReroute]
