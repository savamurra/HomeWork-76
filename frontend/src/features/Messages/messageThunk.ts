import {createAsyncThunk} from "@reduxjs/toolkit";
import {Message} from "../../types";
import axiosAPI from "../../axiosAPI.ts";

export const createMessage = createAsyncThunk<void, Message>("message/createMessage", async (message) => {
    await axiosAPI.post("/messages", {...message})
});