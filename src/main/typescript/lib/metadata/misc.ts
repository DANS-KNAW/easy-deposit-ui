import { isEmpty, pickBy } from "lodash"

export function clean<T>(obj: T): Partial<T> {
    return pickBy(obj, v => {
        if (Array.isArray(v))
            return !isEmpty(v)
        else if (typeof v === "object")
            return Object.keys(v).length !== 0
        return !!v && v !== ""
    })
}

export function nonEmptyObject<T>(obj: T): boolean {
    return obj && !isEmpty(obj)
}
