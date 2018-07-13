import { Middleware } from "redux"

const triggerPostfix = "_FULFILLED"
const triggerPostfixLength = triggerPostfix.length
const successPostfix = "_SUCCESS"
const failedPostfix = "_FAILED"

const fetchConvertMiddleware: Middleware = ({ dispatch, getState }) => next => action => {
    next(action)

    if (action.type.endsWith(triggerPostfix) &&
        action.meta &&
        action.meta.transform &&
        typeof action.meta.transform === "function") {

        const actionType = action.type.slice(0, action.type.length - triggerPostfixLength)
        try {
            const newPayload = action.meta.transform(action.payload, getState)
            dispatch({
                ...action,
                type: actionType + successPostfix,
                payload: newPayload,
            })
        }
        catch (errorMessage) {
            // TODO remove this log once everything is fully implemented.
            console.log(action.payload)

            dispatch({
                type: actionType + failedPostfix,
                payload: errorMessage,
            })
        }
    }
}

export default [
    fetchConvertMiddleware,
]
