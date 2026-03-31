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
      const response = await axios.post('http://localhost:5000/apis/chat', {
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
    <div className="flex flex-col h-screen bg-bg-primary">
      <Header />
      
      {/* Main Chat Area */}
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-5xl mx-auto w-full px-6">
          {/* Welcome Screen or Messages */}
          {messages.length === 0 ? (
            <Welcome onAskQuestion={handleSendMessage} />
          ) : (
            <div className="pt-6">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {loading && (
                <div className="flex items-center gap-2 py-4 animate-fadeIn">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-brand-primary rounded-full animate-typing-dots"></div>
                    <div className="w-2 h-2 bg-brand-primary rounded-full animate-typing-dots" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-brand-primary rounded-full animate-typing-dots" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <span className="text-text-secondary text-sm">Thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Fixed Input Bar */}
      <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
    </div>
  )
}

export default App
