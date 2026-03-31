import { useState, useRef, useEffect } from 'react'
import ChatMessage from './components/ChatMessage'
import ChatInput from './components/ChatInput'
import Header from './components/Header'
import Welcome from './components/Welcome'
import axios from 'axios'

function App() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Typing effect for AI messages
  useEffect(() => {
    if (messages.length === 0) return

    const lastMessage = messages[messages.length - 1]
    
    // Only apply typing effect to AI messages that are still being typed
    if (lastMessage.sender === 'assistant' && lastMessage.isTyping) {
      if (lastMessage.displayText.length < lastMessage.text.length) {
        const timeout = setTimeout(() => {
          setMessages(prevMessages => {
            const updated = [...prevMessages]
            const lastMsg = updated[updated.length - 1]
            
            // Add next character
            const nextIndex = lastMsg.displayText.length + 1
            lastMsg.displayText = lastMsg.text.substring(0, nextIndex)
            
            // Mark as done typing if complete
            if (nextIndex >= lastMsg.text.length) {
              lastMsg.isTyping = false
            }
            
            return updated
          })
        }, 3) // Speed of typing (lower = faster)

        return () => clearTimeout(timeout)
      }
    }
  }, [messages])

  const handleSendMessage = async (text) => {
    if (!text.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: text,
      displayText: text,
      sender: 'user',
      timestamp: new Date(),
      isTyping: false
    }

    setMessages(prev => [...prev, userMessage])
    setLoading(true)

    try {
      const response = await axios.post('https://dsa-engine.vercel.app/apis/chat', {
        dsaQuery: text,
        conversationHistory: messages.map(m => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        }))
      }, {
        timeout: 30000
      })

      const assistantMessage = {
        id: messages.length + 2,
        text: response.data.message,
        displayText: '', // Start with empty string for typing effect
        sender: 'assistant',
        timestamp: new Date(),
        isTyping: true // Flag to enable typing effect
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        text: error.response?.data?.message || "Sorry, something went wrong. Please try again.",
        displayText: error.response?.data?.message || "Sorry, something went wrong. Please try again.",
        sender: 'assistant',
        timestamp: new Date(),
        isTyping: false
      }
      setMessages(prev => [...prev, errorMessage])
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-text-primary">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 overflow-hidden h-[calc(100vh-96px)]">
        <div className="grid gap-5 md:grid-cols-[300px_1fr] h-full">
          <aside className="hidden md:block rounded-2xl border border-subtle bg-slate-900/70 p-4 shadow-subtle backdrop-blur overflow-y-auto h-full">
            <h2 className="text-lg font-bold mb-3">Study Hub</h2>
            <p className="text-sm text-text-secondary mb-4">Fast helpers and concept refreshers for students.</p>
            <ul className="space-y-2">
              {['Array', 'LinkedList', 'Stack', 'Queue', 'Graph', 'DP', 'Sorting'].map((topic) => (
                <li key={topic}>
                  <button
                    onClick={() => handleSendMessage(`Explain ${topic} with example`)}
                    className="w-full text-left rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm hover:border-blue-500 hover:bg-blue-500/20 transition"
                  >
                    {topic}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-lg bg-slate-800 p-3">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-blue-300">Tip</h3>
              <p className="text-xs text-text-secondary mt-1">Ask precise questions for the best step-by-step explanations. E.g., "Explain Dijkstra’s algorithm with complexity".</p>
            </div>
          </aside>

          <section className="flex flex-col rounded-2xl border border-subtle bg-slate-900/70 p-4 shadow-subtle backdrop-blur overflow-hidden h-full">
            {messages.length === 0 ? (
              <Welcome onAskQuestion={handleSendMessage} />
            ) : (
              <div className="flex-1 overflow-y-auto pb-6 pr-2 h-full">
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
                {loading && (
                  <div className="flex items-center gap-2 py-4 animate-fadeIn">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-typing-dots"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-typing-dots" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-typing-dots" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <span className="text-text-secondary text-sm">Working on your answer...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </section>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 border-t border-subtle bg-slate-950/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
        </div>
      </div>
    </div>
  )
}

export default App
