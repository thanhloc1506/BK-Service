import { RolesType } from "./Role";
import { Address } from "./Address";
import {FileUploaded} from "./FileUploaded";

export interface User {
  readonly username: string;
  readonly email: string;
  readonly id: string;
  readonly fullName: string;
  readonly role: RolesType;
  readonly avatar: FileUploaded;
  readonly birthday: string;
  readonly phone: string;
  readonly address: Address;
}
