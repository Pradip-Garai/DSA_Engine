import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/atom-one-dark.css'

const ChatMessage = ({ message }) => {
  const isAssistant = message.sender === 'assistant'

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const markdownComponents = {
    h1: ({ node, ...props }) => <h1 className="text-lg font-bold text-text-primary mt-4 mb-2" {...props} />,
    h2: ({ node, ...props }) => <h2 className="text-base font-bold text-text-primary mt-3 mb-2" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-sm font-semibold text-text-primary mt-2 mb-1" {...props} />,
    p: ({ node, ...props }) => <p className="text-text-primary mb-2 leading-relaxed" {...props} />,
    strong: ({ node, ...props }) => <strong className="font-bold text-text-primary" {...props} />,
    em: ({ node, ...props }) => <em className="italic text-text-secondary" {...props} />,
    ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-2 text-text-primary space-y-1" {...props} />,
    ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-2 text-text-primary space-y-1" {...props} />,
    li: ({ node, ...props }) => <li className="text-text-primary" {...props} />,
    code: ({ node, inline, ...props }) => 
      inline ? (
        <code className="bg-bg-primary px-2 py-1 rounded text-brand-accent font-mono text-sm" {...props} />
      ) : (
        <code {...props} />
      ),
    pre: ({ node, ...props }) => (
      <div className="relative bg-bg-primary border border-subtle rounded-lg my-3 overflow-hidden group w-full">
        <button 
          onClick={(e) => {
            const code = e.currentTarget.nextElementSibling.textContent
            navigator.clipboard.writeText(code)
            e.currentTarget.textContent = 'Copied!'
            setTimeout(() => {
              e.currentTarget.textContent = 'Copy'
            }, 2000)
          }}
          className="absolute top-2 right-2 px-2 py-1 bg-brand-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-10"
        >
          Copy
        </button>
        <pre className="p-4 overflow-x-auto max-w-full" {...props} />
      </div>
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote className="border-l-4 border-brand-primary pl-4 italic text-text-secondary my-2" {...props} />
    ),
    a: ({ node, ...props }) => (
      <a className="text-brand-primary hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
    ),
  }

  // Use displayText for AI messages (for typing effect), otherwise use text
  const displayContent = isAssistant ? (message.displayText || message.text) : message.text

  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} mb-4 animate-fadeIn`}>
      <div className={`flex gap-3 max-w-4xl ${isAssistant ? '' : 'flex-row-reverse'}`}>
        <div className={`flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold ${
          isAssistant
            ? 'bg-blue-500 text-white'
            : 'bg-emerald-500 text-slate-950'
        }`}>
          {isAssistant ? 'AI' : 'You'}
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <div className={`rounded-xl border px-4 py-3 shadow-md ${
            isAssistant
              ? 'border-slate-700 bg-slate-900 text-slate-100 prose prose-invert'
              : 'border-emerald-400 bg-emerald-500/20 text-slate-900'
          }`}>
            {isAssistant ? (
              <ReactMarkdown
                components={markdownComponents}
                rehypePlugins={[rehypeHighlight]}
                remarkPlugins={[]}
              >
                {displayContent}
              </ReactMarkdown>
            ) : (
              <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                {displayContent}
              </p>
            )}

            {message.isTyping && isAssistant && (
              <span className="inline-block ml-1 h-4 w-1 rounded bg-slate-200 animate-pulse" />
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{isAssistant ? 'DSA Assistant' : 'You'}</span>
            <span>{formatTime(message.timestamp)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatMessage
