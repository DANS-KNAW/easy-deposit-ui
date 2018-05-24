import { Reducer } from "redux"
import { DropdownLists, emptyDropdownLists } from "../model/DropdownLists"
import { DropdownConstants } from "../constants/dropdownConstants"

export const dropdownReducer: Reducer<DropdownLists> = (state = emptyDropdownLists, action) => {
    switch (action.type) {
        case DropdownConstants.FETCH_AUDIENCE_DROPDOWN_PENDING: {
            return {
                ...state,
                audiences: {
                    ...state.audiences,
                    state: { ...state.audiences.state, fetchingList: true, fetchListError: undefined },
                },
            }
        }
        case DropdownConstants.FETCH_AUDIENCE_DROPDOWN_FULFILLED: {
            return {
                ...state,
                audiences: {
                    ...state.audiences,
                    state: { ...state.audiences.state, fetchingList: false, fetchedList: true },
                    list: action.payload,
                },
            }
        }
        case DropdownConstants.FETCH_AUDIENCE_DROPDOWN_FAILED: {
            return {
                ...state,
                audiences: {
                    ...state.audiences,
                    state: {
                        ...state.audiences.state,
                        fetchingList: false,
                        fetchedList: true,
                        fetchListError: action.payload,
                    },
                    list: [],
                },
            }
        }
        default:
            return state
    }
}
