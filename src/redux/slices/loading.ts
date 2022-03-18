import {createSlice} from "@reduxjs/toolkit";

export interface State {
    loading: number
}

const initialState: State = {
    loading: 0
};

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        showWaiting(state) {
            state.loading += 1
        },
        hideWaiting(state) {
            state.loading -= 1
        },
        clearWaiting(state) {
            state.loading = 0
        }
    }
});

export default loadingSlice.reducer;
export const {showWaiting, hideWaiting, clearWaiting} = loadingSlice.actions;
