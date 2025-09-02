import React from 'react'

export function AppHero({
  children,
  subtitle,
  title,
}: {
  children?: React.ReactNode
  subtitle?: React.ReactNode
  title?: React.ReactNode
}) {
  return (
    <div className="flex flex-row justify-center py-[16px] md:py-[64px] relative">
      {/* Subtle blockchain grid background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-black via-slate-900 to-purple-950" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px'
             }}>
        </div>
      </div>

      <div className="text-center relative z-10">
        <div className="max-w-2xl backdrop-blur-sm bg-white/5 border border-cyan-400/20 rounded-xl p-8 shadow-2xl">
          {/* Cyberpunk accent border */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 opacity-60 rounded-t-xl"></div>
          
          {/* Chain link decorative elements */}
          <div className="flex justify-center mb-4 space-x-2">
            <div className="w-4 h-4 border-2 border-cyan-400/40 rounded-full"></div>
            <div className="w-8 h-[2px] bg-cyan-400/40 mt-2"></div>
            <div className="w-4 h-4 border-2 border-cyan-400/40 rounded-full"></div>
            <div className="w-8 h-[2px] bg-cyan-400/40 mt-2"></div>
            <div className="w-4 h-4 border-2 border-cyan-400/40 rounded-full"></div>
          </div>

          {typeof title === 'string' ? (
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,255,255,0.3)]">
              {title}
            </h1>
          ) : (
            <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,255,255,0.3)]">
              {title}
            </div>
          )}
          
          {typeof subtitle === 'string' ? (
            <p className="pt-4 md:py-6 text-gray-300 text-lg font-mono">
              {subtitle}
            </p>
          ) : (
            <div className="pt-4 md:py-6 text-gray-300 text-lg font-mono">
              {subtitle}
            </div>
          )}
          
          {children}
        </div>
      </div>
    </div>
  )
}