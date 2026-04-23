import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import type { PontoMensal } from '../utils/calcular'
import { formatarReais } from '../utils/calcular'

interface Props {
  dados: PontoMensal[]
  isDark: boolean
}

interface TooltipProps {
  active?: boolean
  payload?: Array<{ payload: PontoMensal }>
  isDark: boolean
}

function CustomTooltip({ active, payload, isDark }: TooltipProps) {
  if (!active || !payload?.length) return null
  const p = payload[0]!.payload

  const wrap = isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-zinc-200'
  const heading = isDark ? 'text-zinc-400' : 'text-zinc-500'
  const sub = isDark ? 'text-zinc-500' : 'text-zinc-400'
  const mid = isDark ? 'text-zinc-300' : 'text-zinc-600'
  const divider = isDark ? 'border-zinc-800' : 'border-zinc-100'

  return (
    <div className={`border rounded-xl shadow-2xl p-4 text-sm min-w-[210px] ${wrap}`}>
      <p className={`font-medium mb-3 text-xs uppercase tracking-wider ${heading}`}>Mês {p.mes}</p>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-6">
          <span className={`text-xs ${sub}`}>Investido</span>
          <span className={`font-medium tabular-nums text-xs ${mid}`}>{formatarReais(p.totalAportado)}</span>
        </div>
        <div className="flex justify-between gap-6">
          <span className={`text-xs ${sub}`}>Juros</span>
          <span className="font-medium text-indigo-400 tabular-nums text-xs">{formatarReais(p.totalJuros)}</span>
        </div>
        <div className={`border-t ${divider} pt-2 flex justify-between gap-6`}>
          <span className={`text-xs font-medium ${mid}`}>Saldo</span>
          <span className="font-bold text-emerald-400 tabular-nums text-xs">{formatarReais(p.saldoTotal)}</span>
        </div>
      </div>
    </div>
  )
}

function formatY(v: number): string {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`
  if (v >= 1_000) return `${(v / 1_000).toFixed(0)}k`
  return String(Math.round(v))
}

const LEGEND_LABELS: Record<string, string> = {
  totalAportado: 'Total Investido',
  totalJuros: 'Juros Acumulados',
}

export default function Chart({ dados, isDark }: Props) {
  if (dados.length === 0) return null

  const gridColor = isDark ? '#27272a' : '#e4e4e7'
  const tickColor = isDark ? '#52525b' : '#a1a1aa'
  const legendColor = isDark ? '#71717a' : '#a1a1aa'
  const card = isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
  const heading = isDark ? 'text-zinc-400' : 'text-zinc-500'
  const tickInterval = dados.length > 60 ? Math.ceil(dados.length / 12) - 1 : dados.length > 24 ? 5 : 2

  return (
    <div className={`rounded-2xl border ${card} p-6 flex flex-col gap-4 transition-colors duration-200`}>
      <h2 className={`text-sm font-semibold uppercase tracking-widest ${heading}`}>Evolução</h2>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={dados} margin={{ top: 4, right: 4, left: 0, bottom: 4 }}>
          <defs>
            <linearGradient id="gradAportado" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={isDark ? 0.25 : 0.15} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="gradJuros" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={isDark ? 0.35 : 0.2} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="mes" tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} interval={tickInterval} tickFormatter={(v) => `${v}m`} />
          <YAxis tickFormatter={formatY} tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} width={48} />
          <Tooltip
            content={(props) => (
              <CustomTooltip
                active={props.active}
                payload={props.payload as Array<{ payload: PontoMensal }> | undefined}
                isDark={isDark}
              />
            )}
            cursor={{ stroke: isDark ? '#3f3f46' : '#d4d4d8', strokeWidth: 1 }}
          />
          <Legend formatter={(v) => LEGEND_LABELS[v] ?? v} wrapperStyle={{ fontSize: 12, color: legendColor, paddingTop: 12 }} />
          <Area type="monotone" dataKey="totalAportado" stackId="s" stroke="#6366f1" strokeWidth={2} fill="url(#gradAportado)" dot={false} activeDot={{ r: 5, fill: '#6366f1', strokeWidth: 0 }} />
          <Area type="monotone" dataKey="totalJuros" stackId="s" stroke="#10b981" strokeWidth={2} fill="url(#gradJuros)" dot={false} activeDot={{ r: 5, fill: '#10b981', strokeWidth: 0 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
