import { expect } from "chai"
import { describe, it } from "mocha"
import { UserDetails } from "../../../../main/typescript/model/UserDetails"
import { userConverter } from "../../../../main/typescript/lib/user/user"

describe("user", () => {

    describe("userConverter", () => {

        it("should convert a full input to a UserDetails object", () => {
            const input = {
                username: "user001",
                firstName: "First",
                prefix: "the",
                lastName: "Name",
                groups: [ "group001", "group002"]
            }
            const expected: UserDetails = {
                username: "user001",
                firstName: "First",
                prefix: "the",
                lastName: "Name",
                groups: [ "group001", "group002" ],
                displayName: "First the Name",
            }

            expect(userConverter(input)).to.eql(expected)
        })

        it("should provide defaults for undefined fields", () => {
            const input = {
                username: undefined,
                firstName: undefined,
                prefix: undefined,
                lastName: undefined,
                groups: undefined
            }
            const expected: UserDetails = {
                username: "",
                firstName: "",
                prefix: "",
                lastName: "",
                groups: [],
                displayName: "",
            }

            expect(userConverter(input)).to.eql(expected)
        })

        it("should format the displayName properly when firstName is not given", () => {
            const input = {
                username: "user001",
                firstName: "",
                prefix: "the",
                lastName: "Name",
                groups: [ "group001", "group002"]
            }
            const expected: UserDetails = {
                username: "user001",
                firstName: "",
                prefix: "the",
                lastName: "Name",
                groups: [ "group001", "group002" ],
                displayName: "the Name",
            }

            expect(userConverter(input)).to.eql(expected)
        })

        it("should format the displayName properly when prefix is not given", () => {
            const input = {
                username: "user001",
                firstName: "First",
                prefix: undefined,
                lastName: "Name",
                groups: [ "group001", "group002"]
            }
            const expected: UserDetails = {
                username: "user001",
                firstName: "First",
                prefix: "",
                lastName: "Name",
                groups: [ "group001", "group002" ],
                displayName: "First Name",
            }

            expect(userConverter(input)).to.eql(expected)
        })

        it("should format the displayName properly when lastName is not given", () => {
            const input = {
                username: "user001",
                firstName: "First",
                prefix: "the",
                lastName: undefined,
                groups: [ "group001", "group002"]
            }
            const expected: UserDetails = {
                username: "user001",
                firstName: "First",
                prefix: "the",
                lastName: "",
                groups: [ "group001", "group002" ],
                displayName: "First the ",
            }

            expect(userConverter(input)).to.eql(expected)
        })
    })
})
