import React, { useState } from 'react'

const Header = () => {
  const [imageError, setImageError] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-bg-primary border-b border-subtle shadow-subtle">
      <div className="max-w-full px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo + Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-primary text-white font-bold text-xl overflow-hidden">
              {imageError ? (
                <span>λ</span>
              ) : (
                <img 
                  src="/LOGO.png" 
                  alt="DSA Instructor Logo" 
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-primary">DSA Instructor</h1>
            </div>
          </div>

          {/* Right: Status */}
          <div className="flex items-center gap-2 text-text-secondary text-sm">
            <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
            <span>AI Powered</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
