import { User } from "./User";
import { Service } from "./Service";

export interface Schedule {
  _id: string;
  user: User;
  service: Service;
  timeServe: Date | ParseDate;
}

export interface ParseDate {
  day: string | number;
  month: string | number;
  year: string | number;
  hour: string | number;
  min: string | number;
  sec: string | number;
}
