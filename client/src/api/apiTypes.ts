import {SortAdminUsers} from "../Components/Profile/ProfileAdmin";
import {OrderAPIType} from "./apiFunctions";

export type UserDataType = {
    name: string,
    company: string,
    email: string,
    phone: string,
}

export interface SignUpType extends UserDataType {
    password: string
}

export interface SignUpFrontType extends SignUpType {
    compare: string
}

export interface UserType extends UserDataType {
    _id: string,
    is_active: boolean,
    is_super_user: boolean,
    is_active_in_constructor: boolean
}

export interface UserTypeResponse extends UserType {
    token: string
}

export interface UserTypeCheckout {
    name: string,
    company: string,
    email: string,
    phone: string,
    project: string,
    delivery: string
}

export interface EditProfileType {
    _id: string,
    name: string,
    company: string,
    phone: string,
    password: string,
    compare: string,
}

export type LogInType = {
    email: string,
    password: string
}

export type OrderTypeApi = {
    user: string,
    room_id: string,
    room_name: string,
    order: OrderAPIType[],
    total: number,
    createdAt: Date
}

export type AdminUsersRes = {
    users: AdminUsersType[],
    hasNextPage: boolean,
    sort: SortAdminUsers,
    page: number
}

export type AdminUsersType = {
    _id: string,
    createdAt: Date,
    company: string,
    email: string,
    name: string,
    is_active: boolean,
    is_active_in_constructor: boolean
}