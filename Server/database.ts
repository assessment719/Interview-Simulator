import mongoose from "mongoose";

const Schema = mongoose.Schema;

const question = new Schema ({
    id: { type: Number, unique: true },
    question: String,
    category: String,
    difficulty: String,
    expectedKeywords: String,
    evaluationPrompt: String
});

export const questionModel = mongoose.model("questions", question);