import OpenAI from 'openai/index.mjs';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

let sessionCount = 1;
let previousQuestion = '';
const initialScores: Array<{ session: number; score: number }> = [
  { session: 0, score: 0 },
];

let recentScores = [...initialScores];

export async function analyzeResponse(
  question: string,
  response: string,
  evaluationPrompt: string,
  expectedKeywords: string,
  university: string,
  course: string,
  intake: string,
  destination: string
): Promise<{ feedback: string; score: number }> {
  try {
    if (previousQuestion !== question) {
      sessionCount = 1;
      recentScores = [...initialScores];
      previousQuestion = question;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an expert visa interview evaluator. Provide concise, constructive feedback for student responses with a sample answer for the student.",
        },
        {
          role: "user",
          content: `
Question: ${question}
Student Response: ${response}
Evaluation Instructions: ${evaluationPrompt}
Expected Keywords: ${expectedKeywords}
University Name: ${university}
Course Name: ${course}
Intake: ${intake}
Study Destination: ${destination}

Provide feedback in the following JSON format:
{
  "feedback": "detailed feedback here",
  "score": numeric_score_between_0_and_100
}`,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("Message content is null or undefined.");
    }
    
    const result = JSON.parse(content);

    recentScores.push({ session: sessionCount, score: result.score });

    sessionCount++;

    exportRecentScores();

    return {
      feedback: result.feedback,
      score: result.score,
    };
  } catch (error) {
    console.error("Error analyzing response:", error);

    recentScores.push({ session: sessionCount, score: 0 });

    sessionCount++;

    exportRecentScores();

    return {
      feedback:
        "Sorry, there was an error analyzing your response. Please try again.",
      score: 0,
    };
  }
}

export function exportRecentScores() {
  return recentScores;
}