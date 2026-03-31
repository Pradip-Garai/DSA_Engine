import React, { useState } from 'react'

const Header = () => {
  const [imageError, setImageError] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-950/95 py-3 shadow-lg backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-black text-xl">
            λ
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">DSA Instructor</h1>
            <p className="text-sm text-slate-300">Learn concepts with guided AI and step-by-step examples</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="text-sm text-slate-300">AI Enabled</span>
        </div>
      </div>
    </header>
  )
}

export default Header
