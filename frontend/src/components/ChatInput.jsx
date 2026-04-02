import React, { useState } from 'react'

const ChatInput = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() && !disabled) {
      onSendMessage(input)
      setInput('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (input.trim() && !disabled) {
        handleSubmit(e)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/95 p-2 shadow-lg">
      <textarea
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Ask a precise question (Shift+Enter for newline, Enter to send)"
        style={{ color: '#ffffff' }}
        className="h-[46px] w-full flex-1 resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
      />
      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-md hover:from-blue-400 hover:to-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {disabled ? (
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        )}
      </button>
    </form>
  )
}

export default ChatInput
