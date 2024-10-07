export type SignUpType = {
    name: string,
    email: string,
    password: string
}

export type EditProfileType = {
    _id: string,
    name: string,
    email: string,
    password: string
}

export type LogInType = {
    email: string,
    password: string
}

export type UserType = {
    _id: string,
    name: string,
    email: string,
}