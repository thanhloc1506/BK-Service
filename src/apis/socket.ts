import {io, Socket} from "socket.io-client";
import cookies from "js-cookie";

const uri = process.env.SOCKET_URI || "http://3.26.55.185:8080";

export class SocketClient {
    private socket: Socket | undefined;

    constructor() {
        this.socket = undefined;
    }

    connect(): Promise<any> {
        this.socket = io(uri, {
            auth: {"bearer": cookies.get("token")}
        });
        return new Promise((resolve, reject) => {
            this.socket?.on("connect", () => {
                console.log("Connected to " + uri);
                resolve(null);
            });
            this.socket?.on("connect_error", (err) => {
                console.log("Connect Fail: " + uri);
                reject(err);
            })
        })
    }

    registerListener(ev: string, callback: (e: any) => void): Promise<any> {
        return new Promise((resolve, reject) => {
            if(!this.socket){
                reject();
            }
            else{
                this.socket.on(ev, callback);
                resolve(null);
            }
        })
    }

    disconnect():Promise<any>{
        return new Promise((resolve, reject)=>{
            if(!this.socket) resolve(null);
            this.socket?.disconnect();
            this.socket = undefined;
            resolve(null);
        })
    }
}

export const socket = new SocketClient();