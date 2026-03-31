import React from 'react'

const Welcome = ({ onAskQuestion }) => {
  const quickActions = [
    "Explain Binary Search",
    "Dynamic Programming",
    "Two Sum Problem",
    "Merge Sort"
  ]

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {/* Title */}
      <h2 className="text-3xl font-bold text-text-primary mb-2">Welcome to DSA Instructor</h2>
      <p className="text-text-secondary mb-8">Master Data Structures and Algorithms with AI-powered guidance</p>

      {/* Quick Action Buttons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-xl">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => onAskQuestion(action)}
            className="px-6 py-4 bg-bg-secondary border border-subtle rounded-lg text-text-primary text-sm font-medium hover:bg-slate-700 hover:border-brand-primary transition-all duration-200 hover:scale-105 text-left"
          >
            {action}
          </button>
        ))}
      </div>

      {/* Footer Info */}
      <p className="text-text-secondary text-xs mt-8 text-center max-w-md">
        Ask any question about Data Structures, Algorithms, or Coding Interview Problems
      </p>
    </div>
  )
}

export default Welcome
