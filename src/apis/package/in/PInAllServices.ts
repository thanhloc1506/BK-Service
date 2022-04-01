import {Address} from "../../common/Address";

export namespace PInAllServices{
    export interface Service {
        readonly name: string;
        readonly avatar?: any;
        readonly enterprise: string;
        readonly address: Address;
        readonly email: string;
        readonly phone: string;
        readonly openTime: string;
        readonly closeTime: string;
        readonly maxPrice: number;
        readonly minPrice: number;
        readonly category: any;
    }

    export interface Data {
        services: Service[]
    }
}