export interface PontoMensal {
  mes: number
  totalAportado: number
  totalJuros: number
  saldoTotal: number
}

export interface Parametros {
  valorInicial: number
  aporteMensal: number
  taxaInput: number
  periodoTaxa: 'mensal' | 'anual'
  quantidade: number
  periodoPeriodo: 'meses' | 'anos'
}

function taxaMensalDe(taxa: number, periodo: 'mensal' | 'anual'): number {
  if (periodo === 'mensal') return taxa / 100
  return Math.pow(1 + taxa / 100, 1 / 12) - 1
}

function mesesDe(quantidade: number, periodo: 'meses' | 'anos'): number {
  return periodo === 'meses' ? quantidade : quantidade * 12
}

export function calcularJurosCompostos(params: Parametros): PontoMensal[] {
  const taxaMensal = taxaMensalDe(params.taxaInput, params.periodoTaxa)
  const totalMeses = mesesDe(params.quantidade, params.periodoPeriodo)

  const pontos: PontoMensal[] = []
  let saldo = params.valorInicial

  for (let mes = 1; mes <= totalMeses; mes++) {
    saldo = (saldo + params.aporteMensal) * (1 + taxaMensal)
    const totalAportado = params.valorInicial + params.aporteMensal * mes
    const totalJuros = saldo - totalAportado
    pontos.push({ mes, totalAportado, totalJuros, saldoTotal: saldo })
  }

  return pontos
}

export function formatarReais(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
