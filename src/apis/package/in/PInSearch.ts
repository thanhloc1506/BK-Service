import {Address} from "../../common/Address";
import {Service} from "../../common/Service";
export namespace PInSearch{
    export interface Data {
        searchText: string;
        services: Array<Service>;
        totalPage: number;
        page: number;
    }
}
