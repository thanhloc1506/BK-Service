import {RolesType} from "./Role";

export interface User {
    readonly username: string;
    readonly email: string;
    readonly id: string;
    readonly fullName: string;
    readonly role: RolesType;
    readonly avatar: string;
    readonly birthday: string;
    readonly phone: string;
    readonly address: string[];
}