import { Reducer } from "redux"
import {
    DropdownList,
    DropdownListEntry,
    DropdownLists,
    DropdownListState,
    emptyDropdownLists,
} from "../model/DropdownLists"
import { DropdownConstants } from "../constants/dropdownConstants"
import { Lens } from "monocle-ts"

const stateLens = Lens.fromProp<DropdownList, "state">("state")

type PendingParams = [boolean, string | undefined]
type FulfilledParams = [boolean, boolean, DropdownListEntry[]]
type FailedParams = [boolean, boolean, string | undefined, DropdownListEntry[]]

const pendingStateLens = new Lens<DropdownListState, PendingParams>(
    s => [s.fetchingList, s.fetchListError],
    a => s => ({ ...s, fetchingList: a[0], fetchListError: a[1] }),
)
const fulfilledStateLens = new Lens<DropdownListState, [boolean, boolean]>(
    s => [s.fetchingList, s.fetchedList],
    a => s => ({ ...s, fetchingList: a[0], fetchedList: a[1] }),
)
const failedStateLens = new Lens<DropdownListState, [boolean, boolean, string | undefined]>(
    s => [s.fetchingList, s.fetchedList, s.fetchListError],
    a => s => ({ ...s, fetchingList: a[0], fetchedList: a[1], fetchListError: a[2] }),
)

const pendingLens = stateLens.compose(pendingStateLens)
const fulfilledLens = new Lens<DropdownList, FulfilledParams>(
    s => {
        const [fetching, fetched] = fulfilledStateLens.get(s.state)

        return [fetching, fetched, s.list]
    },
    a => s => ({ ...s, state: fulfilledStateLens.set([a[0], a[1]])(s.state), list: a[2] }),
)
const failedLens = new Lens<DropdownList, FailedParams>(
    s => {
        const [fetching, fetched, error] = failedStateLens.get(s.state)

        return [fetching, fetched, error, s.list]
    },
    a => s => ({ ...s, state: failedStateLens.set([a[0], a[1], a[2]])(s.state), list: a[3] }),
)

type PendingLens = Lens<DropdownLists, PendingParams>
type FulfilledLens = Lens<DropdownLists, FulfilledParams>
type FailedLens = Lens<DropdownLists, FailedParams>

function createLenses(lens: Lens<DropdownLists, DropdownLists[keyof DropdownLists]>): [PendingLens, FulfilledLens, FailedLens] {
    const pending = lens.compose(pendingLens)
    const fulfilled = lens.compose(fulfilledLens)
    const failed = lens.compose(failedLens)

    return [pending, fulfilled, failed]
}

function handlePending(lens: PendingLens, state: DropdownLists): DropdownLists {
    return lens.set([true, undefined])(state)
}

function handleFulfilled(lens: FulfilledLens, list: DropdownListEntry[], state: DropdownLists): DropdownLists {
    return lens.set([false, true, list])(state)
}

function handleFailed(lens: Lens<DropdownLists, [boolean, boolean, string | undefined, DropdownListEntry[]]>, errorMessage: string, state: DropdownLists): DropdownLists {
    return lens.set([false, true, errorMessage, []])(state)
}

const audiencesLens = Lens.fromProp<DropdownLists, "audiences">("audiences")
const [audiencePendingLens, audienceFulfilledLens, audienceFailedLens] = createLenses(audiencesLens)

export const dropdownReducer: Reducer<DropdownLists> = (state = emptyDropdownLists, action) => {
    switch (action.type) {
        case DropdownConstants.FETCH_AUDIENCE_DROPDOWN_PENDING:
            return handlePending(audiencePendingLens, state)
        case DropdownConstants.FETCH_AUDIENCE_DROPDOWN_FULFILLED:
            return handleFulfilled(audienceFulfilledLens, action.payload, state)
        case DropdownConstants.FETCH_AUDIENCE_DROPDOWN_FAILED:
            return handleFailed(audienceFailedLens, action.payload, state)
        default:
            return state
    }
}
