// Tabela INSS 2024 — contribuição progressiva
const FAIXAS_INSS = [
  { limite: 1412.00,  aliquota: 0.075 },
  { limite: 2666.68,  aliquota: 0.09 },
  { limite: 4000.03,  aliquota: 0.12 },
  { limite: 7786.02,  aliquota: 0.14 },
] as const

// Tabela IRRF 2024 — método da dedução (equivalente à progressiva)
const FAIXAS_IRRF = [
  { limite: 2259.20,  aliquota: 0,     deducao: 0 },
  { limite: 2826.65,  aliquota: 0.075, deducao: 169.44 },
  { limite: 3751.05,  aliquota: 0.15,  deducao: 381.44 },
  { limite: 4664.68,  aliquota: 0.225, deducao: 662.77 },
  { limite: Infinity, aliquota: 0.275, deducao: 896.00 },
] as const

const DEDUCAO_DEPENDENTE = 189.59

export function calcularINSS(bruto: number): number {
  let inss = 0
  let limiteAnterior = 0
  for (const faixa of FAIXAS_INSS) {
    if (bruto <= limiteAnterior) break
    const faixaValor = Math.min(bruto, faixa.limite) - limiteAnterior
    inss += faixaValor * faixa.aliquota
    limiteAnterior = faixa.limite
    if (bruto <= faixa.limite) break
  }
  return inss
}

export function calcularIRRF(base: number): number {
  for (const faixa of FAIXAS_IRRF) {
    if (base <= faixa.limite) {
      return Math.max(0, base * faixa.aliquota - faixa.deducao)
    }
  }
  return 0
}

export interface ResultadoSalario {
  salarioBruto: number
  inss: number
  deducaoDependentes: number
  baseIRRF: number
  irrf: number
  outrosDescontos: number
  totalDescontos: number
  salarioLiquido: number
}

export function calcularSalario(
  salarioBruto: number,
  numeroDependentes: number,
  outrosDescontos: number,
): ResultadoSalario {
  const inss = calcularINSS(salarioBruto)
  const deducaoDependentes = numeroDependentes * DEDUCAO_DEPENDENTE
  const baseIRRF = Math.max(0, salarioBruto - inss - deducaoDependentes)
  const irrf = calcularIRRF(baseIRRF)
  const totalDescontos = inss + irrf + outrosDescontos
  return {
    salarioBruto,
    inss,
    deducaoDependentes,
    baseIRRF,
    irrf,
    outrosDescontos,
    totalDescontos,
    salarioLiquido: Math.max(0, salarioBruto - totalDescontos),
  }
}
