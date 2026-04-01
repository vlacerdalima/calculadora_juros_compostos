import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import type { PontoMensal } from '../utils/calcular'
import { formatarReais } from '../utils/calcular'

interface Props {
  dados: PontoMensal[]
}

interface TooltipProps {
  active?: boolean
  payload?: Array<{ payload: PontoMensal }>
  label?: number
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload || payload.length === 0) return null

  const ponto = payload[0]?.payload
  if (!ponto) return null

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 text-sm min-w-[200px]">
      <p className="font-semibold text-gray-700 mb-2">Mês {ponto.mes}</p>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between gap-4">
          <span className="text-gray-500">Total aportado</span>
          <span className="font-medium text-blue-600">{formatarReais(ponto.totalAportado)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-500">Juros acumulados</span>
          <span className="font-medium text-emerald-600">{formatarReais(ponto.totalJuros)}</span>
        </div>
        <div className="border-t border-gray-100 mt-1 pt-1 flex justify-between gap-4">
          <span className="text-gray-700 font-medium">Saldo total</span>
          <span className="font-bold text-gray-800">{formatarReais(ponto.saldoTotal)}</span>
        </div>
      </div>
    </div>
  )
}

function formatarEixoY(valor: number): string {
  if (valor >= 1_000_000) return `R$${(valor / 1_000_000).toFixed(1)}M`
  if (valor >= 1_000) return `R$${(valor / 1_000).toFixed(0)}k`
  return `R$${valor.toFixed(0)}`
}

export default function Chart({ dados }: Props) {
  if (dados.length === 0) return null

  const ultimo = dados[dados.length - 1]!

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-6">
      <div className="flex flex-wrap gap-4 justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-700">Evolução do patrimônio</h2>
        <div className="flex gap-6 text-sm">
          <div className="flex flex-col">
            <span className="text-gray-500">Saldo final</span>
            <span className="font-bold text-gray-800 text-base">{formatarReais(ultimo.saldoTotal)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Total aportado</span>
            <span className="font-semibold text-blue-600">{formatarReais(ultimo.totalAportado)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Total em juros</span>
            <span className="font-semibold text-emerald-600">{formatarReais(ultimo.totalJuros)}</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={380}>
        <LineChart data={dados} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="mes"
            label={{ value: 'Mês', position: 'insideBottomRight', offset: -8, fontSize: 12, fill: '#9ca3af' }}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
          />
          <YAxis
            tickFormatter={formatarEixoY}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            width={64}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => value === 'saldoTotal' ? 'Saldo total' : value === 'totalAportado' ? 'Total aportado' : 'Juros'}
            wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
          />
          <Line
            type="monotone"
            dataKey="saldoTotal"
            stroke="#10b981"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }}
            activeDot={{ r: 7, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
            name="saldoTotal"
          />
          <Line
            type="monotone"
            dataKey="totalAportado"
            stroke="#3b82f6"
            strokeWidth={2}
            strokeDasharray="5 4"
            dot={{ r: 3, fill: '#3b82f6', strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
            name="totalAportado"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
