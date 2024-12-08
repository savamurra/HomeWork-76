import {useState} from 'react';
import * as React from 'react';
import Grid from '@mui/material/Grid2';
import {Button, TextField} from '@mui/material';
import {Message} from "../../types";
import {createMessage} from "./messageThunk.ts";
import {useAppDispatch} from "../../app/hooks.ts";

const initialState = {
    message: "",
    author: ""
}
const ProductForm = () => {
    const [form, setForm] = useState<Message>(initialState);
    const dispatch = useAppDispatch();


    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await dispatch(createMessage(form));
        setForm(initialState);
    }
    return (
        <form onSubmit={onSubmit}>
            <Grid
                container
                spacing={2}
                sx={{mx: "auto", width: "50%", mt: 4, justifyContent: "center"}}
            >
                <Grid size={8}>
                    <TextField
                        sx={{width: "100%"}}
                        id="message"
                        label="Message"
                        name="message"
                        value={form.message}
                        variant="outlined"
                        onChange={inputHandler}
                        required
                    />
                </Grid>
                <Grid size={8}>
                    <TextField
                        sx={{width: "100%"}}
                        id="author"
                        label="Author"
                        name="author"
                        value={form.author}
                        variant="outlined"
                        onChange={inputHandler}
                        required
                    />
                </Grid>
                <Grid size={8}>
                    <Button color="secondary"
                            type="submit"
                            variant="contained"
                            sx={{width: "100%"}}>
                        Create
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ProductForm;