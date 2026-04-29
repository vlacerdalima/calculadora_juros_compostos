import type { Metadata } from 'next'
import PorcentagemApp from '@/components/PorcentagemApp'

export const metadata: Metadata = {
  title: 'Calculadora de Porcentagem — 3 Modos',
  description:
    'Calcule porcentagens de três formas: quanto é X% de Y, X é quantos % de Y, ' +
    'e variação percentual entre dois valores. Gratuito e instantâneo.',
}

export default function PorcentagemPage() {
  return (
    <>
      <PorcentagemApp />
      <SeoSection />
    </>
  )
}

function SeoSection() {
  return (
    <article className="bg-zinc-950 border-t border-zinc-800/60">
      <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-12 text-zinc-400">

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">Três modos de cálculo de porcentagem</h2>
          <p className="leading-relaxed text-sm">
            A porcentagem aparece em dezenas de situações cotidianas: descontos em compras,
            aumento de preços, rendimento de investimentos, notas escolares e métricas de negócio.
            Nossa calculadora reúne os três cálculos mais comuns em uma única ferramenta.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">Modo 1: Quanto é X% de Y?</h2>
          <p className="leading-relaxed text-sm mb-4">
            Usado para calcular descontos, comissões, impostos ou qualquer valor que representa
            uma fração percentual de um total.
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 font-mono text-sm flex flex-col gap-3">
            <div>
              <p className="text-zinc-500 text-xs mb-1">Fórmula:</p>
              <p className="text-violet-400 font-semibold">Resultado = (X / 100) × Y</p>
            </div>
            <div className="border-t border-zinc-800 pt-3 text-xs text-zinc-500">
              <p>Exemplo: Quanto é 15% de R$ 200? → (15 / 100) × 200 = <span className="text-zinc-300">R$ 30</span></p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">Modo 2: X é quantos % de Y?</h2>
          <p className="leading-relaxed text-sm mb-4">
            Útil para descobrir qual percentual um valor representa dentro de um total — por exemplo,
            qual fração das suas despesas vai para aluguel, ou qual percentual de uma meta foi atingido.
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 font-mono text-sm flex flex-col gap-3">
            <div>
              <p className="text-zinc-500 text-xs mb-1">Fórmula:</p>
              <p className="text-violet-400 font-semibold">Resultado = (X / Y) × 100</p>
            </div>
            <div className="border-t border-zinc-800 pt-3 text-xs text-zinc-500">
              <p>Exemplo: 30 é quantos % de 200? → (30 / 200) × 100 = <span className="text-zinc-300">15%</span></p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">Modo 3: Variação percentual de X para Y</h2>
          <p className="leading-relaxed text-sm mb-4">
            Calcula o aumento ou desconto percentual entre dois valores. Ideal para comparar preços,
            salários, indicadores econômicos ou o rendimento de um investimento.
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 font-mono text-sm flex flex-col gap-3">
            <div>
              <p className="text-zinc-500 text-xs mb-1">Fórmula:</p>
              <p className="text-violet-400 font-semibold">Variação = ((Y − X) / X) × 100</p>
            </div>
            <div className="border-t border-zinc-800 pt-3 text-xs text-zinc-500 flex flex-col gap-1">
              <p>Aumento: de R$ 100 para R$ 120 → ((120−100)/100)×100 = <span className="text-emerald-400">+20%</span></p>
              <p>Desconto: de R$ 100 para R$ 80 → ((80−100)/100)×100 = <span className="text-red-400">−20%</span></p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">Usos práticos da calculadora de porcentagem</h2>
          <ul className="flex flex-col gap-3 text-sm">
            {[
              { t: 'Compras e descontos', d: 'Calcule o valor real de um desconto de 30% antes de comprar.' },
              { t: 'Negociação salarial', d: 'Saiba exatamente qual foi o aumento percentual oferecido.' },
              { t: 'Investimentos', d: 'Compare o rendimento percentual entre diferentes aplicações.' },
              { t: 'Metas e métricas', d: 'Descubra quantos % de uma meta foram atingidos até agora.' },
              { t: 'Inflação e reajustes', d: 'Calcule o impacto de um reajuste de 5% no seu aluguel ou conta.' },
            ].map(item => (
              <li key={item.t} className="flex gap-3 leading-relaxed">
                <span className="shrink-0 mt-0.5 w-4 h-4 rounded bg-violet-500/15 flex items-center justify-center">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span><strong className="text-zinc-200">{item.t}:</strong> {item.d}</span>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </article>
  )
}
