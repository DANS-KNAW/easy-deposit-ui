export interface DropdownListState {
    fetchingList: boolean
    fetchedList: boolean
    fetchListError?: string
}

const emptyDropdownListState: DropdownListState = {
    fetchingList: false,
    fetchedList: false,
}

export interface DropdownListEntry {
    key: string
    value: string
    displayValue: string
}

export interface DropdownList {
    list: DropdownListEntry[]
    state: DropdownListState
}

const emptyDropdownList: DropdownList = {
    list: [],
    state: emptyDropdownListState,
}

export interface DropdownLists {
    audiences: DropdownList
    identifiers: DropdownList
    dates: DropdownList
    licenses: DropdownList
    dcmiTypes: DropdownList
    imtFormats: DropdownList
    spatialCoordinates: DropdownList
    // TODO add others
}

export const emptyDropdownLists: DropdownLists = {
    audiences: emptyDropdownList,
    identifiers: emptyDropdownList,
    dates: emptyDropdownList,
    licenses: emptyDropdownList,
    dcmiTypes: emptyDropdownList,
    imtFormats: emptyDropdownList,
    spatialCoordinates: emptyDropdownList,
}
