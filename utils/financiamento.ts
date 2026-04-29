function taxaMensalDe(taxa: number, periodo: 'mensal' | 'anual'): number {
  if (periodo === 'mensal') return taxa / 100
  return Math.pow(1 + taxa / 100, 1 / 12) - 1
}

export interface ParamsFinanciamento {
  valorTotal: number
  entrada: number
  taxaInput: number
  periodoTaxa: 'mensal' | 'anual'
  prazoMeses: number
  sistema: 'SAC' | 'PRICE'
}

export interface ParcelaFinanciamento {
  numero: number
  saldoDevedor: number
  amortizacao: number
  juros: number
  parcela: number
}

export interface ResultadoFinanciamento {
  parcelas: ParcelaFinanciamento[]
  primeiraParcela: number
  ultimaParcela: number
  totalJuros: number
  custoTotal: number
  valorFinanciado: number
}

export function calcularFinanciamento(params: ParamsFinanciamento): ResultadoFinanciamento | null {
  const valorFinanciado = params.valorTotal - params.entrada
  if (valorFinanciado <= 0 || params.prazoMeses <= 0 || params.taxaInput <= 0) return null

  const i = taxaMensalDe(params.taxaInput, params.periodoTaxa)
  const n = params.prazoMeses
  const parcelas: ParcelaFinanciamento[] = []
  let saldo = valorFinanciado

  if (params.sistema === 'SAC') {
    // Amortização constante: parcela decresce ao longo do tempo
    const amortizacao = valorFinanciado / n
    for (let k = 1; k <= n; k++) {
      const juros = saldo * i
      const parcela = amortizacao + juros
      parcelas.push({ numero: k, saldoDevedor: saldo, amortizacao, juros, parcela })
      saldo -= amortizacao
    }
  } else {
    // PRICE: parcela fixa — PMT = PV × i / (1 − (1+i)^−n)
    const pmt = valorFinanciado * i / (1 - Math.pow(1 + i, -n))
    for (let k = 1; k <= n; k++) {
      const juros = saldo * i
      const amortizacao = pmt - juros
      parcelas.push({ numero: k, saldoDevedor: saldo, amortizacao, juros, parcela: pmt })
      saldo -= amortizacao
    }
  }

  const totalJuros = parcelas.reduce((s, p) => s + p.juros, 0)
  return {
    parcelas,
    primeiraParcela: parcelas[0]!.parcela,
    ultimaParcela: parcelas[n - 1]!.parcela,
    totalJuros,
    custoTotal: valorFinanciado + totalJuros,
    valorFinanciado,
  }
}
