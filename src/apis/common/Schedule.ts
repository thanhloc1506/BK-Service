import { Service } from "./Service";
import { User } from "./User";

export interface ParseDate {
  day: string | number;
  month: string | number;
  year: string | number;
  hour: string | number;
  min: string | number;
  sec: string | number;
}

export interface Schedule {
  _id: string;
  user: User;
  service: Service;
  timeServe: Date | ParseDate;
}

export interface ScheduleHistory {
  _id: string;
  user: User;
  service: Service;
  date: Date;
  hasRating: boolean;
}
