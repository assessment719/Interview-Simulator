import Router from "express";
import { questionModel } from "../database";

export const deleteRouter = Router();

deleteRouter.delete("/", async function (req, res) {

    const { id } = req.body;

    try {
        const questions = await questionModel.deleteOne({
            id
        });

        res.json({
            Message: "You Have Deleted An Question"
        });
    } catch (error) {
        console.log(`Error With Api: ${error}`);
        res.status(500).json({ Message: "Error While Fetching" });
    }

});