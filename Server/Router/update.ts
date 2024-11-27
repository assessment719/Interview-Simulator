import Router from "express";
import { questionModel } from "../database";

export const updateRouter = Router();

updateRouter.put("/", async function (req, res) {

    const { id, question, category, difficulty, expectedKeywords, evaluationPrompt } = req.body;

    try {
        const questions = await questionModel.updateOne({
            id
        }, {
            id, question, category, difficulty, expectedKeywords, evaluationPrompt
        });

        res.json({
            Message: "You Have Updated An Question"
        });
    } catch (error) {
        console.log(`Error With Api: ${error}`);
        res.status(500).json({ Message: "Error While Fetching" });
    }
});

updateRouter.put("/ids", async function (req, res) {
    try {
      const questions = await questionModel.find().sort({ _id: 1 });

      const bulkOps = questions.map((question, index) => ({
        updateOne: {
          filter: { _id: question._id },
          update: { $set: { id: index + 1 } },
        },
      }));
 
      await questionModel.bulkWrite(bulkOps);
  
      res.json({
        Message: "All Question IDs Updated Sequentially",
      });
    } catch (error) {
      console.log(`Error With API: ${error}`);
      res.status(500).json({ Message: "Error While Updating Question IDs" });
    }
  });