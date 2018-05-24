import * as React from "react"
import { SFC } from "react"
import { DropdownListState } from "../../model/DropdownLists"

interface LoadDropdownDataProperties {
    state: DropdownListState
}

const LoadDropdownData: SFC<LoadDropdownDataProperties> = ({ children, state: { fetchingList, fetchedList, fetchListError } }) => (
    <>
        {fetchingList && <p>fetching data for dropdown list...</p>}
        {fetchListError && <p>failed to fetch data for dropdown list</p>}
        {fetchedList && children}
    </>
)

export default LoadDropdownData
