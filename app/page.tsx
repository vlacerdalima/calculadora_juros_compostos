import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'VouCalcular — Calculadoras Gratuitas',
  description:
    'VouCalcular: hub de calculadoras gratuitas — juros compostos, financiamento SAC/PRICE, IMC, ' +
    'porcentagem, salário líquido e ROI. Cálculos fáceis, sem cadastro.',
}

const CALCULADORAS = [
  {
    href: '/calculadora-juros-compostos',
    titulo: 'Juros Compostos',
    desc: 'Simule o crescimento do seu investimento com aportes mensais e diferentes taxas.',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    hoverBorder: 'hover:border-emerald-500/40',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M3 17L8 12L12 15L17 9L21 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: '/calculadora-financiamento',
    titulo: 'Financiamento SAC / PRICE',
    desc: 'Simule financiamentos imobiliários e de veículos. Compare os sistemas de amortização.',
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-400',
    hoverBorder: 'hover:border-orange-500/40',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M3 21V9l9-6 9 6v12H3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <rect x="8" y="13" width="3" height="8" rx="1" fill="currentColor" opacity="0.5" />
        <rect x="13" y="13" width="3" height="8" rx="1" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
  {
    href: '/calculadora-imc',
    titulo: 'IMC',
    desc: 'Calcule seu Índice de Massa Corporal e veja sua classificação de saúde.',
    iconBg: 'bg-sky-500/10',
    iconColor: 'text-sky-400',
    hoverBorder: 'hover:border-sky-500/40',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/calculadora-porcentagem',
    titulo: 'Porcentagem',
    desc: 'Canivete suíço de porcentagem: desconto, fração percentual e variação entre valores.',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
    hoverBorder: 'hover:border-violet-500/40',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M5 19L19 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/calculadora-salario-liquido',
    titulo: 'Salário Líquido',
    desc: 'Calcule INSS, IRRF e descubra seu salário líquido com as tabelas de 2024.',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    hoverBorder: 'hover:border-amber-500/40',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 14h2M14 14h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/calculadora-roi',
    titulo: 'ROI',
    desc: 'Calcule o Retorno sobre Investimento e o lucro líquido de qualquer iniciativa.',
    iconBg: 'bg-indigo-500/10',
    iconColor: 'text-indigo-400',
    hoverBorder: 'hover:border-indigo-500/40',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M3 17L8 12L12 15L17 9L21 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 9h4v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 gap-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <path d="M2 12 L6 8 L9 10 L14 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight">VouCalcular</span>
        </div>

        <div className="flex flex-col items-center gap-4 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Cálculos fáceis e{' '}
            <span className="text-emerald-400">gratuitos</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
            Um hub de ferramentas para ajudar com cálculos do dia a dia — finanças,
            saúde e negócios. Sem cadastro, sem custo, com resultado imediato.
          </p>
        </div>
      </section>

      {/* Grid de calculadoras */}
      <section className="max-w-5xl mx-auto px-6 pb-24 w-full">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-6">
          Calculadoras disponíveis
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CALCULADORAS.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className={`group rounded-2xl border border-zinc-800 bg-zinc-900 ${calc.hoverBorder} hover:bg-zinc-900/80 p-5 flex flex-col gap-3 transition-all duration-200`}
            >
              <div className={`w-9 h-9 rounded-lg ${calc.iconBg} flex items-center justify-center ${calc.iconColor}`}>
                {calc.icon}
              </div>
              <div>
                <h3 className={`font-semibold text-zinc-100 text-sm ${calc.iconColor.replace('text-', 'group-hover:text-')} transition-colors`}>
                  {calc.titulo}
                </h3>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{calc.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-zinc-800 py-6 text-center text-xs text-zinc-600">
        Calculadoras gratuitas — sem cadastro, sem custo
      </footer>
    </main>
  )
}
