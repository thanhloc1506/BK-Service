import React, {useMemo} from "react";
import {io, Socket} from "socket.io-client";

export const NotificationContainer = ()=>{
    const socket = useMemo<Socket>(()=>{
       return io("http://localhost:8080");
    }, []);
}