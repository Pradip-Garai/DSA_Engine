import React from 'react'

const Welcome = ({ onAskQuestion }) => {
  const quickActions = [
    'Explain Binary Search',
    'Dynamic Programming',
    'Two Sum Problem',
    'Merge Sort'
  ]

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-white">Welcome to DSA Instructor</h2>
      <p className="mt-2 text-sm text-slate-300">Type your question or choose a topic to get structured explanations, examples, and code.</p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => onAskQuestion(action)}
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-left text-sm font-medium text-white transition hover:border-blue-400 hover:bg-blue-500/20"
          >
            {action}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-slate-800 p-3 text-xs text-slate-300">
        <strong className="text-sky-300">Pro tip:</strong> use specific prompt format like <code className="rounded bg-slate-700 px-1">Explain {`{topic}`} with time complexity and a short example</code>
      </div>
    </div>
  )
}

export default Welcome
