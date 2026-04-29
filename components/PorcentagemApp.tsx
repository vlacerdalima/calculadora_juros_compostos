'use client'

import { useState, useMemo } from 'react'
import CalcLayout from '@/components/CalcLayout'
import { calcularPorcentagem, MODOS, type ModoPorcentagem } from '@/utils/porcentagem'

interface InnerProps {
  modo: ModoPorcentagem; setModo: (v: ModoPorcentagem) => void
  a: string; setA: (v: string) => void
  b: string; setB: (v: string) => void
  resultado: number | null
  isDark: boolean
}

function Inner({ modo, setModo, a, setA, b, setB, resultado, isDark }: InnerProps) {
  const card = isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
  const lbl = `text-xs font-medium uppercase tracking-wider ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`
  const inp = `w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 transition ${
    isDark
      ? 'bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-600 focus:border-violet-500 focus:ring-violet-500/30'
      : 'bg-zinc-50 border border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-violet-500 focus:ring-violet-500/20'
  }`

  const config = MODOS[modo]
  const modos = Object.keys(MODOS) as ModoPorcentagem[]

  const isVariacao = modo === 'variacao'
  const isPositivo = resultado !== null && resultado >= 0
  const resultadoColor = !isVariacao
    ? (isDark ? 'text-violet-400' : 'text-violet-600')
    : isPositivo ? 'text-emerald-400' : 'text-red-400'
  const resultadoBg = !isVariacao
    ? (isDark ? 'bg-violet-500/10 border-violet-500/20' : 'bg-violet-50 border-violet-200')
    : isPositivo
      ? (isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200')
      : (isDark ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-200')

  function fmt(v: number): string {
    if (modo === 'percentual-de') {
      return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }
    return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%'
  }

  return (
    <div className={`${isDark ? 'bg-zinc-950' : 'bg-zinc-100'} transition-colors duration-200`}>
      <main className="max-w-xl mx-auto px-4 py-8 flex flex-col gap-6">
        {/* Seletor de modo */}
        <div className={`rounded-2xl border ${card} p-2 flex flex-col gap-1 transition-colors duration-200`}>
          {modos.map(m => (
            <button key={m} onClick={() => setModo(m)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                modo === m
                  ? isDark ? 'bg-violet-500/15 text-violet-300 border border-violet-500/30' : 'bg-violet-50 text-violet-700 border border-violet-200'
                  : isDark ? 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700'
              }`}>
              {MODOS[m].label}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className={`rounded-2xl border ${card} p-6 flex flex-col gap-5 transition-colors duration-200`}>
          <div className="flex flex-col gap-2">
            <label className={lbl}>
              {config.labelA}
              {config.sufixoA && <span className={`ml-1 ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>({config.sufixoA})</span>}
            </label>
            <input type="number" value={a} placeholder={config.placeholderA}
              onChange={e => setA(e.target.value)} className={inp} />
          </div>
          <div className="flex flex-col gap-2">
            <label className={lbl}>{config.labelB}</label>
            <input type="number" value={b} placeholder={config.placeholderB}
              onChange={e => setB(e.target.value)} className={inp} />
          </div>
        </div>

        {/* Resultado */}
        {resultado !== null ? (
          <div className={`rounded-2xl border ${resultadoBg} p-6 flex flex-col items-center text-center gap-2 transition-colors duration-200`}>
            <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              {config.pergunta}
            </span>
            <span className={`text-5xl font-extrabold tabular-nums ${resultadoColor}`}>
              {isVariacao && resultado > 0 ? '+' : ''}{fmt(resultado)}
            </span>
            {isVariacao && (
              <span className={`text-xs mt-1 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                {resultado >= 0 ? 'aumento' : 'redução'} percentual
              </span>
            )}
          </div>
        ) : (
          <div className={`flex flex-col items-center justify-center text-center rounded-2xl border border-dashed p-10 transition-colors duration-200 ${isDark ? 'border-zinc-800' : 'border-zinc-300'}`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${isDark ? 'bg-violet-500/10' : 'bg-violet-50'}`}>
              <span className="text-violet-400 text-xl font-bold">%</span>
            </div>
            <p className={`text-sm ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Preencha os dois campos para calcular</p>
          </div>
        )}
      </main>
    </div>
  )
}

const ICON = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <circle cx="4.5" cy="4.5" r="2" stroke="white" strokeWidth="1.5" />
    <circle cx="11.5" cy="11.5" r="2" stroke="white" strokeWidth="1.5" />
    <path d="M3 13L13 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export default function PorcentagemApp() {
  const [modo, setModo] = useState<ModoPorcentagem>('percentual-de')
  const [a, setA] = useState('')
  const [b, setB] = useState('')

  const resultado = useMemo(() => {
    const numA = parseFloat(a.replace(',', '.'))
    const numB = parseFloat(b.replace(',', '.'))
    if (isNaN(numA) || isNaN(numB)) return null
    return calcularPorcentagem(modo, numA, numB)
  }, [modo, a, b])

  return (
    <CalcLayout title="Porcentagem" subtitle="Canivete suíço" iconBg="bg-violet-500" icon={ICON}>
      {({ isDark }) => (
        <Inner modo={modo} setModo={m => { setModo(m); setA(''); setB('') }}
          a={a} setA={setA} b={b} setB={setB}
          resultado={resultado} isDark={isDark} />
      )}
    </CalcLayout>
  )
}
