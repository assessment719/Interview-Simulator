import { LucideMessageCircleQuestion } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Question } from '../../../Frontend/src/Types/index';
import { loaderAtom } from '../Atoms/loaderAtom';
import { useSetRecoilState } from 'recoil';

const QuestionCentre: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('all');
  const [expectedKeywords, setExpectedKeywords] = useState('');
  const [evaluationPrompt, setEvaluationPrompt] = useState('');

  const [interviewQuestions, setInterviewQuestions] = useState<Question[]>([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [numberOfUpdatingQuestions, setNumberOfUpdatingQuestions] = useState(0);
  const [isQuestionToUpdated, setIsQuestionToUpdated] = useState(false);

  const setIsFetching = useSetRecoilState(loaderAtom);

  // Get Question
  const fetchQuestions = async () => {
    setIsFetching(true);
    try {
      await new Promise((e) => { setTimeout(e, 1000) })
      const response = await fetch("http://localhost:2000/questions");
      const data: { questions: Question[] } = await response.json();
      setInterviewQuestions(data.questions);
      setNumberOfQuestions(data.questions.length);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const resetForm = () => {
    setQuestion('');
    setCategory('');
    setDifficulty('all');
    setExpectedKeywords('');
    setEvaluationPrompt('');
    fetchQuestions();
  }

  // Update Question
  const inputSectionRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToInputSection = () => {
    inputSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const goToUpadteQuestion = (idx: number) => {
    const idOfQuestion = idx - 1;
    setNumberOfUpdatingQuestions(idx)

    handleScrollToInputSection();

    setQuestion(`${interviewQuestions[idOfQuestion].question}`);
    setCategory(`${interviewQuestions[idOfQuestion].category}`);
    setDifficulty(`${interviewQuestions[idOfQuestion].difficulty}`);
    setExpectedKeywords(`${interviewQuestions[idOfQuestion].expectedKeywords}`);
    setEvaluationPrompt(`${interviewQuestions[idOfQuestion].evaluationPrompt}`);
    setIsQuestionToUpdated(true);
  }

  const updateQuestion = () => {
    if (question && category && difficulty !== 'all' && expectedKeywords && evaluationPrompt) {
      fetch("http://localhost:2000/questions/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: numberOfUpdatingQuestions, question, category, difficulty, expectedKeywords, evaluationPrompt }),
      })
        .then(async (res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch data");
          }
          resetForm();
          setIsQuestionToUpdated(false);
        })
        .catch((error) => console.error("Error fetching questions:", error));
    } else {
      alert('Please fill in all fields before submitting.');
    }
  }

  // Delete Question
  const deleteQuestion = (idx: number) => {

    fetch("http://localhost:2000/questions/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: idx }),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
      })
      .catch((error) => console.error("Error fetching questions:", error));

    fetch("http://localhost:2000/questions/update/ids", {
      method: "PUT"
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        fetchQuestions();
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }

  // Add Question
  const addQuestion = () => {
    if (question && category && difficulty !== 'all' && expectedKeywords && evaluationPrompt) {
      let newId = numberOfQuestions + 1;

      fetch("http://localhost:2000/questions/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: newId, question, category, difficulty, expectedKeywords, evaluationPrompt }),
      })
        .then(async (res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch data");
          }
          resetForm();
        })
        .catch((error) => console.error("Error fetching questions:", error));
    } else {
      alert('Please fill in all fields before submitting.');
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 gap-6">
        {interviewQuestions.map((question, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-500"
          >
            <div className="flex items-start space-x-4 mb-5">
              <div className="p-3 bg-blue-100 rounded-lg">
                <LucideMessageCircleQuestion className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 mt-3">
                <b className="font-bold text-xl mb-2">{question.id}. {question.question}</b><br /><br />
                <p className="font-light text-xl mb-2"><b className="font-bold text-lg mb-2">Category Of The Question:</b> {question.category}</p>
                <p className="font-light text-xl mb-2"><b className="font-bold text-lg mb-2">Difficulty Level:</b> {question.difficulty}</p>
                <p className="font-light text-xl mb-2"><b className="font-bold text-lg mb-2">Expected Keywords:</b> {question.expectedKeywords}</p>
                <p className="font-light text-xl mb-2"><b className="font-bold text-lg mb-2">Evaluation Prompt:</b> {question.evaluationPrompt}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => goToUpadteQuestion(question.id)}

                className="w-full btn btn-primary font-bold"
              >
                Update Question
              </motion.button>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => deleteQuestion(question.id)}
                className="w-full btn btn-primary font-bold"
              >
                Delete Question
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      <div ref={inputSectionRef} className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-4'>
          <div className="mb-4 col-span-1 md:col-span-2">
            <label htmlFor="question" className="block font-bold text-xl text-white mb-1">
              Question:
            </label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter Question"
              className="p-2 w-full border border-black text-black rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block font-bold text-xl text-white mb-1">
              Category Of The Question:
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter Category Of The Question"
              className="p-2 w-full border border-black text-black rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="difficulty" className="block font-bold text-xl text-white mb-1">
              Difficulty Level:
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={e => setDifficulty(e.target.value)}
              className="w-full border border-black text-black rounded-lg h-10"
            >
              <option value="all">Select An Option</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="expectedKeywordsID" className="block font-bold text-xl text-white mb-1">
              Expected Keywords:
            </label>
            <input
              type="text"
              id="expectedKeywordsID"
              value={expectedKeywords}
              onChange={(e) => setExpectedKeywords(e.target.value)}
              placeholder="Enter Expected Keywords"
              className="p-2 w-full border border-black text-black rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="evaluationPromptID" className="block font-bold text-xl text-white mb-1">
              Evaluation Prompt:
            </label>
            <input
              type="text"
              id="evaluationPromptID"
              value={evaluationPrompt}
              onChange={(e) => setEvaluationPrompt(e.target.value)}
              placeholder="Enter Evaluation Prompt"
              className="p-2 w-full border border-black text-black rounded-lg"
            />
          </div>
        </div>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={isQuestionToUpdated ? updateQuestion : addQuestion}
          className="w-full btn btn-primary font-bold bg-gradient-to-r from-red-500 to-green-600 text-xl shadow-lg hover:shadow-2xl transition-shadow duration-200"
        >
          {isQuestionToUpdated ? "Update Question" : "Add Question"}
        </motion.button>
      </div>
    </div>
  );
};

export default QuestionCentre;