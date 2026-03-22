import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopicInput from "./components/TopicInput";
import LessonDisplay from "./components/LessonDisplay";
import QuizDisplay from "./components/QuizDisplay";
import { Button } from "./components/ui/button";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

function App() {
  const [lesson, setLesson] = useState('');
  const [quiz, setQuiz] = useState([]);
  const [topic, setTopic] = useState('');
  const [started, setStarted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("❌ Login failed", error);
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => setUser(null));
  };

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', prefersDark);
    setDarkMode(prefersDark);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 relative ${
        darkMode
          ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'
          : 'bg-gradient-to-br from-blue-100 via-purple-200 to-pink-100 text-gray-800'
      }`}
    >
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-5 left-5 px-4 py-2 text-sm font-medium rounded-full shadow-lg bg-white/80 dark:bg-gray-700 dark:text-white text-gray-800 hover:scale-105 transition"
      >
        {darkMode ? '🌞 Light' : '🌙 Dark'}
      </button>

      {/* Auth Button */}
      <div className="absolute top-5 right-5">
        {user ? (
          <Button variant="outline" onClick={handleLogout}>
            Logout ({user.displayName})
          </Button>
        ) : (
          <Button onClick={handleLogin}>Login with Google</Button>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <AnimatePresence mode="wait">
          {!started ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center justify-center text-center space-y-6"
            >
              <div className="text-6xl">📚</div>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
                Learn Anything in Minutes
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                Microlearning GPT gives you fast, focused lessons & quizzes. No fluff. Just learning.
              </p>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 text-sm sm:text-base"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {[
                  ['🧠', 'Enter a Topic', 'Anything you’re curious about'],
                  ['📖', 'Get a Mini Lesson', 'Concise & beginner-friendly'],
                  ['📝', 'Answer a Quiz', 'Test yourself instantly'],
                ].map(([emoji, title, desc], idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/70 dark:bg-gray-800 shadow-md"
                  >
                    <div className="text-3xl mb-2">{emoji}</div>
                    <p>
                      <strong>{title}</strong>
                      <br />
                      {desc}
                    </p>
                  </div>
                ))}
              </motion.div>

              <motion.button
                onClick={() => setStarted(true)}
                className="mt-8 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 rounded-xl shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Learning 🚀
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="app"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h1 className="text-3xl font-bold text-center">AI Microlearning App</h1>
              <TopicInput setLesson={setLesson} setQuiz={setQuiz} setTopic={setTopic} />
              {lesson && (
                <>
                  <h2 className="text-2xl font-semibold text-center">{topic}</h2>
                  <LessonDisplay lesson={lesson} />
                </>
              )}
              {quiz.length > 0 && (
                <QuizDisplay
                  quiz={quiz}
                  topic={topic}
                  lesson={lesson}
                  user={user}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
