'use client'

import { useState, useMemo } from 'react'
import CalcLayout from '@/components/CalcLayout'
import MoneyInput from '@/components/MoneyInput'
import { calcularFinanciamento, type ParamsFinanciamento, type ParcelaFinanciamento } from '@/utils/financiamento'
import { formatarReais } from '@/utils/calcular'

function ToggleGroup<T extends string>({ value, options, onChange, isDark, accent }: {
  value: T; options: { value: T; label: string }[]; onChange: (v: T) => void; isDark: boolean; accent?: string
}) {
  return (
    <div className={`flex rounded-md p-[2px] gap-[2px] ${isDark ? 'bg-zinc-800/80' : 'bg-zinc-200/60'}`}>
      {options.map((o) => (
        <button key={o.value} type="button" onClick={() => onChange(o.value)}
          className={`px-2.5 py-[3px] rounded-[3px] text-[11px] font-semibold tracking-wide transition-all cursor-pointer ${
            value === o.value
              ? isDark ? 'bg-zinc-700 text-zinc-100 shadow-sm' : 'bg-white text-zinc-800 shadow-sm'
              : isDark ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-400 hover:text-zinc-600'
          }`}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

function Slider({ value, min, max, step, onChange, isDark }: {
  value: number; min: number; max: number; step: number; onChange: (v: number) => void; isDark: boolean
}) {
  const clamped = Math.min(Math.max(value, min), max)
  const pct = max > min ? Math.round(((clamped - min) / (max - min)) * 100) : 0
  return (
    <input type="range" min={min} max={max} step={step} value={clamped}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{ background: `linear-gradient(to right, #f97316 ${pct}%, ${isDark ? '#3f3f46' : '#d4d4d8'} ${pct}%)` }}
      className="w-full" />
  )
}

interface InnerProps {
  params: ParamsFinanciamento
  setParams: (fn: (p: ParamsFinanciamento) => ParamsFinanciamento) => void
  showAll: boolean
  setShowAll: (fn: (v: boolean) => boolean) => void
  resultado: ReturnType<typeof calcularFinanciamento>
  isDark: boolean
}

function Inner({ params, setParams, showAll, setShowAll, resultado, isDark }: InnerProps) {
  function set<K extends keyof ParamsFinanciamento>(k: K, v: ParamsFinanciamento[K]) {
    setParams(prev => ({ ...prev, [k]: v }))
  }

  const card = isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
  const lbl = `text-xs font-medium uppercase tracking-wider ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`
  const inp = `w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 transition ${
    isDark
      ? 'bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-600 focus:border-orange-500 focus:ring-orange-500/30'
      : 'bg-zinc-50 border border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-orange-500 focus:ring-orange-500/20'
  }`
  const headBorder = isDark ? 'border-zinc-800' : 'border-zinc-200'
  const th = `text-xs font-medium uppercase tracking-wider text-right first:text-left px-4 py-3 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`
  const rowBorder = isDark ? 'border-zinc-800/50' : 'border-zinc-100'
  const rowHover = isDark ? 'hover:bg-zinc-800/30' : 'hover:bg-zinc-50'
  const tdBase = `text-sm tabular-nums text-right px-4 py-3 ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`
  const stickyBg = isDark ? 'bg-zinc-900/95' : 'bg-white/95'

  const parcelas: ParcelaFinanciamento[] = resultado?.parcelas ?? []
  const exibidas = showAll ? parcelas : parcelas.slice(0, 24)

  return (
    <div className={`${isDark ? 'bg-zinc-950' : 'bg-zinc-100'} transition-colors duration-200`}>
      <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6 items-start">
        {/* Form */}
        <div className="w-full lg:w-80 shrink-0">
          <div className={`rounded-2xl border ${card} p-6 flex flex-col gap-6 transition-colors duration-200`}>
            <div>
              <h1 className={`text-base font-semibold ${isDark ? 'text-zinc-100' : 'text-zinc-800'}`}>Calculadora</h1>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Financiamento SAC / PRICE</p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className={lbl}>Sistema</label>
                <ToggleGroup isDark={isDark} value={params.sistema}
                  options={[{ value: 'PRICE', label: 'PRICE' }, { value: 'SAC', label: 'SAC' }]}
                  onChange={v => set('sistema', v)} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className={lbl}>Valor total</label>
              <MoneyInput value={params.valorTotal} onChange={v => set('valorTotal', v)} placeholder="Ex: 500.000,00" className={inp} />
              <Slider value={params.valorTotal} min={0} max={2000000} step={10000} onChange={v => set('valorTotal', v)} isDark={isDark} />
            </div>

            <div className="flex flex-col gap-2">
              <label className={lbl}>Entrada</label>
              <MoneyInput value={params.entrada} onChange={v => set('entrada', v)} placeholder="Ex: 100.000,00" className={inp} />
              <Slider value={params.entrada} min={0} max={Math.max(params.valorTotal, 1)} step={5000} onChange={v => set('entrada', v)} isDark={isDark} />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className={lbl}>Taxa de juros</label>
                <ToggleGroup isDark={isDark} value={params.periodoTaxa}
                  options={[{ value: 'mensal', label: 'Mensal' }, { value: 'anual', label: 'Anual' }]}
                  onChange={v => set('periodoTaxa', v)} />
              </div>
              <input type="number" min={0} step={0.01} value={params.taxaInput || ''}
                placeholder={params.periodoTaxa === 'mensal' ? 'Ex: 0,8' : 'Ex: 10'}
                onChange={e => set('taxaInput', parseFloat(e.target.value) || 0)}
                className={inp} />
              <Slider value={params.taxaInput} min={0} max={params.periodoTaxa === 'anual' ? 30 : 3}
                step={0.01} onChange={v => set('taxaInput', parseFloat(v.toFixed(2)))} isDark={isDark} />
            </div>

            <div className="flex flex-col gap-2">
              <label className={lbl}>Prazo (meses)</label>
              <input type="number" min={1} value={params.prazoMeses || ''}
                placeholder="Ex: 360"
                onChange={e => set('prazoMeses', Math.max(0, parseInt(e.target.value) || 0))}
                className={inp} />
              <Slider value={params.prazoMeses} min={1} max={420} step={1} onChange={v => set('prazoMeses', v)} isDark={isDark} />
            </div>

            <p className={`text-xs ${isDark ? 'text-zinc-600' : 'text-zinc-400'} text-center`}>Resultados em tempo real</p>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {resultado ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className={`col-span-2 sm:col-span-1 rounded-2xl border p-5 flex flex-col gap-1 transition-colors duration-200 ${isDark ? 'bg-orange-500/10 border-orange-500/20' : 'bg-orange-50 border-orange-200'}`}>
                  <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>1ª Parcela</span>
                  <span className={`text-3xl font-bold tabular-nums ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>{formatarReais(resultado.primeiraParcela)}</span>
                  <span className={`text-xs mt-0.5 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>{params.sistema === 'PRICE' ? 'valor fixo' : 'maior parcela'}</span>
                </div>
                <div className={`rounded-2xl border ${card} p-5 flex flex-col gap-1`}>
                  <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Última Parcela</span>
                  <span className={`text-xl font-bold tabular-nums ${isDark ? 'text-zinc-200' : 'text-zinc-700'}`}>{formatarReais(resultado.ultimaParcela)}</span>
                </div>
                <div className={`rounded-2xl border ${card} p-5 flex flex-col gap-1`}>
                  <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Total em Juros</span>
                  <span className="text-xl font-bold tabular-nums text-red-400">{formatarReais(resultado.totalJuros)}</span>
                </div>
                <div className={`rounded-2xl border ${card} p-5 flex flex-col gap-1`}>
                  <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Custo Total</span>
                  <span className={`text-xl font-bold tabular-nums ${isDark ? 'text-zinc-200' : 'text-zinc-700'}`}>{formatarReais(resultado.custoTotal)}</span>
                </div>
              </div>

              <div className={`rounded-2xl border ${card} overflow-hidden transition-colors duration-200`}>
                <div className={`flex items-center justify-between px-6 py-4 border-b ${headBorder}`}>
                  <h2 className={`text-sm font-semibold uppercase tracking-widest ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Tabela de Parcelas</h2>
                  <span className={`text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>{params.sistema}</span>
                </div>
                <div className="overflow-auto max-h-72">
                  <table className="w-full">
                    <thead className={`sticky top-0 ${stickyBg} backdrop-blur-sm`}>
                      <tr className={`border-b ${headBorder}`}>
                        <th className={th}>Nº</th>
                        <th className={th}>Saldo</th>
                        <th className={th}>Amort.</th>
                        <th className={th}>Juros</th>
                        <th className={th}>Parcela</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exibidas.map((p) => (
                        <tr key={p.numero} className={`border-b ${rowBorder} ${rowHover} transition-colors`}>
                          <td className={`text-sm px-4 py-3 font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>{p.numero}</td>
                          <td className={tdBase}>{formatarReais(p.saldoDevedor)}</td>
                          <td className="text-sm tabular-nums text-right px-4 py-3 text-orange-400">{formatarReais(p.amortizacao)}</td>
                          <td className="text-sm tabular-nums text-right px-4 py-3 text-red-400">{formatarReais(p.juros)}</td>
                          <td className={`text-sm tabular-nums text-right px-4 py-3 font-semibold ${isDark ? 'text-zinc-100' : 'text-zinc-800'}`}>{formatarReais(p.parcela)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {parcelas.length > 24 && (
                  <div className={`border-t ${headBorder} px-6 py-3 flex justify-center`}>
                    <button onClick={() => setShowAll(v => !v)}
                      className={`text-xs font-medium cursor-pointer transition-colors ${isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-500 hover:text-zinc-700'}`}>
                      {showAll ? 'Mostrar menos' : `Ver todas as ${parcelas.length} parcelas`}
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className={`flex-1 flex flex-col items-center justify-center text-center rounded-2xl border border-dashed p-16 min-h-[420px] transition-colors duration-200 ${isDark ? 'border-zinc-800' : 'border-zinc-300'}`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${isDark ? 'bg-orange-500/10' : 'bg-orange-50'}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-orange-500">
                  <path d="M3 21V9l9-6 9 6v12H3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <rect x="8" y="13" width="3" height="8" rx="1" fill="currentColor" opacity="0.4" />
                  <rect x="13" y="13" width="3" height="8" rx="1" fill="currentColor" opacity="0.4" />
                </svg>
              </div>
              <h3 className={`text-base font-semibold mb-2 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>Sua simulação aparece aqui</h3>
              <p className={`text-sm max-w-xs leading-relaxed ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Preencha os campos ao lado para simular seu financiamento</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

const ICON = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M2 14V6l6-4 6 4v8H2z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
    <rect x="5" y="9" width="2.5" height="5" rx="0.5" fill="white" />
    <rect x="8.5" y="9" width="2.5" height="5" rx="0.5" fill="white" />
  </svg>
)

export default function FinanciamentoApp() {
  const [params, setParams] = useState<ParamsFinanciamento>({
    valorTotal: 0, entrada: 0, taxaInput: 0,
    periodoTaxa: 'mensal', prazoMeses: 0, sistema: 'PRICE',
  })
  const [showAll, setShowAll] = useState(false)
  const resultado = useMemo(() => calcularFinanciamento(params), [params])

  return (
    <CalcLayout title="Financiamento" subtitle="SAC / PRICE" iconBg="bg-orange-500" icon={ICON}>
      {({ isDark }) => (
        <Inner
          params={params}
          setParams={setParams}
          showAll={showAll}
          setShowAll={setShowAll}
          resultado={resultado}
          isDark={isDark}
        />
      )}
    </CalcLayout>
  )
}
