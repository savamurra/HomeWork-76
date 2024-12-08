import express = require("express");
import {messagesRouter} from "./routers/messages";
import * as fs from "node:fs";
import fileDb from "./fileDb";


const app = express();
const port = 8000;

app.use(express.json());
app.use("/messages", messagesRouter);

const run = async () => {
    if (fs.existsSync('./db.json')) {
        await fileDb.init();
    } else {
        fs.writeFileSync('./db.json', JSON.stringify([]));
    }

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });
}

run().catch(err => console.log(err));