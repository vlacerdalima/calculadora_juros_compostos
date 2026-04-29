export interface ResultadoROI {
  investimento: number
  receita: number
  lucro: number
  roi: number
}

export function calcularROI(investimento: number, receita: number): ResultadoROI | null {
  if (investimento <= 0) return null
  const lucro = receita - investimento
  const roi = (lucro / investimento) * 100
  return { investimento, receita, lucro, roi }
}
