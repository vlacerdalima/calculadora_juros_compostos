'use client'

import { useState, useMemo } from 'react'
import CalcLayout from '@/components/CalcLayout'
import { calcularIMC, categoriaDeIMC, CATEGORIAS } from '@/utils/imc'

function Slider({ value, min, max, step, onChange, isDark }: {
  value: number; min: number; max: number; step: number; onChange: (v: number) => void; isDark: boolean
}) {
  const pct = max > min ? Math.round(((Math.min(value, max) - min) / (max - min)) * 100) : 0
  return (
    <input type="range" min={min} max={max} step={step} value={Math.min(value, max)}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{ background: `linear-gradient(to right, #0ea5e9 ${pct}%, ${isDark ? '#3f3f46' : '#d4d4d8'} ${pct}%)` }}
      className="w-full" />
  )
}

function ToggleGroup<T extends string>({ value, options, onChange, isDark }: {
  value: T; options: { value: T; label: string }[]; onChange: (v: T) => void; isDark: boolean
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

interface InnerProps {
  peso: number; setPeso: (v: number) => void
  alturaInput: number; setAlturaInput: (v: number) => void
  unidadeAltura: 'cm' | 'm'; setUnidadeAltura: (v: 'cm' | 'm') => void
  imc: number | null
  isDark: boolean
}

function Inner({ peso, setPeso, alturaInput, setAlturaInput, unidadeAltura, setUnidadeAltura, imc, isDark }: InnerProps) {
  const card = isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
  const lbl = `text-xs font-medium uppercase tracking-wider ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`
  const inp = `w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 transition ${
    isDark
      ? 'bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-600 focus:border-sky-500 focus:ring-sky-500/30'
      : 'bg-zinc-50 border border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-sky-500 focus:ring-sky-500/20'
  }`

  const categoria = imc !== null ? categoriaDeIMC(imc) : null
  const alturaMaxSlider = unidadeAltura === 'cm' ? 250 : 2.5
  const alturaStep = unidadeAltura === 'cm' ? 1 : 0.01

  return (
    <div className={`${isDark ? 'bg-zinc-950' : 'bg-zinc-100'} transition-colors duration-200`}>
      <main className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
        {/* Form */}
        <div className={`rounded-2xl border ${card} p-6 flex flex-col gap-6 transition-colors duration-200`}>
          <div>
            <h1 className={`text-base font-semibold ${isDark ? 'text-zinc-100' : 'text-zinc-800'}`}>Calculadora de IMC</h1>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Índice de Massa Corporal</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center h-[26px]">
                <label className={lbl}>Peso</label>
              </div>
              <div className="relative">
                <input type="number" min={1} max={300} step={0.1} value={peso || ''}
                  placeholder="Ex: 75"
                  onChange={e => setPeso(parseFloat(e.target.value) || 0)}
                  className={inp} />
                <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>kg</span>
              </div>
              <Slider value={peso} min={1} max={200} step={0.5} onChange={setPeso} isDark={isDark} />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between h-[26px]">
                <label className={lbl}>Altura</label>
                <ToggleGroup isDark={isDark} value={unidadeAltura}
                  options={[{ value: 'cm', label: 'cm' }, { value: 'm', label: 'm' }]}
                  onChange={setUnidadeAltura} />
              </div>
              <div className="relative">
                <input type="number" min={0} step={alturaStep} value={alturaInput || ''}
                  placeholder={unidadeAltura === 'cm' ? 'Ex: 175' : 'Ex: 1,75'}
                  onChange={e => setAlturaInput(parseFloat(e.target.value) || 0)}
                  className={inp} />
                <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>{unidadeAltura}</span>
              </div>
              <Slider value={alturaInput} min={0} max={alturaMaxSlider} step={alturaStep} onChange={setAlturaInput} isDark={isDark} />
            </div>
          </div>
        </div>

        {/* Result */}
        {imc !== null && categoria ? (
          <>
            <div className={`rounded-2xl border ${categoria.borderClass} ${categoria.bgClass} p-6 flex flex-col items-center text-center gap-2 transition-colors duration-200`}>
              <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Seu IMC</span>
              <span className={`text-6xl font-extrabold tabular-nums ${categoria.colorClass}`}>{imc.toFixed(1)}</span>
              <span className={`text-sm font-semibold px-3 py-1 rounded-full border ${categoria.bgClass} ${categoria.borderClass} ${categoria.colorClass}`}>
                {categoria.label}
              </span>
            </div>

            {/* Escala visual */}
            <div className={`rounded-2xl border ${card} p-6 flex flex-col gap-4 transition-colors duration-200`}>
              <h2 className={`text-sm font-semibold uppercase tracking-widest ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Tabela de Classificação</h2>
              <div className="flex flex-col gap-2">
                {CATEGORIAS.map((cat) => {
                  const isAtual = categoria.label === cat.label
                  return (
                    <div key={cat.label} className={`flex items-center justify-between rounded-xl px-4 py-2.5 transition-all ${
                      isAtual ? `${cat.bgClass} border ${cat.borderClass}` : ''
                    }`}>
                      <div className="flex items-center gap-2">
                        {isAtual && <span className={`w-2 h-2 rounded-full ${cat.colorClass.replace('text-', 'bg-')}`} />}
                        <span className={`text-sm font-medium ${isAtual ? cat.colorClass : isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                          {cat.label}
                        </span>
                      </div>
                      <span className={`text-xs tabular-nums ${isAtual ? cat.colorClass : isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>
                        {cat.max === Infinity ? `≥ ${cat.min}` : `${cat.min} – ${cat.max}`}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        ) : (
          <div className={`flex flex-col items-center justify-center text-center rounded-2xl border border-dashed p-12 transition-colors duration-200 ${isDark ? 'border-zinc-800' : 'border-zinc-300'}`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${isDark ? 'bg-sky-500/10' : 'bg-sky-50'}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-sky-500">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className={`text-base font-semibold mb-1 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>Seu resultado aparece aqui</h3>
            <p className={`text-sm ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Informe seu peso e altura acima</p>
          </div>
        )}
      </main>
    </div>
  )
}

const ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export default function ImcApp() {
  const [peso, setPeso] = useState(0)
  const [alturaInput, setAlturaInput] = useState(0)
  const [unidadeAltura, setUnidadeAltura] = useState<'cm' | 'm'>('cm')

  const alturaM = useMemo(() => {
    if (alturaInput <= 0) return 0
    return unidadeAltura === 'cm' ? alturaInput / 100 : alturaInput
  }, [alturaInput, unidadeAltura])

  const imc = useMemo(() => calcularIMC(peso, alturaM), [peso, alturaM])

  return (
    <CalcLayout title="IMC" subtitle="Índice de Massa Corporal" iconBg="bg-sky-500" icon={ICON}>
      {({ isDark }) => (
        <Inner
          peso={peso} setPeso={setPeso}
          alturaInput={alturaInput} setAlturaInput={setAlturaInput}
          unidadeAltura={unidadeAltura} setUnidadeAltura={setUnidadeAltura}
          imc={imc}
          isDark={isDark}
        />
      )}
    </CalcLayout>
  )
}
