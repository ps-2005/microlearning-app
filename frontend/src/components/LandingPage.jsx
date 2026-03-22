function LandingPage({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6">
      <h1 className="text-5xl font-bold mb-4 text-purple-700">AI Microlearning App</h1>
      <p className="text-lg text-gray-600 max-w-xl mb-8">
        Learn any topic in under 5 minutes with AI-generated bite-sized lessons and quizzes. Perfect for quick study, revision, or daily curiosity.
      </p>
      <button
        onClick={onStart}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-purple-700 transition"
      >
        🚀 Get Started
      </button>
    </div>
  )
}

export default LandingPage
