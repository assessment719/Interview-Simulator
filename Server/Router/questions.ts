import Router from "express";
import { questionModel } from "../database";

export const questionsRouter = Router();

questionsRouter.get("/", async function (req, res) {

    try {
        const questions = await questionModel.find();

        res.json({
            questions
        });
    } catch (error) {
        console.log(`Error With Api: ${error}`);
        res.status(500).json({ Message: "Error While Fetching" });
    }
});