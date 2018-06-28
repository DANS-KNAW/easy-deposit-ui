import { UserDetails } from "../../model/UserDetails"

export const userConverter: (input: any) => UserDetails = input => {
    return {
        username: input.username,
        firstName: input.firstName,
        prefix: input.prefix,
        lastName: input.lastName,
        groups: input.groups,
        displayName: `${input.firstName} ${input.prefix ? input.prefix+" " : ""}${input.lastName}`,
    }
}
