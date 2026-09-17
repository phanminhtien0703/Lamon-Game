/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './games/than-ma-giang-the/doi-diem/index.html',
  ],
  safelist: [
    'bg-amber-500/15', 'text-amber-300', 'border-amber-500/30',
    'bg-purple-500/15', 'text-purple-300', 'border-purple-500/30',
    'bg-rose-500/15', 'text-rose-300', 'border-rose-500/30',
    'bg-cyan-500/15', 'text-cyan-300', 'border-cyan-500/30',
    'bg-teal-500/15', 'text-teal-300', 'border-teal-500/30',
    'bg-emerald-500/15', 'text-emerald-300', 'border-emerald-500/30',
    'bg-blue-500/15', 'text-blue-300', 'border-blue-500/30',
    'bg-red-500/15', 'text-red-300', 'border-red-500/30',
    'bg-indigo-500/15', 'text-indigo-300', 'border-indigo-500/30',
    'bg-yellow-500/15', 'text-yellow-300', 'border-yellow-500/30',
    'bg-slate-700/30', 'text-slate-300', 'border-slate-600/30',
    'ring-2', 'ring-emerald-500/80', 'border-emerald-500/50', 'bg-slate-900/90', 'shadow-emerald-950/40',
    'opacity-60', 'opacity-0', 'pointer-events-none', 'translate-x-full', 'scale-95', 'scale-100',
    'cursor-zoom-in', 'cursor-grab', 'cursor-grabbing', 'animate-spin', 'animate-pulse'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          flame: '#ea580c',
          'flame-hover': '#c2410c',
          gold: '#f59e0b',
          'gold-light': '#fcd34d',
          emerald: '#10b981',
          'emerald-dark': '#059669',
          dark: '#070b14',
          surface: '#0f172a',
          'surface-card': '#162036',
          'surface-hover': '#1e2c4a',
          border: 'rgba(255, 255, 255, 0.1)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif']
      }
    }
  },
  plugins: [],
}
