import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Calculadoras Financeiras Gratuitas',
  description:
    'Site para ajudar com cálculos financeiros de forma fácil e gratuita. ' +
    'Calcule juros compostos, simule investimentos e planeje seu futuro financeiro.',
}

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
          <span className="text-lg font-bold tracking-tight">Calculadoras</span>
        </div>

        <div className="flex flex-col items-center gap-4 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Cálculos financeiros{' '}
            <span className="text-emerald-400">simples e gratuitos</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
            Um site para ajudar com cálculos de forma fácil. Simule investimentos,
            entenda o poder dos juros compostos e tome decisões financeiras mais inteligentes —
            sem cadastro, sem custo.
          </p>
        </div>

        <Link
          href="/calculadora-juros-compostos"
          className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400
                     text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 text-base"
        >
          Calculadora de Juros Compostos
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </section>

      {/* Grid de calculadoras */}
      <section className="max-w-5xl mx-auto px-6 pb-24 w-full">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-6">
          Calculadoras disponíveis
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/calculadora-juros-compostos"
            className="group rounded-2xl border border-zinc-800 bg-zinc-900
                       hover:border-emerald-500/40 hover:bg-zinc-900/80
                       p-5 flex flex-col gap-3 transition-all duration-200"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
                <path d="M3 17L8 12L12 15L17 9L21 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-100 text-sm group-hover:text-emerald-400 transition-colors">
                Juros Compostos
              </h3>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Simule o crescimento do seu investimento com aportes mensais e diferentes taxas.
              </p>
            </div>
          </Link>
        </div>
      </section>

      <footer className="border-t border-zinc-800 py-6 text-center text-xs text-zinc-600">
        Calculadoras Financeiras — gratuito e sem cadastro
      </footer>
    </main>
  )
}
