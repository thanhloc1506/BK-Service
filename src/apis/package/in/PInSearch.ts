import { Address } from "../../common/Address";
export namespace PInSearch {
  export interface Service {
    readonly name: string;
    readonly email: string;
    readonly phone: number;
    readonly type: number;
    readonly address: Address;
  }
  export interface Data {
    searchText: string;
    services: Service[];
  }
}
