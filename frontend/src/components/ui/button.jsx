export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-all dark:border-gray-600 dark:hover:bg-gray-800 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
