import {Address} from "../../common/Address";
import {FileUploaded} from "../../common/FileUploaded";

export namespace PInAllServices{
    export interface Service {
        readonly _id: string;
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
        readonly images?: FileUploaded[];
    }

    export interface Data {
        services: Service[]
    }
}