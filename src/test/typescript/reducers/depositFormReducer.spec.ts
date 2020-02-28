/*
 * Copyright (C) 2018 DANS - Data Archiving and Networked Services (info@dans.knaw.nl)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { expect } from "chai"
import { describe, it } from "mocha"
import { DepositFormState, empty } from "../../../main/typescript/model/DepositForm"
import { AnyAction } from "redux"
import { DepositFormConstants } from "../../../main/typescript/constants/depositFormConstants"
import { depositFormReducer } from "../../../main/typescript/reducers/depositFormReducer"
import { DepositStateLabel } from "../../../main/typescript/model/Deposits"
import { depositStateNotFound, unregisterForm } from "../../../main/typescript/actions/depositFormActions"

describe("depositFormReducer", () => {

    describe("UNREGISTER_FORM", () => {
        it("should handle an UNREGISTER_FORM action", () => {
            const inputState: DepositFormState = empty
            const expectedOutputState: DepositFormState = empty
            const action: AnyAction = unregisterForm()
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("FETCH_STATE_PENDING", () => {
        it("should handle a FETCH_STATE_PENDING action", () => {
            const inputState: DepositFormState = empty
            const expectedOutputState: DepositFormState = {
                ...empty,
                fetchDepositState: {
                    fetching: true,
                    fetched: false,
                    fetchError: undefined,
                    stateNotFound: false,
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.FETCH_STATE_PENDING,
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })

        it("should remove an error", () => {
            const inputState: DepositFormState = {
                ...empty,
                fetchDepositState: {
                    ...empty.fetchDepositState,
                    fetchError: "ERR!!!",
                },
            }
            const expectedOutputState: DepositFormState = {
                ...empty,
                fetchDepositState: {
                    fetching: true,
                    fetched: false,
                    fetchError: undefined,
                    stateNotFound: false,
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.FETCH_STATE_PENDING,
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("FETCH_STATE_REJECTED", () => {
        it("should handle a FETCH_STATE_REJECTED action", () => {
            const inputState: DepositFormState = empty
            const expectedOutputState: DepositFormState = {
                ...empty,
                fetchDepositState: {
                    fetching: false,
                    fetched: false,
                    fetchError: "ERR",
                    stateNotFound: false,
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.FETCH_STATE_REJECTED,
                payload: "ERR",
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })

        it("should overwrite an existing error", () => {
            const inputState: DepositFormState = {
                ...empty,
                fetchDepositState: {
                    ...empty.fetchDepositState,
                    fetchError: "ERR!!!",
                },
            }
            const expectedOutputState: DepositFormState = {
                ...empty,
                fetchDepositState: {
                    fetching: false,
                    fetched: false,
                    fetchError: "ERR222!!!",
                    stateNotFound: false,
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.FETCH_STATE_REJECTED,
                payload: "ERR222!!!",
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("FETCH_STATE_SUCCESS", () => {
        it("should handle a FETCH_STATE_SUCCESS action", () => {
            const inputState: DepositFormState = empty
            const expectedOutputState: DepositFormState = {
                ...empty,
                initialState: {
                    metadata: {},
                    depositState: {
                        label: DepositStateLabel.DRAFT,
                        description: "this is a draft",
                    },
                },
                fetchDepositState: {
                    fetching: false,
                    fetched: true,
                    fetchError: undefined,
                    stateNotFound: false,
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.FETCH_STATE_SUCCESS,
                payload: {
                    label: DepositStateLabel.DRAFT,
                    description: "this is a draft",
                },
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })

        it("should remove an error", () => {
            const inputState: DepositFormState = {
                ...empty,
                fetchDepositState: {
                    ...empty.fetchDepositState,
                    fetchError: "ERR!!!",
                },
            }
            const expectedOutputState: DepositFormState = {
                ...empty,
                initialState: {
                    metadata: {},
                    depositState: {
                        label: DepositStateLabel.DRAFT,
                        description: "this is a draft",
                    },
                },
                fetchDepositState: {
                    fetching: false,
                    fetched: true,
                    fetchError: undefined,
                    stateNotFound: false,
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.FETCH_STATE_SUCCESS,
                payload: {
                    label: DepositStateLabel.DRAFT,
                    description: "this is a draft",
                },
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("FETCH_STATE_NOT_FOUND", () => {
        it("should handle a FETCH_STATE_NOT_FOUND action", () => {
            const inputState: DepositFormState = empty
            const expectedOutputState: DepositFormState = {
                ...empty,
                fetchDepositState: {
                    fetching: false,
                    fetched: false,
                    fetchError: undefined,
                    stateNotFound: true,
                },
            }
            const action: AnyAction = depositStateNotFound()
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })

        it("should not overwrite an existing error", () => {
            const inputState: DepositFormState = {
                ...empty,
                fetchDepositState: {
                    ...empty.fetchDepositState,
                    fetchError: "ERR!!!",
                },
            }
            const expectedOutputState: DepositFormState = {
                ...empty,
                fetchDepositState: {
                    fetching: false,
                    fetched: false,
                    fetchError: "ERR!!!",
                    stateNotFound: true,
                },
            }
            const action: AnyAction = depositStateNotFound()
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("FETCH_METADATA_PENDING", () => {
        it("should handle a FETCH_METADATA_PENDING action", () => {
            const inputState: DepositFormState = empty
            const expectedOutputState: DepositFormState = {
                ...empty,
                fetchMetadata: {
                    fetching: true,
                    fetched: false,
                    fetchError: undefined,
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.FETCH_METADATA_PENDING,
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })

        it("should remove an error", () => {
            const inputState: DepositFormState = {
                ...empty,
                fetchMetadata: {
                    ...empty.fetchMetadata,
                    fetchError: "ERR!!!",
                },
            }
            const expectedOutputState: DepositFormState = {
                ...empty,
                fetchMetadata: {
                    fetching: true,
                    fetched: false,
                    fetchError: undefined,
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.FETCH_METADATA_PENDING,
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("FETCH_METADATA_REJECTED", () => {
        it("should handle a FETCH_METADATA_REJECTED action", () => {
            const inputState: DepositFormState = empty
            const expectedOutputState: DepositFormState = {
                ...empty,
                fetchMetadata: {
                    fetching: false,
                    fetched: false,
                    fetchError: "ERR!!!",
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.FETCH_METADATA_REJECTED,
                payload: "ERR!!!",
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })

        it("should overwrite an existing error", () => {
            const inputState: DepositFormState = {
                ...empty,
                fetchMetadata: {
                    ...empty.fetchMetadata,
                    fetchError: "ERR!!!",
                },
            }
            const expectedOutputState: DepositFormState = {
                ...empty,
                fetchMetadata: {
                    fetching: false,
                    fetched: false,
                    fetchError: "ERR222!!!",
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.FETCH_METADATA_REJECTED,
                payload: "ERR222!!!",
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("FETCH_METADATA_SUCCESS", () => {
        it("should handle a FETCH_METADATA_SUCCESS action", () => {
            const inputState: DepositFormState = empty
            const expectedOutputState: DepositFormState = {
                ...empty,
                initialState: {
                    metadata: { titles: ["my metadata"] },
                    depositState: undefined,
                },
                fetchMetadata: {
                    fetching: false,
                    fetched: true,
                    fetchError: undefined,
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.FETCH_METADATA_SUCCESS,
                payload: { titles: ["my metadata"] },
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })

        it("should remove an error", () => {
            const inputState: DepositFormState = {
                ...empty,
                fetchMetadata: {
                    ...empty.fetchMetadata,
                    fetchError: "ERR!!!",
                },
            }
            const expectedOutputState: DepositFormState = {
                ...empty,
                initialState: {
                    metadata: { titles: ["my metadata"] },
                    depositState: undefined,
                },
                fetchMetadata: {
                    fetching: false,
                    fetched: true,
                    fetchError: undefined,
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.FETCH_METADATA_SUCCESS,
                payload: { titles: ["my metadata"] },
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("FETCH_DOI_PENDING", () => {
        it("should handle a FETCH_DOI_PENDING action", () => {
            const inputState: DepositFormState = empty
            const expectedOutputState: DepositFormState = {
                ...empty,
                fetchDoi: {
                    fetching: true,
                    fetched: false,
                    fetchError: undefined,
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.FETCH_DOI_PENDING,
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })

        it("should remove an error", () => {
            const inputState: DepositFormState = {
                ...empty,
                fetchDoi: {
                    ...empty.fetchDoi,
                    fetchError: "ERR!!!",
                },
            }
            const expectedOutputState: DepositFormState = {
                ...empty,
                fetchDoi: {
                    fetching: true,
                    fetched: false,
                    fetchError: undefined,
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.FETCH_DOI_PENDING,
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("FETCH_DOI_SUCCESS", () => {
        it("should handle a FETCH_DOI_SUCCESS action", () => {
            const inputState: DepositFormState = empty
            const expectedOutputState: DepositFormState = {
                ...empty,
                fetchDoi: {
                    fetching: false,
                    fetched: true,
                    fetchError: undefined,
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.FETCH_DOI_SUCCESS,
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })

        it("should remove an error", () => {
            const inputState: DepositFormState = {
                ...empty,
                fetchDoi: {
                    ...empty.fetchDoi,
                    fetchError: "ERR!!!",
                },
            }
            const expectedOutputState: DepositFormState = {
                ...empty,
                fetchDoi: {
                    fetching: false,
                    fetched: true,
                    fetchError: undefined,
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.FETCH_DOI_SUCCESS,
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("FETCH_DOI_REJECTED", () => {
        it("should handle a FETCH_DOI_REJECTED action", () => {
            const inputState: DepositFormState = empty
            const expectedOutputState: DepositFormState = {
                ...empty,
                fetchDoi: {
                    fetching: false,
                    fetched: false,
                    fetchError: "ERR",
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.FETCH_DOI_REJECTED,
                payload: "ERR",
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })

        it("should overwrite an existing error", () => {
            const inputState: DepositFormState = {
                ...empty,
                fetchDoi: {
                    ...empty.fetchDoi,
                    fetchError: "ERR!!!",
                },
            }
            const expectedOutputState: DepositFormState = {
                ...empty,
                fetchDoi: {
                    fetching: false,
                    fetched: false,
                    fetchError: "ERR222!!!",
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.FETCH_DOI_REJECTED,
                payload: "ERR222!!!",
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("SAVE_DRAFT_PENDING", () => {
        it("should handle a SAVE_DRAFT_PENDING action", () => {
            const inputState: DepositFormState = {
                ...empty,
                submit: {
                    ...empty.submit,
                    submitError: "ERR!!!"
                }
            }
            const expectedOutputState: DepositFormState = {
                ...empty,
                saveDraft: {
                    saving: true,
                    saved: false,
                    saveError: undefined,
                },
                submit: {
                    submitting: false,
                    submitted: false,
                    submitError: undefined,
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.SAVE_DRAFT_PENDING,
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })

        it("should remove an error", () => {
            const inputState: DepositFormState = {
                ...empty,
                saveDraft: {
                    ...empty.saveDraft,
                    saveError: "ERR!!!",
                },
                submit: {
                    ...empty.submit,
                    submitError: "ERR!!!",
                },
            }
            const expectedOutputState: DepositFormState = {
                ...empty,
                saveDraft: {
                    saving: true,
                    saved: false,
                    saveError: undefined,
                },
                submit: {
                    submitting: false,
                    submitted: false,
                    submitError: undefined,
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.SAVE_DRAFT_PENDING,
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("SAVE_DRAFT_FULFILLED", () => {
        it("should handle a SAVE_DRAFT_FULFILLED action", () => {
            const inputState: DepositFormState = empty
            const expectedOutputState: DepositFormState = {
                ...empty,
                saveDraft: {
                    saving: false,
                    saved: true,
                    saveError: undefined,
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.SAVE_DRAFT_FULFILLED,
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })

        it("should remove an error", () => {
            const inputState: DepositFormState = {
                ...empty,
                saveDraft: {
                    ...empty.saveDraft,
                    saveError: "ERR!!!",
                },
            }
            const expectedOutputState: DepositFormState = {
                ...empty,
                saveDraft: {
                    saving: false,
                    saved: true,
                    saveError: undefined,
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.SAVE_DRAFT_FULFILLED,
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("SAVE_DRAFT_REJECTED", () => {
        it("should handle a SAVE_DRAFT_REJECTED action", () => {
            const inputState: DepositFormState = empty
            const expectedOutputState: DepositFormState = {
                ...empty,
                saveDraft: {
                    saving: false,
                    saved: false,
                    saveError: "ERR!!!",
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.SAVE_DRAFT_REJECTED,
                payload: "ERR!!!",
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })

        it("should remove an error", () => {
            const inputState: DepositFormState = {
                ...empty,
                saveDraft: {
                    ...empty.saveDraft,
                    saveError: "ERR!!!",
                },
            }
            const expectedOutputState: DepositFormState = {
                ...empty,
                saveDraft: {
                    saving: false,
                    saved: false,
                    saveError: "ERR222!!!",
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.SAVE_DRAFT_REJECTED,
                payload: "ERR222!!!",
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("SAVE_DRAFT_RESET", () => {
        it("should handle a SAVE_DRAFT_RESET action", () => {
            const inputState: DepositFormState = {
                ...empty,
                saveDraft: {
                    ...empty.saveDraft,
                    saved: true,
                }
            }
            const expectedOutputState: DepositFormState = {
                ...empty,
                saveDraft: {
                    saving: false,
                    saved: false,
                    saveError: undefined,
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.SAVE_DRAFT_RESET,
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })

        it("should not remove an existing error", () => {
            const inputState: DepositFormState = {
                ...empty,
                saveDraft: {
                    ...empty.saveDraft,
                    saved: true,
                    saveError: "ERR!!!",
                },
            }
            const expectedOutputState: DepositFormState = {
                ...empty,
                saveDraft: {
                    saving: false,
                    saved: false,
                    saveError: "ERR!!!",
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.SAVE_DRAFT_RESET,
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("SUBMIT_DEPOSIT_PENDING", () => {
        it("should handle a SUBMIT_DEPOSIT_PENDING action", () => {
            const inputState: DepositFormState = {
                ...empty,
                saveDraft: {
                    ...empty.saveDraft,
                    saveError: "ERR!"
                }
            }
            const expectedOutputState: DepositFormState = {
                ...empty,
                saveDraft: {
                    saving: false,
                    saved: false,
                    saveError: undefined,
                },
                submit: {
                    submitting: true,
                    submitted: false,
                    submitError: undefined,
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.SUBMIT_DEPOSIT_PENDING,
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })

        it("should remove an error", () => {
            const inputState: DepositFormState = {
                ...empty,
                saveDraft: {
                    ...empty.saveDraft,
                    saveError: "ERR!!!",
                },
                submit: {
                    ...empty.submit,
                    submitError: "ERR!!!",
                },
            }
            const expectedOutputState: DepositFormState = {
                ...empty,
                saveDraft: {
                    saving: false,
                    saved: false,
                    saveError: undefined,
                },
                submit: {
                    submitting: true,
                    submitted: false,
                    submitError: undefined,
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.SUBMIT_DEPOSIT_PENDING,
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("SUBMIT_DEPOSIT_FULFILLED", () => {
        it("should handle a SUBMIT_DEPOSIT_FULFILLED action", () => {
            const inputState: DepositFormState = empty
            const expectedOutputState: DepositFormState = {
                ...empty,
                submit: {
                    submitting: false,
                    submitted: true,
                    submitError: undefined,
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.SUBMIT_DEPOSIT_FULFILLED,
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })

        it("should remove an error", () => {
            const inputState: DepositFormState = {
                ...empty,
                submit: {
                    ...empty.submit,
                    submitError: "ERR!!!",
                },
            }
            const expectedOutputState: DepositFormState = {
                ...empty,
                submit: {
                    submitting: false,
                    submitted: true,
                    submitError: undefined,
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.SUBMIT_DEPOSIT_FULFILLED,
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })

    describe("SUBMIT_DEPOSIT_REJECTED", () => {
        it("should handle a SUBMIT_DEPOSIT_REJECTED action", () => {
            const inputState: DepositFormState = empty
            const expectedOutputState: DepositFormState = {
                ...empty,
                submit: {
                    submitting: false,
                    submitted: false,
                    submitError: "ERR!!!",
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.SUBMIT_DEPOSIT_REJECTED,
                payload: "ERR!!!",
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })

        it("should remove an error", () => {
            const inputState: DepositFormState = {
                ...empty,
                submit: {
                    ...empty.submit,
                    submitError: "ERR!!!",
                },
            }
            const expectedOutputState: DepositFormState = {
                ...empty,
                submit: {
                    submitting: false,
                    submitted: false,
                    submitError: "ERR222!!!",
                },
            }
            const action: AnyAction = {
                type: DepositFormConstants.SUBMIT_DEPOSIT_REJECTED,
                payload: "ERR222!!!",
            }
            expect(depositFormReducer(inputState, action)).to.eql(expectedOutputState)
        })
    })
})
