'use client'

import { useState, useMemo } from 'react'
import CalcLayout from '@/components/CalcLayout'
import MoneyInput from '@/components/MoneyInput'
import { calcularSalario, type ResultadoSalario } from '@/utils/salario'
import { formatarReais } from '@/utils/calcular'

interface InnerProps {
  bruto: number; setBruto: (v: number) => void
  dependentes: number; setDependentes: (v: number) => void
  outros: number; setOutros: (v: number) => void
  resultado: ResultadoSalario | null
  isDark: boolean
}

function DetalheRow({ label, valor, color, isDark, isMinus }: {
  label: string; valor: number; color?: string; isDark: boolean; isMinus?: boolean
}) {
  const txt = color ?? (isDark ? 'text-zinc-200' : 'text-zinc-700')
  const lbl = isDark ? 'text-zinc-400' : 'text-zinc-500'
  return (
    <div className={`flex items-center justify-between py-2.5 ${isDark ? 'border-zinc-800' : 'border-zinc-100'} border-b last:border-b-0`}>
      <span className={`text-sm ${lbl}`}>{label}</span>
      <span className={`text-sm tabular-nums font-semibold ${txt}`}>
        {isMinus && valor > 0 ? '−' : ''}{formatarReais(valor)}
      </span>
    </div>
  )
}

function Inner({ bruto, setBruto, dependentes, setDependentes, outros, setOutros, resultado, isDark }: InnerProps) {
  const card = isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
  const lbl = `text-xs font-medium uppercase tracking-wider ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`
  const inp = `w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 transition ${
    isDark
      ? 'bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-600 focus:border-amber-500 focus:ring-amber-500/30'
      : 'bg-zinc-50 border border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-amber-500 focus:ring-amber-500/20'
  }`

  return (
    <div className={`${isDark ? 'bg-zinc-950' : 'bg-zinc-100'} transition-colors duration-200`}>
      <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6 items-start">
        {/* Form */}
        <div className="w-full lg:w-80 shrink-0">
          <div className={`rounded-2xl border ${card} p-6 flex flex-col gap-6 transition-colors duration-200`}>
            <div>
              <h1 className={`text-base font-semibold ${isDark ? 'text-zinc-100' : 'text-zinc-800'}`}>Calculadora</h1>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Salário Líquido — tabelas 2024</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className={lbl}>Salário bruto</label>
              <MoneyInput value={bruto} onChange={setBruto} placeholder="Ex: 5.000,00" className={inp} />
            </div>

            <div className="flex flex-col gap-2">
              <label className={lbl}>Dependentes</label>
              <input type="number" min={0} max={20} value={dependentes || ''} placeholder="0"
                onChange={e => setDependentes(Math.max(0, parseInt(e.target.value) || 0))}
                className={inp} />
              <p className={`text-xs ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>Deduz R$ 189,59 por dependente da base do IRRF</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className={lbl}>Outros descontos</label>
              <MoneyInput value={outros} onChange={setOutros} placeholder="Ex: 200,00" className={inp} />
              <p className={`text-xs ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>VT, VR, plano de saúde, previdência, etc.</p>
            </div>

            <p className={`text-xs ${isDark ? 'text-zinc-600' : 'text-zinc-400'} text-center`}>Resultados em tempo real</p>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {resultado ? (
            <>
              {/* Hero */}
              <div className={`rounded-2xl border p-6 flex flex-col gap-1 transition-colors duration-200 ${isDark ? 'bg-amber-500/10 border-amber-500/20' : 'bg-amber-50 border-amber-200'}`}>
                <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>Salário Líquido</span>
                <span className={`text-4xl font-extrabold tabular-nums ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>{formatarReais(resultado.salarioLiquido)}</span>
                <span className={`text-xs mt-1 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  {resultado.salarioBruto > 0
                    ? `${((resultado.salarioLiquido / resultado.salarioBruto) * 100).toFixed(1)}% do salário bruto`
                    : 'do salário bruto'}
                </span>
              </div>

              {/* Breakdown */}
              <div className={`rounded-2xl border ${card} p-6 flex flex-col gap-1 transition-colors duration-200`}>
                <h2 className={`text-sm font-semibold uppercase tracking-widest mb-3 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Detalhamento</h2>
                <DetalheRow label="Salário Bruto" valor={resultado.salarioBruto} color={isDark ? 'text-zinc-100' : 'text-zinc-800'} isDark={isDark} />
                <DetalheRow label="INSS (tabela progressiva)" valor={resultado.inss} color="text-red-400" isDark={isDark} isMinus />
                {resultado.deducaoDependentes > 0 && (
                  <DetalheRow label={`Dedução dependentes (${Math.round(resultado.deducaoDependentes / 189.59)})`} valor={resultado.deducaoDependentes} color={isDark ? 'text-zinc-400' : 'text-zinc-500'} isDark={isDark} isMinus />
                )}
                <div className={`flex items-center justify-between py-2.5 ${isDark ? 'border-zinc-800' : 'border-zinc-100'} border-b`}>
                  <span className={`text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Base de cálculo IRRF</span>
                  <span className={`text-xs tabular-nums ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>{formatarReais(resultado.baseIRRF)}</span>
                </div>
                <DetalheRow label="IRRF (tabela progressiva)" valor={resultado.irrf} color="text-red-400" isDark={isDark} isMinus />
                {resultado.outrosDescontos > 0 && (
                  <DetalheRow label="Outros descontos" valor={resultado.outrosDescontos} color="text-red-400" isDark={isDark} isMinus />
                )}
                <div className={`flex items-center justify-between pt-3 mt-1`}>
                  <span className={`text-sm font-semibold ${isDark ? 'text-zinc-200' : 'text-zinc-700'}`}>Total de descontos</span>
                  <span className="text-sm tabular-nums font-bold text-red-400">−{formatarReais(resultado.totalDescontos)}</span>
                </div>
              </div>
            </>
          ) : (
            <div className={`flex-1 flex flex-col items-center justify-center text-center rounded-2xl border border-dashed p-16 min-h-[420px] transition-colors duration-200 ${isDark ? 'border-zinc-800' : 'border-zinc-300'}`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${isDark ? 'bg-amber-500/10' : 'bg-amber-50'}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-amber-500">
                  <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M8 14h2M14 14h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className={`text-base font-semibold mb-2 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>Seu holerite aparece aqui</h3>
              <p className={`text-sm max-w-xs leading-relaxed ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Informe o salário bruto para calcular os descontos</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

const ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="6" width="18" height="13" rx="2" stroke="white" strokeWidth="2" />
    <path d="M3 10h18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 14h2M14 14h2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export default function SalarioApp() {
  const [bruto, setBruto] = useState(0)
  const [dependentes, setDependentes] = useState(0)
  const [outros, setOutros] = useState(0)

  const resultado = useMemo(
    () => bruto > 0 ? calcularSalario(bruto, dependentes, outros) : null,
    [bruto, dependentes, outros]
  )

  return (
    <CalcLayout title="Salário Líquido" subtitle="INSS + IRRF 2024" iconBg="bg-amber-500" icon={ICON}>
      {({ isDark }) => (
        <Inner bruto={bruto} setBruto={setBruto}
          dependentes={dependentes} setDependentes={setDependentes}
          outros={outros} setOutros={setOutros}
          resultado={resultado} isDark={isDark} />
      )}
    </CalcLayout>
  )
}
