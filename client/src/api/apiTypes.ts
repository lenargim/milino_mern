type UserDataType = {
    name: string,
    email: string,
    phone: string,
}

export interface SignUpType extends UserDataType {
    password: string
}

export interface UserType extends UserDataType {
    _id: string,
}

export interface UserTypeResponse extends UserType {
    token: string
}

export interface EditProfileType extends UserDataType {
    _id: string,
    password: string
}

export type LogInType = {
    email: string,
    password: string
}