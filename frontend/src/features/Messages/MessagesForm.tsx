import {useEffect, useState} from 'react';
import * as React from 'react';
import {Box, Button, Card, CardActions, CardContent, TextField, Typography} from '@mui/material';
import {Message} from "../../types";
import {createMessage, getMessage} from "./messageThunk.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {allMessage} from "./messageSlice.ts";
import  dayjs from "dayjs";


const initialState = {
    message: "",
    author: ""
}
const ProductForm = () => {
    const [form, setForm] = useState<Message>(initialState);
    const dispatch = useAppDispatch();

    const messages = useAppSelector(allMessage);
    useEffect(() => {
        dispatch(getMessage());
    }, [dispatch]);


    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await dispatch(createMessage(form));
        setForm(initialState);
        await dispatch(getMessage());
    }
    return (
        <form onSubmit={onSubmit}>
            <Box
                sx={{
                    flexGrow: 1,
                    maxWidth: 600,
                    margin: "auto",
                    border: "3px solid DarkViolet",
                    padding: "10px",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                }}
            >
                <Box
                    sx={{
                        maxHeight: 400,
                        overflowY: "auto",
                        marginBottom: "15px",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        backgroundColor: "#fff",
                    }}
                >
                    {messages.map((message) => (
                        <Card
                            key={message.id}
                            sx={{
                                marginBottom: "10px",
                                boxShadow: 2,
                                borderRadius: "8px",
                            }}
                        >
                            <CardContent>
                                <Typography gutterBottom sx={{fontSize: 20}}>
                                    <strong>Author: {message.author}</strong>
                                </Typography>
                                <Typography gutterBottom sx={{fontSize: 18}}>
                                    Message: {message.message}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Typography
                                    variant="body2"
                                    sx={{color: "text.secondary", fontSize: 14}}
                                >
                                    Created on: {dayjs(message.dateTime).format('YYYY-MM-DD HH:mm:ss')}
                                </Typography>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
                <TextField
                    sx={{width: "100%", marginBottom: "10px"}}
                    id="message"
                    label="Message"
                    name="message"
                    value={form.message}
                    variant="outlined"
                    onChange={inputHandler}
                    required
                />
                <TextField
                    sx={{width: "100%", marginBottom: "10px"}}
                    id="author"
                    label="Author"
                    name="author"
                    value={form.author}
                    variant="outlined"
                    onChange={inputHandler}
                    required
                />
                <Button
                    color="secondary"
                    type="submit"
                    variant="contained"
                    sx={{width: "100%"}}
                >
                    Create
                </Button>
            </Box>

        </form>
    );
};

export default ProductForm;