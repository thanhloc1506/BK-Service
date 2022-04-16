import {User} from "./User";
import {Service} from "./Service";

export interface Schedule{
    _id: string;
    user: User;
    service: Service;
    timeServe: Date;
}