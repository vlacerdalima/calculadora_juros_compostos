'use client'

import { useState, useMemo } from 'react'
import CalcLayout from '@/components/CalcLayout'
import MoneyInput from '@/components/MoneyInput'
import { calcularROI } from '@/utils/roi'
import { formatarReais } from '@/utils/calcular'

interface InnerProps {
  investimento: number; setInvestimento: (v: number) => void
  receita: number; setReceita: (v: number) => void
  resultado: ReturnType<typeof calcularROI>
  isDark: boolean
}

function Inner({ investimento, setInvestimento, receita, setReceita, resultado, isDark }: InnerProps) {
  const card = isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
  const lbl = `text-xs font-medium uppercase tracking-wider ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`
  const inp = `w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 transition ${
    isDark
      ? 'bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-600 focus:border-indigo-500 focus:ring-indigo-500/30'
      : 'bg-zinc-50 border border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-indigo-500 focus:ring-indigo-500/20'
  }`

  const isPositivo = resultado !== null && resultado.roi >= 0
  const roiColor = !resultado ? 'text-indigo-400'
    : isPositivo ? 'text-emerald-400' : 'text-red-400'
  const roiBg = !resultado ? ''
    : isPositivo
      ? (isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200')
      : (isDark ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-200')

  return (
    <div className={`${isDark ? 'bg-zinc-950' : 'bg-zinc-100'} transition-colors duration-200`}>
      <main className="max-w-xl mx-auto px-4 py-8 flex flex-col gap-6">
        {/* Form */}
        <div className={`rounded-2xl border ${card} p-6 flex flex-col gap-5 transition-colors duration-200`}>
          <div>
            <h1 className={`text-base font-semibold ${isDark ? 'text-zinc-100' : 'text-zinc-800'}`}>Calculadora de ROI</h1>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Retorno sobre Investimento</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className={lbl}>Valor investido</label>
            <MoneyInput value={investimento} onChange={setInvestimento} placeholder="Ex: 10.000,00" className={inp} />
          </div>

          <div className="flex flex-col gap-2">
            <label className={lbl}>Receita total retornada</label>
            <MoneyInput value={receita} onChange={setReceita} placeholder="Ex: 15.000,00" className={inp} />
            <p className={`text-xs ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>Valor total recebido, incluindo o capital investido</p>
          </div>
        </div>

        {/* Result */}
        {resultado ? (
          <>
            <div className={`rounded-2xl border ${roiBg} p-6 flex flex-col items-center text-center gap-2 transition-colors duration-200`}>
              <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>ROI</span>
              <span className={`text-6xl font-extrabold tabular-nums ${roiColor}`}>
                {resultado.roi >= 0 ? '+' : ''}{resultado.roi.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%
              </span>
              <span className={`text-xs mt-1 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                {isPositivo ? 'retorno positivo' : 'retorno negativo'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className={`rounded-2xl border ${card} p-5 flex flex-col gap-1`}>
                <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Lucro Líquido</span>
                <span className={`text-xl font-bold tabular-nums ${resultado.lucro >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {resultado.lucro >= 0 ? '+' : ''}{formatarReais(resultado.lucro)}
                </span>
              </div>
              <div className={`rounded-2xl border ${card} p-5 flex flex-col gap-1`}>
                <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Investimento</span>
                <span className={`text-xl font-bold tabular-nums ${isDark ? 'text-zinc-200' : 'text-zinc-700'}`}>{formatarReais(resultado.investimento)}</span>
              </div>
            </div>
          </>
        ) : (
          <div className={`flex flex-col items-center justify-center text-center rounded-2xl border border-dashed p-10 transition-colors duration-200 ${isDark ? 'border-zinc-800' : 'border-zinc-300'}`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-50'}`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-indigo-400">
                <path d="M3 17L8 12L12 15L17 9L21 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className={`text-sm ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Preencha os campos para calcular o ROI</p>
          </div>
        )}
      </main>
    </div>
  )
}

const ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M3 17L8 12L12 15L17 9L21 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function RoiApp() {
  const [investimento, setInvestimento] = useState(0)
  const [receita, setReceita] = useState(0)
  const resultado = useMemo(() => calcularROI(investimento, receita), [investimento, receita])

  return (
    <CalcLayout title="ROI" subtitle="Retorno sobre Investimento" iconBg="bg-indigo-500" icon={ICON}>
      {({ isDark }) => (
        <Inner investimento={investimento} setInvestimento={setInvestimento}
          receita={receita} setReceita={setReceita}
          resultado={resultado} isDark={isDark} />
      )}
    </CalcLayout>
  )
}
