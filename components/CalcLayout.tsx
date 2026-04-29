'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

interface Props {
  title: string
  subtitle: string
  iconBg: string
  icon: React.ReactNode
  children: (props: { isDark: boolean }) => React.ReactNode
}

export default function CalcLayout({ title, subtitle, iconBg, icon, children }: Props) {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    document.documentElement.style.backgroundColor = isDark ? '#09090b' : '#f4f4f5'
  }, [isDark])

  const bg = isDark ? 'bg-zinc-950' : 'bg-zinc-100'
  const headerBorder = isDark ? 'border-zinc-800/60' : 'border-zinc-200'
  const themeBtnWrap = isDark ? 'bg-zinc-800/80' : 'bg-zinc-200/70'
  const breadcrumbSep = isDark ? 'text-zinc-700' : 'text-zinc-300'
  const breadcrumbHome = isDark ? 'text-zinc-400 hover:text-zinc-100' : 'text-zinc-500 hover:text-zinc-800'
  const breadcrumbCurrent = isDark ? 'text-zinc-200' : 'text-zinc-700'

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-200`}>
      <header className={`border-b ${headerBorder} px-6 py-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className={`w-6 h-6 rounded-md ${iconBg} flex items-center justify-center shrink-0`}>
            {icon}
          </div>
          <nav aria-label="breadcrumb" className="flex items-center gap-1.5">
            <Link href="/" className={`text-sm font-semibold transition-colors ${breadcrumbHome}`}>
              VouCalcular
            </Link>
            <span className={`text-sm font-light ${breadcrumbSep}`}>/</span>
            <span className={`text-sm font-semibold ${breadcrumbCurrent}`}>{title}</span>
          </nav>
        </div>

        <div className={`flex rounded-lg ${themeBtnWrap} p-[3px] gap-[2px]`}>
          <button
            onClick={() => setIsDark(false)}
            title="Modo claro"
            className={`p-1.5 rounded-md transition-all cursor-pointer ${
              !isDark ? 'bg-white text-zinc-700 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <SunIcon />
          </button>
          <button
            onClick={() => setIsDark(true)}
            title="Modo escuro"
            className={`p-1.5 rounded-md transition-all cursor-pointer ${
              isDark ? 'bg-zinc-700 text-zinc-100 shadow-sm' : 'text-zinc-400 hover:text-zinc-600'
            }`}
          >
            <MoonIcon />
          </button>
        </div>
      </header>

      {children({ isDark })}
    </div>
  )
}
