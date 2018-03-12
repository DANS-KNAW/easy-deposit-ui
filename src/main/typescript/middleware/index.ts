import { depositMiddleware } from "./depositMiddleware"
import { rejectedRequestMiddleware } from "./rejectedRequestMiddleware"

export default [
    ...depositMiddleware,
    ...rejectedRequestMiddleware,
]
