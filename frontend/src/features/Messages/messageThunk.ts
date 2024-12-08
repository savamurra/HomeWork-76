import {createAsyncThunk} from "@reduxjs/toolkit";
import {Message, MessageMutation} from "../../types";
import axiosAPI from "../../axiosAPI.ts";

export const createMessage = createAsyncThunk<void, Message>("message/createMessage", async (message) => {
    await axiosAPI.post("/messages", {...message})
});

export const getMessage = createAsyncThunk<MessageMutation[], void>(
    'message/getMessage', async () => {
        const messageResponse = await axiosAPI<MessageMutation[]>("/messages");
        return messageResponse.data || [];
    }
);