import {Service} from "./Service";

export interface Schedule{
    _id: string;
    user: string;
    service: Service;
    timeServe: Date;
}