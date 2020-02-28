import { expect } from "chai"
import { describe, it } from "mocha"
import { AnyAction } from "redux"
import { DepositOverviewConstants } from "../../../main/typescript/constants/depositOverviewConstants"
import { DepositOverviewState, DepositStateLabel, empty } from "../../../main/typescript/model/Deposits"
import depositOverviewReducer from "../../../main/typescript/reducers/depositOverviewReducer"
import {
    askConfirmationToDeleteDeposit,
    cancelDeleteDeposit,
    cleanDeposits,
} from "../../../main/typescript/actions/depositOverviewActions"

describe("depositOverviewReducer", () => {

    describe("CLEAN_DEPOSITS", () => {
        it("should handle an CLEAN_DEPOSITS action", () => {
            const inputState: DepositOverviewState = empty
            const expectedOutputState: DepositOverviewState = empty
            const action: AnyAction = cleanDeposits()
            expect(depositOverviewReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("FETCH_DEPOSITS_PENDING", () => {
        it("should handle an FETCH_DEPOSITS_PENDING action", () => {
            const inputState: DepositOverviewState = empty
            const expectedOutputState: DepositOverviewState = {
                ...empty,
                loading: {
                    loading: true,
                    loaded: false,
                    loadingError: undefined,
                },
            }
            const action: AnyAction = {
                type: DepositOverviewConstants.FETCH_DEPOSITS_PENDING,
            }
            expect(depositOverviewReducer(inputState, action)).to.eql(expectedOutputState)
        })

        it("should remove an error", () => {
            const inputState = { ...empty, loading: { ...empty.loading, loadingError: "ERR!!!" } }
            const expectedOutputState: DepositOverviewState = {
                ...empty,
                loading: {
                    loading: true,
                    loaded: false,
                    loadingError: undefined,
                },
            }
            const action: AnyAction = {
                type: DepositOverviewConstants.FETCH_DEPOSITS_PENDING,
            }
            expect(depositOverviewReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("FETCH_DEPOSITS_REJECTED", () => {
        it("should handle an FETCH_DEPOSITS_REJECTED action", () => {
            const inputState: DepositOverviewState = empty
            const expectedOutputState: DepositOverviewState = {
                ...empty,
                loading: {
                    loading: false,
                    loaded: false,
                    loadingError: "ERR!!!",
                },
            }
            const action: AnyAction = {
                type: DepositOverviewConstants.FETCH_DEPOSITS_REJECTED,
                payload: "ERR!!!",
            }
            expect(depositOverviewReducer(inputState, action)).to.eql(expectedOutputState)
        })

        it("should overwrite an existing error", () => {
            const inputState = { ...empty, loading: { ...empty.loading, loadingError: "ERR!!!" } }
            const expectedOutputState: DepositOverviewState = {
                ...empty,
                loading: {
                    loading: false,
                    loaded: false,
                    loadingError: "ERR222!!!",
                },
            }
            const action: AnyAction = {
                type: DepositOverviewConstants.FETCH_DEPOSITS_REJECTED,
                payload: "ERR222!!!",
            }
            expect(depositOverviewReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("FETCH_DEPOSITS_SUCCESS", () => {
        it("should handle an FETCH_DEPOSITS_SUCCESS action", () => {
            const dt: Date = new Date()
            const inputState: DepositOverviewState = empty
            const expectedOutputState: DepositOverviewState = {
                ...empty,
                loading: {
                    loading: false,
                    loaded: true,
                    loadingError: undefined,
                },
                deposits: {
                    "my-deposit": {
                        title: "hello world",
                        state: DepositStateLabel.DRAFT,
                        stateDescription: "my description",
                        date: dt,
                    },
                },
            }
            const action: AnyAction = {
                type: DepositOverviewConstants.FETCH_DEPOSITS_SUCCESS,
                payload: {
                    "my-deposit": {
                        title: "hello world",
                        state: DepositStateLabel.DRAFT,
                        stateDescription: "my description",
                        date: dt,
                    },
                },
            }
            expect(depositOverviewReducer(inputState, action)).to.eql(expectedOutputState)
        })

        it("should remove an error", () => {
            const dt: Date = new Date()
            const inputState = { ...empty, loading: { ...empty.loading, loadingError: "ERR!!!" } }
            const expectedOutputState: DepositOverviewState = {
                ...empty,
                loading: {
                    loading: false,
                    loaded: true,
                    loadingError: undefined,
                },
                deposits: {
                    "my-deposit": {
                        title: "hello world",
                        state: DepositStateLabel.DRAFT,
                        stateDescription: "my description",
                        date: dt,
                    },
                },
            }
            const action: AnyAction = {
                type: DepositOverviewConstants.FETCH_DEPOSITS_SUCCESS,
                payload: {
                    "my-deposit": {
                        title: "hello world",
                        state: DepositStateLabel.DRAFT,
                        stateDescription: "my description",
                        date: dt,
                    },
                },
            }
            expect(depositOverviewReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("DELETE_DEPOSIT_PENDING", () => {
        it("should handle an DELETE_DEPOSIT_PENDING action", () => {
            const inputState: DepositOverviewState = {
                ...empty,
                deleting: {
                    "my-deposit-id": {
                        deleting: false,
                        deleteError: undefined,
                    },
                    "another-deposit-id": {
                        deleting: false,
                        deleteError: undefined,
                    },
                },
            }
            const expectedOutputState: DepositOverviewState = {
                ...empty,
                deleting: {
                    "my-deposit-id": {
                        deleting: true,
                        deleteError: undefined,
                    },
                    "another-deposit-id": {
                        deleting: false,
                        deleteError: undefined,
                    },
                },
            }
            const action: AnyAction = {
                type: DepositOverviewConstants.DELETE_DEPOSIT_PENDING,
                meta: {
                    depositId: "my-deposit-id",
                },
            }
            expect(depositOverviewReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("DELETE_DEPOSIT_REJECTED", () => {
        it("should handle an DELETE_DEPOSIT_REJECTED action", () => {
            const inputState: DepositOverviewState = {
                ...empty,
                deleting: {
                    "my-deposit-id": {
                        deleting: true,
                        deleteError: undefined,
                    },
                    "another-deposit-id": {
                        deleting: false,
                        deleteError: undefined,
                    },
                },
            }
            const expectedOutputState: DepositOverviewState = {
                ...empty,
                deleting: {
                    "my-deposit-id": {
                        deleting: false,
                        deleteError: "ERR!!!",
                    },
                    "another-deposit-id": {
                        deleting: false,
                        deleteError: undefined,
                    },
                },
            }
            const action: AnyAction = {
                type: DepositOverviewConstants.DELETE_DEPOSIT_REJECTED,
                payload: "ERR!!!",
                meta: {
                    depositId: "my-deposit-id",
                },
            }
            expect(depositOverviewReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("DELETE_DEPOSIT_FULFILLED", () => {
        it("should handle an DELETE_DEPOSIT_FULFILLED action", () => {
            const dt = new Date()
            const inputState: DepositOverviewState = {
                ...empty,
                deposits: {
                    "my-deposit-id": {
                        title: "hello world",
                        state: DepositStateLabel.DRAFT,
                        stateDescription: "foobar",
                        date: dt,
                    },
                    "another-deposit-id": {
                        title: "goodbye world",
                        state: DepositStateLabel.IN_PROGRESS,
                        stateDescription: "kkk",
                        date: dt,
                    },
                },
                deleting: {
                    "my-deposit-id": {
                        deleting: false,
                        deleteError: undefined,
                    },
                    "another-deposit-id": {
                        deleting: false,
                        deleteError: undefined,
                    },
                },
            }
            const expectedOutputState: DepositOverviewState = {
                ...empty,
                deposits: {
                    "another-deposit-id": {
                        title: "goodbye world",
                        state: DepositStateLabel.IN_PROGRESS,
                        stateDescription: "kkk",
                        date: dt,
                    },
                },
                deleting: {
                    "another-deposit-id": {
                        deleting: false,
                        deleteError: undefined,
                    },
                },
            }
            const action: AnyAction = {
                type: DepositOverviewConstants.DELETE_DEPOSIT_FULFILLED,
                meta: {
                    depositId: "my-deposit-id",
                },
            }
            expect(depositOverviewReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("DELETE_DEPOSIT_CONFIRMATION", () => {
        it("should handle an DELETE_DEPOSIT_CONFIRMATION action", () => {
            const inputState: DepositOverviewState = {
                ...empty,
                deleting: {
                    "my-deposit-id": {
                        deleting: false,
                        deleteError: undefined,
                    },
                    "another-deposit-id": {
                        deleting: false,
                        deleteError: undefined,
                    },
                },
            }
            const expectedOutputState: DepositOverviewState = {
                ...empty,
                deleting: {
                    "my-deposit-id": {
                        deleting: true,
                        deleteError: undefined,
                    },
                    "another-deposit-id": {
                        deleting: false,
                        deleteError: undefined,
                    },
                },
            }
            const action: AnyAction = askConfirmationToDeleteDeposit("my-deposit-id")
            expect(depositOverviewReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("DELETE_DEPOSIT_CANCELLED", () => {
        it("should handle an DELETE_DEPOSIT_CANCELLED action", () => {
            const inputState: DepositOverviewState = {
                ...empty,
                deleting: {
                    "my-deposit-id": {
                        deleting: true,
                        deleteError: undefined,
                    },
                    "another-deposit-id": {
                        deleting: false,
                        deleteError: undefined,
                    },
                },
            }
            const expectedOutputState: DepositOverviewState = {
                ...empty,
                deleting: {
                    "another-deposit-id": {
                        deleting: false,
                        deleteError: undefined,
                    },
                },
            }
            const action: AnyAction = cancelDeleteDeposit("my-deposit-id")
            expect(depositOverviewReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("CREATE_NEW_DEPOSIT_PENDING", () => {
        it("should handle an CREATE_NEW_DEPOSIT_PENDING action", () => {
            const inputState: DepositOverviewState = empty
            const expectedOutputState: DepositOverviewState = {
                ...empty,
                creatingNew: {
                    creating: true,
                    createError: undefined,
                },
            }
            const action: AnyAction = {
                type: DepositOverviewConstants.CREATE_NEW_DEPOSIT_PENDING,
            }
            expect(depositOverviewReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("CREATE_NEW_DEPOSIT_SUCCESS", () => {
        it("should handle an CREATE_NEW_DEPOSIT_SUCCESS action", () => {
            const inputState: DepositOverviewState = {
                ...empty,
                creatingNew: {
                    creating: true,
                    createError: undefined,
                },
            }
            const expectedOutputState: DepositOverviewState = {
                ...empty,
                creatingNew: {
                    creating: false,
                    createError: undefined,
                },
            }
            const action: AnyAction = {
                type: DepositOverviewConstants.CREATE_NEW_DEPOSIT_SUCCESS,
            }
            expect(depositOverviewReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("CREATE_NEW_DEPOSIT_REJECTED", () => {
        it("should handle an CREATE_NEW_DEPOSIT_REJECTED action", () => {
            const inputState: DepositOverviewState = {
                ...empty,
                creatingNew: {
                    creating: true,
                    createError: undefined,
                },
            }
            const expectedOutputState: DepositOverviewState = {
                ...empty,
                creatingNew: {
                    creating: false,
                    createError: "ERR!!!",
                },
            }
            const action: AnyAction = {
                type: DepositOverviewConstants.CREATE_NEW_DEPOSIT_REJECTED,
                payload: "ERR!!!",
            }
            expect(depositOverviewReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })
})
