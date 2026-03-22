function LessonDisplay({ lesson }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md max-h-[300px] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-3 text-indigo-600 dark:text-indigo-300">📘 Lesson</h2>
      <p className="whitespace-pre-line leading-relaxed text-gray-700 dark:text-gray-200">
        {lesson}
      </p>
    </div>
  )
}

export default LessonDisplay
