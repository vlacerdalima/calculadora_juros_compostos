export type ModoPorcentagem = 'percentual-de' | 'quanto-porcento' | 'variacao'

export interface ConfigModo {
  label: string
  labelA: string
  labelB: string
  placeholderA: string
  placeholderB: string
  sufixoA?: string
  sufixoB?: string
  pergunta: string
}

export const MODOS: Record<ModoPorcentagem, ConfigModo> = {
  'percentual-de': {
    label: 'Quanto é X% de Y?',
    labelA: 'Porcentagem (X)',
    labelB: 'Valor base (Y)',
    placeholderA: 'Ex: 15',
    placeholderB: 'Ex: 200',
    sufixoA: '%',
    pergunta: 'Resultado',
  },
  'quanto-porcento': {
    label: 'X é quantos % de Y?',
    labelA: 'Valor (X)',
    labelB: 'Total (Y)',
    placeholderA: 'Ex: 30',
    placeholderB: 'Ex: 200',
    pergunta: 'Resultado',
  },
  'variacao': {
    label: 'Variação de X para Y',
    labelA: 'Valor original (X)',
    labelB: 'Novo valor (Y)',
    placeholderA: 'Ex: 100',
    placeholderB: 'Ex: 120',
    pergunta: 'Variação percentual',
  },
}

export function calcularPorcentagem(modo: ModoPorcentagem, a: number, b: number): number | null {
  if (isNaN(a) || isNaN(b)) return null
  if (modo === 'percentual-de') return (a / 100) * b
  if (modo === 'quanto-porcento') return b === 0 ? null : (a / b) * 100
  if (modo === 'variacao') return a === 0 ? null : ((b - a) / a) * 100
  return null
}
