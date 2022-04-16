import {Address} from "./Address";
import {FileUploaded} from "./FileUploaded";

export interface User {
    readonly username: string;
    readonly email: string;
    readonly _id: string;
    readonly fullName: string;
    readonly avatar: FileUploaded;
    readonly birthday: string;
    readonly phone: string;
    readonly address: Address;
}