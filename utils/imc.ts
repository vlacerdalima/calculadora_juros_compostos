export interface CategoriaIMC {
  label: string
  min: number
  max: number
  colorClass: string
  bgClass: string
  borderClass: string
}

export const CATEGORIAS: CategoriaIMC[] = [
  { label: 'Abaixo do peso', min: 0,    max: 18.5, colorClass: 'text-sky-400',    bgClass: 'bg-sky-500/15',    borderClass: 'border-sky-500/30' },
  { label: 'Peso ideal',     min: 18.5, max: 25,   colorClass: 'text-emerald-400', bgClass: 'bg-emerald-500/15', borderClass: 'border-emerald-500/30' },
  { label: 'Sobrepeso',      min: 25,   max: 30,   colorClass: 'text-yellow-400',  bgClass: 'bg-yellow-500/15',  borderClass: 'border-yellow-500/30' },
  { label: 'Obesidade I',    min: 30,   max: 35,   colorClass: 'text-orange-400',  bgClass: 'bg-orange-500/15',  borderClass: 'border-orange-500/30' },
  { label: 'Obesidade II',   min: 35,   max: 40,   colorClass: 'text-red-400',     bgClass: 'bg-red-500/15',     borderClass: 'border-red-500/30' },
  { label: 'Obesidade III',  min: 40,   max: Infinity, colorClass: 'text-red-500', bgClass: 'bg-red-600/15',     borderClass: 'border-red-600/30' },
]

export function calcularIMC(pesoKg: number, alturaM: number): number | null {
  if (pesoKg <= 0 || alturaM <= 0) return null
  return pesoKg / (alturaM * alturaM)
}

export function categoriaDeIMC(imc: number): CategoriaIMC {
  return CATEGORIAS.find(c => imc >= c.min && imc < c.max) ?? CATEGORIAS[CATEGORIAS.length - 1]!
}
