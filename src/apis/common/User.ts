import {Address} from "./Address";
import {FileUploaded} from "./FileUploaded";

export interface User {
    readonly username: string;
    readonly email: string;
    readonly id: string;
    readonly fullName: string;
    readonly avatar: FileUploaded;
    readonly address: Address;
    followedService: string[];
}