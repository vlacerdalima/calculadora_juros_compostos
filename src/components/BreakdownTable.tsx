import { useState } from 'react'
import type { PontoMensal } from '../utils/calcular'
import { agruparPorAno, formatarReais } from '../utils/calcular'

interface Props {
  dados: PontoMensal[]
  isDark: boolean
}

type Modo = 'anual' | 'mensal'

export default function BreakdownTable({ dados, isDark }: Props) {
  const [modo, setModo] = useState<Modo>('anual')

  if (dados.length === 0) return null

  const anos = agruparPorAno(dados)

  const card = isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
  const headBorder = isDark ? 'border-zinc-800' : 'border-zinc-200'
  const heading = isDark ? 'text-zinc-400' : 'text-zinc-500'
  const toggleWrap = isDark ? 'bg-zinc-800' : 'bg-zinc-100'
  const toggleActive = isDark ? 'bg-zinc-700 text-zinc-100' : 'bg-white text-zinc-800'
  const toggleInactive = isDark ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-400 hover:text-zinc-600'
  const stickyBg = isDark ? 'bg-zinc-900/95' : 'bg-white/95'
  const th = `text-xs font-medium uppercase tracking-wider text-right first:text-left px-4 py-3 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`
  const rowBorder = isDark ? 'border-zinc-800/50' : 'border-zinc-100'
  const rowHover = isDark ? 'hover:bg-zinc-800/30' : 'hover:bg-zinc-50'
  const tdPeriodo = `text-sm px-4 py-3 font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`
  const tdValue = `text-sm tabular-nums text-right px-4 py-3 ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`

  return (
    <div className={`rounded-2xl border ${card} overflow-hidden transition-colors duration-200`}>
      <div className={`flex items-center justify-between px-6 py-4 border-b ${headBorder}`}>
        <h2 className={`text-sm font-semibold uppercase tracking-widest ${heading}`}>Detalhamento</h2>
        <div className={`flex rounded-lg ${toggleWrap} p-0.5 gap-0.5`}>
          {(['anual', 'mensal'] as Modo[]).map((m) => (
            <button
              key={m}
              onClick={() => setModo(m)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                modo === m ? toggleActive : toggleInactive
              }`}
            >
              {m === 'anual' ? 'Por Ano' : 'Por Mês'}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-auto max-h-72">
        <table className="w-full">
          <thead className={`sticky top-0 ${stickyBg} backdrop-blur-sm`}>
            <tr className={`border-b ${headBorder}`}>
              <th className={th}>{modo === 'anual' ? 'Ano' : 'Mês'}</th>
              <th className={th}>Saldo</th>
              <th className={th}>Investido</th>
              <th className={th}>Juros</th>
            </tr>
          </thead>
          <tbody>
            {modo === 'anual'
              ? anos.map((a) => (
                  <tr key={a.ano} className={`border-b ${rowBorder} ${rowHover} transition-colors`}>
                    <td className={tdPeriodo}>Ano {a.ano}</td>
                    <td className="text-sm tabular-nums text-right px-4 py-3 text-emerald-500 font-semibold">{formatarReais(a.saldoFinal)}</td>
                    <td className={tdValue}>{formatarReais(a.totalAportadoAcumulado)}</td>
                    <td className="text-sm tabular-nums text-right px-4 py-3 text-indigo-400">{formatarReais(a.totalJurosAcumulado)}</td>
                  </tr>
                ))
              : dados.map((p) => (
                  <tr key={p.mes} className={`border-b ${rowBorder} ${rowHover} transition-colors`}>
                    <td className={tdPeriodo}>Mês {p.mes}</td>
                    <td className="text-sm tabular-nums text-right px-4 py-3 text-emerald-500 font-semibold">{formatarReais(p.saldoTotal)}</td>
                    <td className={tdValue}>{formatarReais(p.totalAportado)}</td>
                    <td className="text-sm tabular-nums text-right px-4 py-3 text-indigo-400">{formatarReais(p.totalJuros)}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
