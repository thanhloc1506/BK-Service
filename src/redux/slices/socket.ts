import {AsyncThunkPayloadCreator, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {socket, SocketClient} from "../../apis/socket";
import {toast} from "react-toastify";

export interface State {
}

const initialState: State = {
};
const thunkCreatorSocketConnect: AsyncThunkPayloadCreator<Promise<any>, void, { state: State }> = async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const dispatch = thunkAPI.dispatch;
    return socket.connect()
        .then(() => {
            return;
        }).catch((err) => {
            dispatch(socketDisconnect());
            throw err;
        })
}
export const socketConnect = createAsyncThunk(
    "socketConnect",
    thunkCreatorSocketConnect
)

const thunkCreatorSocketDisconnect: AsyncThunkPayloadCreator<Promise<any>, void, { state: State }> = async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    return socket.disconnect()
        .then(() => {
            return;
        }).catch((err) => {
            throw err;
        })
}
export const socketDisconnect = createAsyncThunk(
    "socketDisconnect",
    thunkCreatorSocketDisconnect
)
const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        socketConnect(state, action) {
            socket.connect()
                .then(() => {

                })
                .catch(err => {

                })
        }
    },
    extraReducers: {
        [socketConnect.fulfilled.toString()]: (state, action) => {
            toast.success(
                `Connected to socket !`,
                {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            );
        },
        [socketConnect.rejected.toString()]: (state, action) => {
            toast.error(
                `Connect socket fail!`,
                {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            );
        },
        [socketDisconnect.fulfilled.toString()]: (state, action) => {
            toast.success(
                `Disconnected to socket !`,
                {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            );
        },
        [socketDisconnect.rejected.toString()]: (state, action) => {
            toast.error(
                `Disconnect socket fail!`,
                {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            );
        }
    }
});

export default socketSlice.reducer;
export const {} = socketSlice.actions;
