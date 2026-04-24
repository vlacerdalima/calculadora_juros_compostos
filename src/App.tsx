import { useState, useMemo, useCallback, useEffect } from 'react'
import Form from './components/Form'
import Chart from './components/Chart'
import SummaryCards from './components/SummaryCards'
import BreakdownTable from './components/BreakdownTable'
import { calcularJurosCompostos } from './utils/calcular'
import type { Parametros } from './utils/calcular'

const DEFAULT_PARAMS: Parametros = {
  valorInicial: 0,
  aporteMensal: 0,
  taxaInput: 0,
  periodoTaxa: 'mensal',
  quantidade: 0,
  periodoPeriodo: 'meses',
}

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

export default function App() {
  const [params, setParams] = useState<Parametros>(DEFAULT_PARAMS)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    document.documentElement.style.backgroundColor = isDark ? '#09090b' : '#f4f4f5'
  }, [isDark])

  const dados = useMemo(() => calcularJurosCompostos(params), [params])

  const handleUpdate = useCallback(<K extends keyof Parametros>(key: K, value: Parametros[K]) => {
    setParams((prev) => ({ ...prev, [key]: value }))
  }, [])

  const bg = isDark ? 'bg-zinc-950' : 'bg-zinc-100'
  const headerBorder = isDark ? 'border-zinc-800/60' : 'border-zinc-200'
  const headerText = isDark ? 'text-zinc-300' : 'text-zinc-700'
  const themeBtnWrap = isDark ? 'bg-zinc-800/80' : 'bg-zinc-200/70'

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-200`}>
      {/* Header */}
      <header className={`border-b ${headerBorder} px-6 py-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M2 12 L6 8 L9 10 L14 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className={`text-sm font-semibold ${headerText} tracking-tight`}>Juros Compostos</span>
        </div>

        {/* Theme toggle */}
        <div className={`flex rounded-lg ${themeBtnWrap} p-[3px] gap-[2px]`}>
          <button
            onClick={() => setIsDark(false)}
            title="Modo claro"
            className={`p-1.5 rounded-md transition-all cursor-pointer ${
              !isDark
                ? 'bg-white text-zinc-700 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <SunIcon />
          </button>
          <button
            onClick={() => setIsDark(true)}
            title="Modo escuro"
            className={`p-1.5 rounded-md transition-all cursor-pointer ${
              isDark
                ? 'bg-zinc-700 text-zinc-100 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-600'
            }`}
          >
            <MoonIcon />
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6 items-start">
        <div className="w-full lg:w-80 shrink-0">
          <Form params={params} onUpdate={handleUpdate} isDark={isDark} />
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {dados.length > 0 ? (
            <>
              <SummaryCards dados={dados} isDark={isDark} />
              <Chart dados={dados} isDark={isDark} />
              <BreakdownTable dados={dados} isDark={isDark} />
            </>
          ) : (
            <div className={`flex-1 flex flex-col items-center justify-center text-center rounded-2xl border border-dashed p-16 min-h-[420px] transition-colors duration-200 ${
              isDark ? 'border-zinc-800' : 'border-zinc-300'
            }`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
                isDark ? 'bg-emerald-500/10' : 'bg-emerald-50'
              }`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-emerald-500">
                  <path d="M3 17L8 12L12 15L17 9L21 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 7h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                  <path d="M3 21h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                </svg>
              </div>
              <h3 className={`text-base font-semibold mb-2 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                Sua projeção aparece aqui
              </h3>
              <p className={`text-sm max-w-xs leading-relaxed ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                Preencha os campos ao lado para visualizar o crescimento do seu investimento ao longo do tempo
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
