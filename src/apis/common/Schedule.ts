import {Service} from "./Service";
import {User} from "./User";

export interface Schedule{
    _id: string;
    user: User;
    service: Service;
    timeServe: Date;
}

export interface ScheduleHistory{
    _id: string;
    user: User;
    service: Service;
    date: Date;
    hasRating: boolean;
}