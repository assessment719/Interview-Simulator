import Router from "express";
import { questionModel } from "../database";

export const addRouter = Router();

addRouter.post("/", async function (req, res) {

    const { id, question, category, difficulty, expectedKeywords, evaluationPrompt } = req.body;

    try {
        const questions = await questionModel.create({
            id, question, category, difficulty, expectedKeywords, evaluationPrompt
        });

        res.json({
            Message: "You Have Added An Question"
        });
    } catch (error) {
        console.log(`Error With Api: ${error}`);
        res.status(500).json({Message: "Error While Fetching"});
    }
});