import express from 'express';
import {Message} from "../types";
import fileDb from "../fileDb";
export const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
    const messages = await fileDb.getMessage();
    res.send(messages);
});

messagesRouter.post('/', async (req, res) => {
    const message: Message = {
        message: req.body.message,
        author: req.body.author,
    }

    if (req.body.message.length === 0 || req.body.author.length === 0) {
        res.status(400).send({error: 'Author and message must be present in the request.'});
    } else {
        res.send(await fileDb.addMessage(message));
    }
});

