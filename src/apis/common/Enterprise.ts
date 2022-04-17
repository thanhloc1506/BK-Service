import {RolesType} from "./Role";
import {Address} from "./Address";
import {FileUploaded} from "./FileUploaded";

export interface Enterprise {
  email: string;
  username: string;
  id: string;
  fullName: string;
  role: RolesType;
  avatar?: FileUploaded;
  phone: string;
  address: Address;
  premium: string;
}
