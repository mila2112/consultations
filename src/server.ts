const express =  require("express");
import { Express } from "express";
const  mongoose = require("mongoose");
import * as bodyParser from "body-parser";
import { clientRouter } from "./api/routes/clients";
import { lawyerRouter } from "./api/routes/lawyers";
import reminder from "../src/api/cron/cron"
import seed from "../src/db/seed"
const jsonParser = bodyParser.json({
    limit: 1024 * 1024 * 1024,
});

const app: Express = express();

const url = `mongodb+srv://Mila:mila1111@cluster0.ajhlghq.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect( url )
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })
seed();
app.use(jsonParser);

app.use("/client", clientRouter);
app.use("/lawyer", lawyerRouter);


app.listen(4000, () => {
    console.log("started the server")
});

try {
    reminder.reminderJob.start();
    reminder.reminderTwoHoursJob.start();
} catch (err) {
    console.log('error',err)
}

