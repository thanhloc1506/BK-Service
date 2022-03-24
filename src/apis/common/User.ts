import { RolesType } from "./Role";

export interface User {
  readonly username: string;
  readonly email: string;
  readonly id: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly role: RolesType;
  readonly phone?: string;
  readonly address?: string;
}
