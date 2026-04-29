import { useEffect, useRef } from 'react'
import { animate } from 'framer-motion'
import type { PontoMensal } from '@/utils/calcular'
import { formatarReais } from '@/utils/calcular'

interface Props {
  dados: PontoMensal[]
  isDark: boolean
}

function AnimatedMoney({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const prevRef = useRef(value)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const from = prevRef.current
    prevRef.current = value
    const ctrl = animate(from, value, {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => { if (el) el.textContent = formatarReais(v) },
    })
    return ctrl.stop
  }, [value])
  return <span ref={ref}>{formatarReais(value)}</span>
}

function AnimatedPct({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const prevRef = useRef(value)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const from = prevRef.current
    prevRef.current = value
    const ctrl = animate(from, value, {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (el) el.textContent = v.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%'
      },
    })
    return ctrl.stop
  }, [value])
  return (
    <span ref={ref}>
      {value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%
    </span>
  )
}

export default function SummaryCards({ dados, isDark }: Props) {
  if (dados.length === 0) return null

  const ultimo = dados[dados.length - 1]!
  const rentabilidade = ultimo.totalAportado > 0 ? (ultimo.totalJuros / ultimo.totalAportado) * 100 : 0

  const card = isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
  const label = isDark ? 'text-zinc-500' : 'text-zinc-400'
  const subtext = isDark ? 'text-zinc-600' : 'text-zinc-400'
  const value2 = isDark ? 'text-zinc-200' : 'text-zinc-700'
  const heroBg = isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'
  const heroLabel = isDark ? 'text-emerald-400' : 'text-emerald-600'
  const heroSub = isDark ? 'text-zinc-500' : 'text-zinc-400'

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {/* Patrimônio Final */}
      <div className={`col-span-2 lg:col-span-2 rounded-2xl border ${heroBg} p-5 flex flex-col gap-1 transition-colors duration-200`}>
        <span className={`text-xs font-semibold ${heroLabel} uppercase tracking-widest`}>Patrimônio Final</span>
        <span className={`text-3xl font-bold ${heroLabel} tabular-nums leading-tight`}>
          <AnimatedMoney value={ultimo.saldoTotal} />
        </span>
        <span className={`text-xs ${heroSub} mt-0.5`}>ao final do período</span>
      </div>

      {/* Total Investido */}
      <div className={`rounded-2xl border ${card} p-5 flex flex-col gap-1 transition-colors duration-200`}>
        <span className={`text-xs font-semibold ${label} uppercase tracking-widest`}>Investido</span>
        <span className={`text-xl font-semibold ${value2} tabular-nums`}>
          <AnimatedMoney value={ultimo.totalAportado} />
        </span>
        <span className={`text-xs ${subtext} mt-0.5`}>capital + aportes</span>
      </div>

      {/* Juros */}
      <div className={`rounded-2xl border ${card} p-5 flex flex-col gap-1 transition-colors duration-200`}>
        <span className={`text-xs font-semibold ${label} uppercase tracking-widest`}>Juros</span>
        <span className="text-xl font-semibold text-indigo-400 tabular-nums">
          <AnimatedMoney value={ultimo.totalJuros} />
        </span>
        <span className="text-xs text-emerald-500 font-medium mt-0.5">
          +<AnimatedPct value={rentabilidade} />
        </span>
      </div>
    </div>
  )
}
