import { useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

function TopicInput({ setLesson, setQuiz, setTopic }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setLesson("");
    setQuiz([]);
    setTopic(input); // ✅ Pass to App-level state

    try {
      const res = await axios.post("http://localhost:8000/generate", {
        topic: input,
      });
      setLesson(res.data.lesson);
      setQuiz(res.data.quiz);
    } catch (err) {
      console.error("❌ Error fetching lesson:", err);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md space-y-4 text-center">
      <input
        type="text"
        placeholder="Enter a topic to learn"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-zinc-800"
      />
      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white"
      >
        {loading ? <Loader2 className="animate-spin" /> : "Generate Lesson"}
      </Button>
    </div>
  );
}

export default TopicInput;
