import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { questionsRouter } from "./Router/questions";
import { addRouter } from "./Router/add";
import { updateRouter } from "./Router/update";
import { deleteRouter } from "./Router/delete";
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 2000;

app.use(express.json());
app.use(cors());

app.use("/questions", questionsRouter);
app.use("/questions/add", addRouter);
app.use("/questions/update", updateRouter);
app.use("/questions/delete", deleteRouter);

async function main() {
    await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}

main();