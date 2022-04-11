import {Address} from "./Address";
import {FileUploaded} from "./FileUploaded";
import {Category} from "./Category";

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
    readonly category?: Category;
    readonly images?: FileUploaded[];
    readonly introduction?: string;
}