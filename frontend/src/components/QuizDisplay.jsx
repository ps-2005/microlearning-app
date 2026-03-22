import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function QuizDisplay({ quiz, topic, lesson, user }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [locked, setLocked] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleSelect = (option) => {
    if (locked || quizComplete) return;
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: option });
    setLocked(true);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setLocked(selectedAnswers[currentQuestion + 1] !== undefined);
    } else {
      setQuizComplete(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setLocked(selectedAnswers[currentQuestion - 1] !== undefined);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setLocked(false);
    setQuizComplete(false);
  };

  const handleNewTopic = () => {
    window.location.reload();
  };

  const saveQuizResult = async () => {
    try {
      if (!user) return;
      await addDoc(collection(db, "quizHistory"), {
        uid: user.uid,
        email: user.email,
        topic,
        lesson,
        quiz,
        answers: selectedAnswers,
        timestamp: serverTimestamp(),
      });
      console.log("✅ Quiz result saved to Firebase!");
    } catch (error) {
      console.error("❌ Error saving quiz result:", error);
    }
  };

  useEffect(() => {
    const allAnswered = Object.keys(selectedAnswers).length === quiz.length;
    if (allAnswered && !quizComplete && user) {
      saveQuizResult();
    }
  }, [selectedAnswers]);

  const isCorrect = (questionIndex, option) => {
    return quiz[questionIndex].answer === option;
  };

  const getOptionClass = (option, index) => {
    const selected = selectedAnswers[index];
    const correct = quiz[index].answer;

    if (!locked && index === currentQuestion) return "";
    if (selected === option && option === correct)
      return "bg-green-200 border-green-600";
    if (selected === option && option !== correct)
      return "bg-red-200 border-red-600";
    if (option === correct) return "bg-green-100";
    return "";
  };

  const progress = ((currentQuestion + 1) / quiz.length) * 100;
  const score = Object.entries(selectedAnswers).reduce((total, [i, ans]) => {
    return quiz[i].answer === ans ? total + 1 : total;
  }, 0);

  return (
    <div className="space-y-4">
      {!quizComplete && (
        <div className="w-full bg-gray-300 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <Card>
        <CardContent className="p-6 space-y-4">
          {!quizComplete ? (
            <>
              <h3 className="text-lg font-semibold">{quiz[currentQuestion].question}</h3>
              <div className="space-y-2">
                {quiz[currentQuestion].options.map((opt, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className={`w-full justify-start border ${getOptionClass(opt, currentQuestion)}`}
                    onClick={() => handleSelect(opt)}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between items-center pt-4">
                <Button onClick={handlePrev} disabled={currentQuestion === 0}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button variant="ghost" onClick={handleRestart}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Restart
                </Button>
                <Button onClick={handleNext}>
                  {currentQuestion === quiz.length - 1 ? "Finish" : "Next"}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-green-600">🎉 Quiz Complete!</h2>
              <p className="text-lg">You scored {score} out of {quiz.length}</p>
              <div className="flex justify-center gap-4">
                <Button onClick={handleRestart}>🔁 Try Again</Button>
                <Button variant="outline" onClick={handleNewTopic}>✨ New Topic</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default QuizDisplay;
