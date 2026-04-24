import type { Parametros } from '../utils/calcular'
import MoneyInput from './MoneyInput'
import InfoTooltip from './InfoTooltip'

interface Props {
  params: Parametros
  onUpdate: <K extends keyof Parametros>(key: K, value: Parametros[K]) => void
  isDark: boolean
}

function ToggleGroup<T extends string>({
  value, options, onChange, isDark,
}: {
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
  isDark: boolean
}) {
  return (
    <div className={`flex rounded-md p-[2px] gap-[2px] ${isDark ? 'bg-zinc-800/80' : 'bg-zinc-200/60'}`}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`px-2.5 py-[3px] rounded-[3px] text-[11px] font-semibold tracking-wide transition-all cursor-pointer ${
            value === o.value
              ? isDark
                ? 'bg-zinc-700 text-zinc-100 shadow-sm'
                : 'bg-white text-zinc-800 shadow-sm'
              : isDark
                ? 'text-zinc-500 hover:text-zinc-300'
                : 'text-zinc-400 hover:text-zinc-600'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function Slider({
  value, min, max, step, onChange, isDark,
}: {
  value: number; min: number; max: number; step: number
  onChange: (v: number) => void
  isDark: boolean
}) {
  const pct = Math.round(((value - min) / (max - min)) * 100)
  const track = isDark ? '#3f3f46' : '#d4d4d8'
  return (
    <input
      type="range"
      min={min} max={max} step={step} value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{ background: `linear-gradient(to right, #10b981 ${pct}%, ${track} ${pct}%)` }}
      className="w-full"
    />
  )
}

export default function Form({ params, onUpdate, isDark }: Props) {
  const periodoMax = params.periodoPeriodo === 'anos' ? 40 : 480
  const taxaMax = params.periodoTaxa === 'anual' ? 50 : 10

  const card = isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
  const title = isDark ? 'text-zinc-100' : 'text-zinc-800'
  const subtitle = isDark ? 'text-zinc-500' : 'text-zinc-400'
  const label = `text-xs font-medium uppercase tracking-wider ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`
  const input =
    `w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 transition ` +
    (isDark
      ? 'bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-600 focus:border-emerald-500 focus:ring-emerald-500/30'
      : 'bg-zinc-50 border border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-emerald-500 focus:ring-emerald-500/20')
  const footer = isDark ? 'text-zinc-600' : 'text-zinc-400'

  return (
    <div className={`rounded-2xl border ${card} p-6 flex flex-col gap-6 transition-colors duration-200`}>
      <div>
        <h1 className={`text-base font-semibold ${title}`}>Calculadora</h1>
        <p className={`text-xs ${subtitle} mt-0.5`}>Juros Compostos</p>
      </div>

      {/* Valor Inicial */}
      <div className="flex flex-col gap-2">
        <label className={label}>Valor inicial</label>
        <MoneyInput value={params.valorInicial} onChange={(v) => onUpdate('valorInicial', v)} placeholder="Ex: 10.000,00" className={input} />
        <Slider value={Math.min(params.valorInicial, 100000)} min={0} max={100000} step={500} onChange={(v) => onUpdate('valorInicial', v)} isDark={isDark} />
      </div>

      {/* Aporte Mensal */}
      <div className="flex flex-col gap-2">
        <label className={label}>Aporte mensal</label>
        <MoneyInput value={params.aporteMensal} onChange={(v) => onUpdate('aporteMensal', v)} placeholder="Ex: 500,00" className={input} />
        <Slider value={Math.min(params.aporteMensal, 10000)} min={0} max={10000} step={100} onChange={(v) => onUpdate('aporteMensal', v)} isDark={isDark} />
      </div>

      {/* Período */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <label className={label}>Período</label>
          <ToggleGroup
            isDark={isDark}
            value={params.periodoPeriodo}
            options={[{ value: 'meses', label: 'Meses' }, { value: 'anos', label: 'Anos' }]}
            onChange={(v) => onUpdate('periodoPeriodo', v)}
          />
        </div>
        <input
          type="number"
          min={0}
          value={params.quantidade || ''}
          placeholder="Ex: 24"
          onChange={(e) => onUpdate('quantidade', Math.max(0, parseInt(e.target.value) || 0))}
          className={input}
        />
        <Slider value={Math.min(params.quantidade, periodoMax)} min={1} max={periodoMax} step={1} onChange={(v) => onUpdate('quantidade', v)} isDark={isDark} />
      </div>

      {/* Taxa */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center">
            <label className={label}>Taxa de juros</label>
            <InfoTooltip isDark={isDark} text="Taxa Mensal: aplica a mesma porcentagem todo mês. Taxa Anual: é convertida para mensal via (1+a)^(1/12)−1." />
          </div>
          <ToggleGroup
            isDark={isDark}
            value={params.periodoTaxa}
            options={[{ value: 'mensal', label: 'Mensal' }, { value: 'anual', label: 'Anual' }]}
            onChange={(v) => onUpdate('periodoTaxa', v)}
          />
        </div>
        <input
          type="number"
          min={0}
          step={0.01}
          value={params.taxaInput || ''}
          placeholder="Ex: 1,5"
          onChange={(e) => onUpdate('taxaInput', parseFloat(e.target.value) || 0)}
          className={input}
        />
        <Slider value={Math.min(params.taxaInput, taxaMax)} min={0} max={taxaMax} step={0.1} onChange={(v) => onUpdate('taxaInput', parseFloat(v.toFixed(2)))} isDark={isDark} />
      </div>

      <p className={`text-xs ${footer} text-center`}>Os resultados atualizam em tempo real</p>
    </div>
  )
}
