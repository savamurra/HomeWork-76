import {createSlice} from "@reduxjs/toolkit";
import {MessageMutation} from "../../types";
import {createMessage} from "./messageThunk.ts";

interface IMessageSlice {
    messages: MessageMutation[];
    createLoading: boolean;
}

const initialState: IMessageSlice = {
    messages: [],
    createLoading: false,
}

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createMessage.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createMessage.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createMessage.rejected, (state) => {
                state.createLoading = false;
            })
    }
});

export const messagesReducer = messageSlice.reducer;