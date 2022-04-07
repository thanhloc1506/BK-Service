import {User} from "../../common/User";
import {Service} from "../../common/Service";
import {NotiType} from "../../common/NotiType";

export namespace PInNotification{
    export interface Notification {
        readonly _id: string;
        readonly extraData: string[];
        readonly user: User;
        readonly service: Service
        readonly type: NotiType;
        readonly date: number;
        readonly hadRead: boolean;
    }

    export interface Data{
        noti: Array<Notification>;
    }
}