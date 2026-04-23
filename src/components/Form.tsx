import { useState } from 'react'
import type { Parametros } from '../utils/calcular'
import MoneyInput from './MoneyInput'

interface Props {
  onCalcular: (params: Parametros) => void
}

export default function Form({ onCalcular }: Props) {
  const [valorInicial, setValorInicial] = useState('1000')
  const [aporteMensal, setAporteMensal] = useState('200')
  const [quantidade, setQuantidade] = useState('12')
  const [periodoPeriodo, setPeriodoPeriodo] = useState<'meses' | 'anos'>('meses')
  const [taxaInput, setTaxaInput] = useState('1')
  const [periodoTaxa, setPeriodoTaxa] = useState<'mensal' | 'anual'>('mensal')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onCalcular({
      valorInicial: parseFloat(valorInicial) || 0,
      aporteMensal: parseFloat(aporteMensal) || 0,
      taxaInput: parseFloat(taxaInput) || 0,
      periodoTaxa,
      quantidade: parseInt(quantidade) || 1,
      periodoPeriodo,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-5">
      <h2 className="text-lg font-semibold text-gray-700">Parâmetros</h2>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">Valor inicial (R$)</label>
        <MoneyInput
          value={valorInicial}
          onChange={setValorInicial}
          className="border border-gray-200 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">Aporte mensal (R$)</label>
        <MoneyInput
          value={aporteMensal}
          onChange={setAporteMensal}
          className="border border-gray-200 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">Período</label>
        <div className="flex gap-2">
          <input
            type="number"
            min="1"
            step="1"
            value={quantidade}
            onChange={e => setQuantidade(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition flex-1"
            required
          />
          <select
            value={periodoPeriodo}
            onChange={e => setPeriodoPeriodo(e.target.value as 'meses' | 'anos')}
            className="border border-gray-200 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition bg-white"
          >
            <option value="meses">Meses</option>
            <option value="anos">Anos</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">Taxa de juros (%)</label>
        <div className="flex gap-2">
          <input
            type="number"
            min="0"
            step="0.01"
            value={taxaInput}
            onChange={e => setTaxaInput(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition flex-1"
            placeholder="0,00"
            required
          />
          <select
            value={periodoTaxa}
            onChange={e => setPeriodoTaxa(e.target.value as 'mensal' | 'anual')}
            className="border border-gray-200 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition bg-white"
          >
            <option value="mensal">Mensal</option>
            <option value="anual">Anual</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-semibold rounded-lg py-2.5 transition cursor-pointer"
      >
        Calcular
      </button>
    </form>
  )
}
