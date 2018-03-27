export interface User {
    username: string
    firstName: string
    prefix: string
    lastName: string
    groups: string[]
}

export const User001: User = {
    username: "user001",
    firstName: "First",
    prefix: "van",
    lastName: "Namen",
    groups: [ "group001", "group002"]
}