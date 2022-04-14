import { RolesType } from "./Role";
import { Address } from "./Address";

export interface Enterprise {
  readonly username: string;
  readonly email: string;
  readonly id: string;
  readonly fullName: string;
  readonly role: RolesType;
  readonly avatar: string;
  readonly phone: string;
  readonly address: Address;
  readonly premium: string;
}
