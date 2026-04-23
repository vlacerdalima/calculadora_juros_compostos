interface Props {
  text: string
  isDark: boolean
}

export default function InfoTooltip({ text, isDark }: Props) {
  const icon = isDark ? 'text-zinc-600 hover:text-zinc-400' : 'text-zinc-400 hover:text-zinc-600'
  const tip = isDark
    ? 'bg-zinc-800 border-zinc-700 text-zinc-300 shadow-2xl'
    : 'bg-white border-zinc-200 text-zinc-600 shadow-xl'
  const arrow = isDark ? 'border-t-zinc-700' : 'border-t-zinc-200'

  return (
    <div className="relative group inline-flex items-center">
      <button type="button" className={`${icon} transition-colors ml-1.5`} tabIndex={-1}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 7v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="8" cy="4.5" r="0.75" fill="currentColor" />
        </svg>
      </button>
      <div className={`pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50
                      w-56 rounded-xl border p-3 text-xs leading-relaxed
                      opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${tip}`}>
        {text}
        <div className={`absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent ${arrow}`} />
      </div>
    </div>
  )
}
